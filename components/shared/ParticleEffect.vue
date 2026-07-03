<template>
  <div class="particle-wrapper">
    <vue-particles
      v-if="particlesEnabled && currentEffect"
      :color="currentEffect.color"
      :particleOpacity="currentEffect.opacity"
      :particlesNumber="particleCount"
      :shapeType="currentEffect.shape"
      :particleSize="currentEffect.size"
      :linesColor="currentEffect.lineColor"
      :linesWidth="currentEffect.lineWidth"
      :lineLinked="currentEffect.lineLinked"
      :lineOpacity="currentEffect.lineOpacity"
      :linesDistance="currentEffect.lineDistance"
      :moveSpeed="currentEffect.speed"
      :hoverEffect="currentEffect.hoverEffect"
      :hoverMode="currentEffect.hoverMode"
      :clickEffect="currentEffect.clickEffect"
      :clickMode="currentEffect.clickMode"
      class="particles-canvas"
    />
  </div>
</template>

<script>
import { database } from '@/plugins/firebase'
import { ref, onValue } from 'firebase/database'

export default {
  name: 'ParticleEffect',
  data() {
    return {
      particlesEnabled: false,
      currentEffect: null,
      particlePresets: {
        snow: {
          name: 'Snow',
          color: '#ffffff',
          opacity: 0.8,
          shape: 'circle',
          size: 4,
          lineColor: '#ffffff',
          lineWidth: 1,
          lineLinked: false,
          lineOpacity: 0.4,
          lineDistance: 150,
          speed: 1,
          hoverEffect: true,
          hoverMode: 'bubble',
          clickEffect: true,
          clickMode: 'push'
        },
        fireworks: {
          name: 'Fireworks',
          color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
          opacity: 0.9,
          shape: 'star',
          size: 6,
          lineColor: '#ffffff',
          lineWidth: 2,
          lineLinked: true,
          lineOpacity: 0.6,
          lineDistance: 200,
          speed: 3,
          hoverEffect: true,
          hoverMode: 'repulse',
          clickEffect: true,
          clickMode: 'push'
        },
        confetti: {
          name: 'Confetti',
          color: ['#ffc200', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7fff7'],
          opacity: 0.8,
          shape: 'circle',
          size: 5,
          lineColor: '#ffc200',
          lineWidth: 1,
          lineLinked: false,
          lineOpacity: 0.3,
          lineDistance: 100,
          speed: 2,
          hoverEffect: true,
          hoverMode: 'grab',
          clickEffect: true,
          clickMode: 'push'
        },
        autumn: {
          name: 'Autumn Leaves',
          color: ['#ff6b35', '#f7931e', '#c1272d', '#8b4513'],
          opacity: 0.7,
          shape: 'triangle',
          size: 8,
          lineColor: '#8b4513',
          lineWidth: 1,
          lineLinked: false,
          lineOpacity: 0.2,
          lineDistance: 150,
          speed: 1.5,
          hoverEffect: true,
          hoverMode: 'bubble',
          clickEffect: true,
          clickMode: 'repulse'
        },
        stars: {
          name: 'Starry Night',
          color: '#ffffff',
          opacity: 0.6,
          shape: 'star',
          size: 3,
          lineColor: '#ffffff',
          lineWidth: 1,
          lineLinked: true,
          lineOpacity: 0.2,
          lineDistance: 200,
          speed: 0.5,
          hoverEffect: true,
          hoverMode: 'grab',
          clickEffect: true,
          clickMode: 'bubble'
        },
        hearts: {
          name: 'Hearts',
          color: '#ff69b4',
          opacity: 0.7,
          shape: 'heart',
          size: 6,
          lineColor: '#ff69b4',
          lineWidth: 1,
          lineLinked: false,
          lineOpacity: 0.3,
          lineDistance: 150,
          speed: 1,
          hoverEffect: true,
          hoverMode: 'bubble',
          clickEffect: true,
          clickMode: 'push'
        },
        bubbles: {
          name: 'Bubbles',
          color: '#00d4ff',
          opacity: 0.5,
          shape: 'circle',
          size: 10,
          lineColor: '#00d4ff',
          lineWidth: 1,
          lineLinked: true,
          lineOpacity: 0.1,
          lineDistance: 180,
          speed: 2,
          hoverEffect: true,
          hoverMode: 'repulse',
          clickEffect: true,
          clickMode: 'bubble'
        },
        none: {
          name: 'None',
          color: '#ffffff',
          opacity: 0,
          shape: 'circle',
          size: 0,
          lineColor: '#ffffff',
          lineWidth: 0,
          lineLinked: false,
          lineOpacity: 0,
          lineDistance: 0,
          speed: 0,
          hoverEffect: false,
          hoverMode: 'grab',
          clickEffect: false,
          clickMode: 'push'
        }
      }
    }
  },
  computed: {
    particleCount() {
      // Responsive particle count based on screen size
      if (process.client) {
        const width = window.innerWidth
        if (width < 600) return 30 // Mobile
        if (width < 960) return 50 // Tablet
        return 80 // Desktop
      }
      return 50
    }
  },
  mounted() {
    if (process.client) {
      this.listenToParticleSettings()
      this.checkDateBasedEffects()
      window.addEventListener('resize', this.handleResize)
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener('resize', this.handleResize)
    }
  },
  methods: {
    listenToParticleSettings() {
      if (!database) return
      
      const settingsRef = ref(database, 'particleSettings')
      onValue(settingsRef, (snapshot) => {
        const settings = snapshot.val()
        if (settings) {
          this.particlesEnabled = settings.enabled || false
          const effectType = settings.effectType || 'none'
          this.currentEffect = this.particlePresets[effectType] || this.particlePresets.none
        }
      })
    },
    
    checkDateBasedEffects() {
      // Auto-enable effects based on dates
      const today = new Date()
      const month = today.getMonth() + 1
      const day = today.getDate()
      
      // Christmas season (Dec 1 - Jan 5)
      if ((month === 12 || (month === 1 && day <= 5))) {
        // Auto-suggest snow effect
        console.log('Holiday season detected')
      }
      
      // 4th of July
      if (month === 7 && day === 4) {
        console.log('Independence Day detected')
      }
      
      // Valentine's Day
      if (month === 2 && day === 14) {
        console.log('Valentine\'s Day detected')
      }
      
      // Autumn (Oct-Nov)
      if (month === 10 || month === 11) {
        console.log('Autumn season detected')
      }
    },
    
    handleResize() {
      // Force re-render on resize for responsive particle count
      this.$forceUpdate()
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
  z-index: 1;
}

.particles-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Ensure particles don't interfere with interactions */
.particle-wrapper >>> canvas {
  pointer-events: none;
}
</style>
