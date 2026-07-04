<template>
  <div
    class="particle-wrapper"
    :class="{ 'particle-inline': inline }"
    v-show="particlesEnabled && effectType !== 'none'"
  >
    <canvas ref="canvas" class="particle-canvas" />
  </div>
</template>

<script>
import { db } from '@/plugins/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

export default {
  name: 'ParticleEffect',
  props: {
    inline: { type: Boolean, default: false },
    previewEffect: { type: String, default: null }
  },
  data() {
    return {
      particlesEnabled: false,
      effectType: 'none',
      particles: [],
      animationId: null,
      fireworkTimer: 0,
      unsubscribe: null
    }
  },
  watch: {
    effectType() { this.restart() },
    particlesEnabled(v) { v ? this.restart() : this.stop() },
    previewEffect(v) { if (v) { this.effectType = v; this.particlesEnabled = true } }
  },
  mounted() {
    if (process.client) {
      if (this.previewEffect) {
        this.effectType = this.previewEffect
        this.particlesEnabled = true
        this.$nextTick(() => this.start())
      } else {
        this.loadSettings()
        window.addEventListener('particleSettingsChanged', this.onSettingsChange)
      }
      window.addEventListener('resize', this.onResize)
    }
  },
  beforeDestroy() {
    this.stop()
    if (this.unsubscribe) this.unsubscribe()
    if (process.client) {
      window.removeEventListener('particleSettingsChanged', this.onSettingsChange)
      window.removeEventListener('resize', this.onResize)
    }
  },
  methods: {
    loadSettings() {
      // Realtime sitewide settings from Firestore (all devices)
      if (db) {
        this.unsubscribe = onSnapshot(
          doc(db, 'config', 'particles'),
          snap => {
            if (snap.exists()) {
              const s = snap.data()
              this.applySettings(s)
              // keep localStorage in sync as offline fallback
              try {
                localStorage.setItem('particleSettings', JSON.stringify({ enabled: s.enabled, effectType: s.effectType }))
              } catch (e) {}
            }
          },
          () => this.loadLocalSettings() // Firestore error → fallback
        )
      } else {
        this.loadLocalSettings()
      }
    },
    loadLocalSettings() {
      try {
        const s = JSON.parse(localStorage.getItem('particleSettings') || '{}')
        this.applySettings(s)
      } catch (e) {}
    },
    applySettings(s) {
      this.particlesEnabled = s.enabled || false
      this.effectType = s.effectType || 'none'
      if (this.particlesEnabled && this.effectType !== 'none') this.$nextTick(() => this.start())
    },
    onSettingsChange(e) {
      this.applySettings(e.detail || {})
    },
    onResize() {
      const c = this.$refs.canvas
      if (c) { c.width = this.inline ? c.parentElement.offsetWidth : window.innerWidth; c.height = this.inline ? c.parentElement.offsetHeight : window.innerHeight }
    },
    restart() {
      this.stop()
      if (this.particlesEnabled && this.effectType !== 'none') this.$nextTick(() => this.start())
    },
    start() {
      const c = this.$refs.canvas
      if (!c) return
      c.width = this.inline ? c.parentElement.offsetWidth : window.innerWidth
      c.height = this.inline ? c.parentElement.offsetHeight : window.innerHeight
      this.fireworkTimer = 0
      this.particles = []
      if (this.effectType !== 'fireworks') this.initParticles()
      this.loop()
    },
    stop() {
      if (this.animationId) { cancelAnimationFrame(this.animationId); this.animationId = null }
      this.particles = []
      const c = this.$refs.canvas
      if (c) { const ctx = c.getContext('2d'); ctx && ctx.clearRect(0, 0, c.width, c.height) }
    },
    count() {
      const w = window.innerWidth
      const base = this.inline ? 0.3 : (w < 600 ? 0.4 : w < 960 ? 0.7 : 1)
      const counts = { snow: 120, confetti: 90, autumn: 55, stars: 150, hearts: 40, bubbles: 35, halloween: 45, fireworks: 0 }
      return Math.floor((counts[this.effectType] || 60) * base)
    },
    initParticles() {
      for (let i = 0; i < this.count(); i++) this.particles.push(this.mkParticle(true))
    },
    mkParticle(scatter) {
      const c = this.$refs.canvas; if (!c) return {}
      const W = c.width, H = c.height
      const r = () => Math.random()
      const rng = (a, b) => a + r() * (b - a)
      const pick = arr => arr[Math.floor(r() * arr.length)]
      switch (this.effectType) {
        case 'snow': return { x: rng(0, W), y: scatter ? rng(0, H) : -10, r: rng(2, 5), vy: rng(0.4, 1.2), vx: rng(-0.4, 0.4), a: rng(0.4, 0.9), w: r() * Math.PI * 2, ws: rng(-0.02, 0.02) }
        case 'confetti': return { x: rng(0, W), y: scatter ? rng(0, H) : -20, r: rng(5, 13), vy: rng(2, 6), vx: rng(-2, 2), color: pick(['#ffc200','#ff6b6b','#4ecdc4','#45b7d1','#a29bfe','#fd79a8','#e17055']), rot: r()*Math.PI*2, rspd: rng(-0.12, 0.12), sq: r() > 0.5, w: r()*Math.PI*2, ws: rng(-0.08, 0.08) }
        case 'autumn': return { x: rng(0, W), y: scatter ? rng(0, H) : -20, rx: rng(6, 14), ry: rng(4, 9), vy: rng(1.5, 4), vx: rng(0.5, 2.5), color: pick(['#ff6b35','#f7931e','#c1272d','#8b4513','#d4621a']), rot: r()*Math.PI*2, rspd: rng(-0.1, 0.1), w: r()*Math.PI*2, ws: rng(-0.06, 0.06) }
        case 'stars': return { x: rng(0, W), y: rng(0, H), r: rng(0.5, 2.5), a: r(), ta: r(), ts: rng(0.005, 0.02), vx: rng(-0.2, 0.2), vy: rng(-0.2, 0.2) }
        case 'hearts': return { x: rng(0, W), y: scatter ? rng(0, H) : H+20, r: rng(10, 22), vy: rng(-3, -1), vx: rng(-1, 1), a: rng(0.5, 0.9), color: pick(['#ff69b4','#ff1493','#ff0055','#ff6b8a','#ffb6c1']), w: r()*Math.PI*2, ws: rng(-0.04, 0.04) }
        case 'bubbles': return { x: rng(0, W), y: scatter ? rng(0, H) : H+50, r: rng(15, 50), vy: rng(-2, -0.5), vx: rng(-0.5, 0.5), a: rng(0.05, 0.25), color: pick(['#00d4ff','#0095ff','#00ffb3','#6c5ce7']) }
        case 'halloween': {
          const isBat = r() > 0.5
          return isBat
            ? { shape: 'bat', x: scatter ? rng(0, W) : (r() > 0.5 ? -20 : W+20), y: scatter ? rng(0, H*0.9) : rng(H*0.05, H*0.85), r: rng(10, 20), vy: rng(-0.3, 0.6), vx: r() > 0.5 ? rng(1.5, 3) : rng(-3, -1.5), a: rng(0.65, 0.95), color: pick(['#6a0dad','#4b0082','#8b008b','#2d0048']), rot: 0, rspd: rng(-0.2, 0.2), w: r()*Math.PI*2, ws: rng(-0.06, 0.06) }
            : { shape: 'pumpkin', x: rng(0, W), y: scatter ? rng(0, H) : H+60, r: rng(22, 38), vy: rng(-1.2, -0.4), vx: rng(-0.6, 0.6), a: rng(0.75, 0.98), w: r()*Math.PI*2, ws: rng(-0.02, 0.02) }
        }
        default: return {}
      }
    },
    loop() {
      const c = this.$refs.canvas; if (!c || !this.particlesEnabled || this.effectType === 'none') return
      const ctx = c.getContext('2d')
      ctx.clearRect(0, 0, c.width, c.height)
      if (this.effectType === 'fireworks') this.tickFireworks(ctx, c)
      else this.tickParticles(ctx, c)
      this.animationId = requestAnimationFrame(() => this.loop())
    },
    tickParticles(ctx, c) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i]
        this.drawP(ctx, p)
        this.moveP(p)
        if (this.outOfBounds(p, c)) this.particles[i] = this.mkParticle(false)
      }
    },
    outOfBounds(p, c) {
      if (['hearts','bubbles'].includes(this.effectType)) return p.y < -100
      if (this.effectType === 'halloween') {
        if (p.shape === 'pumpkin') return p.y < -100
        return p.x < -150 || p.x > c.width + 150 || p.y > c.height + 100
      }
      if (this.effectType === 'stars') return false
      return p.y > c.height + 50 || p.x < -100 || p.x > c.width + 100
    },
    moveP(p) {
      if (p.w !== undefined) { p.w += p.ws; p.x += Math.sin(p.w) * 0.5 }
      p.x += p.vx || 0; p.y += p.vy || 0
      if (p.rot !== undefined) p.rot += p.rspd
      if (p.ta !== undefined) {
        if (p.a < p.ta) p.a = Math.min(p.a + p.ts, p.ta)
        else { p.a = Math.max(p.a - p.ts, 0.05); if (p.a <= 0.06) p.ta = Math.random() }
      }
    },
    drawP(ctx, p) {
      switch (this.effectType) {
        case 'snow':
          ctx.shadowColor = 'rgba(200,220,255,0.8)'; ctx.shadowBlur = p.r * 2
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
          ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill()
          ctx.shadowBlur = 0; break
        case 'confetti':
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = 0.9
          ctx.fillStyle = p.color
          if (p.sq) ctx.fillRect(-p.r/2, -p.r/4, p.r, p.r/2)
          else { ctx.beginPath(); ctx.arc(0, 0, p.r/2, 0, Math.PI*2); ctx.fill() }
          ctx.globalAlpha = 1; ctx.restore(); break
        case 'autumn':
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = 0.8
          ctx.fillStyle = p.color; ctx.beginPath(); ctx.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI*2); ctx.fill()
          ctx.globalAlpha = 1; ctx.restore(); break
        case 'stars':
          ctx.shadowColor = 'rgba(255,255,200,0.8)'; ctx.shadowBlur = p.r * 4
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
          ctx.fillStyle = `rgba(255,255,240,${p.a})`; ctx.fill(); ctx.shadowBlur = 0; break
        case 'hearts':
          ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = p.a
          ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 8
          this.heart(ctx, p.r); ctx.fill(); ctx.shadowBlur = 0; ctx.globalAlpha = 1; ctx.restore(); break
        case 'bubbles':
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
          ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.globalAlpha = p.a + 0.1; ctx.stroke()
          ctx.globalAlpha = p.a * 0.3; ctx.fillStyle = p.color; ctx.fill(); ctx.globalAlpha = 1; break
        case 'halloween':
          ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = p.a
          if (p.shape === 'pumpkin') {
            ctx.shadowColor = '#ff6600'; ctx.shadowBlur = 20
            this.pumpkin(ctx, p.r)
          } else {
            ctx.rotate(p.rot)
            ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 8
            this.bat(ctx, p.r); ctx.fill()
          }
          ctx.shadowBlur = 0; ctx.globalAlpha = 1; ctx.restore(); break
      }
    },
    pumpkin(ctx, s) {
      const r = s * 0.5
      // Body lobes
      ctx.fillStyle = '#ff6a00'
      ctx.beginPath(); ctx.ellipse(-r*0.36, 0, r*0.38, r*0.52, 0, 0, Math.PI*2); ctx.fill()
      ctx.fillStyle = '#ff7400'
      ctx.beginPath(); ctx.ellipse(0, 0, r*0.44, r*0.57, 0, 0, Math.PI*2); ctx.fill()
      ctx.fillStyle = '#ff6a00'
      ctx.beginPath(); ctx.ellipse(r*0.36, 0, r*0.38, r*0.52, 0, 0, Math.PI*2); ctx.fill()
      // Highlight
      ctx.fillStyle = 'rgba(255,180,60,0.45)'
      ctx.beginPath(); ctx.ellipse(-r*0.06, -r*0.12, r*0.13, r*0.2, -0.3, 0, Math.PI*2); ctx.fill()
      // Stem
      ctx.fillStyle = '#3a7d1e'
      ctx.beginPath()
      ctx.moveTo(-r*0.08, -r*0.53)
      ctx.bezierCurveTo(-r*0.04, -r*0.82, r*0.22, -r*0.72, r*0.16, -r*0.88)
      ctx.bezierCurveTo(r*0.26, -r*0.72, r*0.06, -r*0.62, r*0.08, -r*0.53)
      ctx.closePath(); ctx.fill()
      // Left eye
      ctx.fillStyle = 'rgba(20,10,0,0.9)'
      ctx.beginPath(); ctx.moveTo(-r*0.23, -r*0.07); ctx.lineTo(-r*0.13, -r*0.24); ctx.lineTo(-r*0.33, -r*0.24); ctx.closePath(); ctx.fill()
      // Right eye
      ctx.beginPath(); ctx.moveTo(r*0.23, -r*0.07); ctx.lineTo(r*0.13, -r*0.24); ctx.lineTo(r*0.33, -r*0.24); ctx.closePath(); ctx.fill()
      // Jagged smile
      ctx.fillStyle = 'rgba(20,10,0,0.9)'
      ctx.beginPath()
      ctx.moveTo(-r*0.3, r*0.06); ctx.lineTo(-r*0.22, r*0.2); ctx.lineTo(-r*0.12, r*0.1)
      ctx.lineTo(0, r*0.22); ctx.lineTo(r*0.12, r*0.1); ctx.lineTo(r*0.22, r*0.2)
      ctx.lineTo(r*0.3, r*0.06); ctx.arc(0, r*0.06, r*0.3, 0.18, Math.PI-0.18, true)
      ctx.closePath(); ctx.fill()
      // Inner glow
      ctx.fillStyle = 'rgba(255,200,0,0.18)'
      ctx.beginPath(); ctx.ellipse(0, 0, r*0.35, r*0.42, 0, 0, Math.PI*2); ctx.fill()
    },
    bat(ctx, s) {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-s*0.3, -s*0.5, -s*0.9, -s*0.2, -s, s*0.15)
      ctx.bezierCurveTo(-s*0.65, s*0.35, -s*0.3, s*0.2, 0, 0)
      ctx.bezierCurveTo(s*0.3, s*0.2, s*0.65, s*0.35, s, s*0.15)
      ctx.bezierCurveTo(s*0.9, -s*0.2, s*0.3, -s*0.5, 0, 0)
    },
    heart(ctx, s) {
      const h = s * 0.5
      ctx.beginPath(); ctx.moveTo(0, h*0.4)
      ctx.bezierCurveTo(0, -h*0.1, h, -h*0.8, h, -h*0.3)
      ctx.bezierCurveTo(h, h*0.2, 0, h*0.8, 0, h)
      ctx.bezierCurveTo(0, h*0.8, -h, h*0.2, -h, -h*0.3)
      ctx.bezierCurveTo(-h, -h*0.8, 0, -h*0.1, 0, h*0.4)
    },
    tickFireworks(ctx, c) {
      this.fireworkTimer++
      const interval = this.inline ? 120 : 180
      if (this.fireworkTimer % interval === 0) {
        const bx = Math.random() * c.width * 0.8 + c.width * 0.1
        const by = Math.random() * c.height * 0.5 + c.height * 0.05
        const colors = ['#ff0000','#ff7700','#ffff00','#00ff88','#00aaff','#ff00ff','#ffffff','#ffcc00']
        const color = colors[Math.floor(Math.random() * colors.length)]
        const n = this.inline ? 15 : 35
        for (let i = 0; i < n; i++) {
          const ang = (Math.PI*2*i)/n + (Math.random()-0.5)*0.3
          const spd = Math.random() * 3.5 + 2
          this.particles.push({ x: bx, y: by, vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd, r: Math.random()*3+2, color, life: 1, decay: Math.random()*0.006+0.003, g: 0.05 })
        }
      }
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i]
        p.vy += p.g; p.vx *= 0.99; p.vy *= 0.99; p.x += p.vx; p.y += p.vy; p.life -= p.decay
        if (p.life <= 0) { this.particles.splice(i, 1); continue }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI*2)
        ctx.fillStyle = p.color; ctx.globalAlpha = p.life
        ctx.shadowColor = p.color; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0; ctx.globalAlpha = 1
      }
    }
  }
}
</script>
<style scoped>
.particle-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.particle-wrapper.particle-inline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle-canvas {
  width: 100%;
  height: 100%;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .particle-wrapper { display: none; }
}
</style>
