// tsparticles v4 config presets for each effect type

export const particlePresets = {
  none: {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: { number: { value: 0 } }
  },

  snow: {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 120, density: { enable: true } },
      color: { value: ['#ffffff', '#ddddff', '#eeeeff'] },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.3, max: 0.85 } },
      size: { value: { min: 2, max: 7 } },
      move: {
        enable: true,
        direction: 'bottom',
        speed: { min: 1, max: 3.5 },
        straight: false,
        outModes: { default: 'out' },
        random: true
      },
      wobble: {
        enable: true,
        distance: 12,
        speed: { min: -4, max: 4 }
      }
    }
  },

  fireworks: {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 0 },
      color: { value: ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0088ff', '#ff00ff', '#00ffff', '#ffffff'] },
      shape: { type: ['circle', 'star'] },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          speed: 1.8,
          startValue: 'max',
          destroy: 'min'
        }
      },
      size: { value: { min: 3, max: 9 } },
      move: {
        enable: true,
        speed: { min: 6, max: 18 },
        direction: 'none',
        outModes: { default: 'destroy' },
        decay: 0.07,
        gravity: { enable: true, acceleration: 10 }
      },
      life: {
        count: 1,
        duration: { value: { min: 0.5, max: 1.5 } }
      }
    },
    emitters: [
      {
        life: { count: 0, delay: 0.2, duration: 0.12 },
        rate: { delay: 0.05, quantity: 30 },
        size: { width: 0, height: 0 },
        position: { x: 20, y: 40 }
      },
      {
        life: { count: 0, delay: 0.7, duration: 0.12 },
        rate: { delay: 0.05, quantity: 30 },
        size: { width: 0, height: 0 },
        position: { x: 80, y: 30 }
      },
      {
        life: { count: 0, delay: 1.2, duration: 0.12 },
        rate: { delay: 0.05, quantity: 30 },
        size: { width: 0, height: 0 },
        position: { x: 50, y: 20 }
      },
      {
        life: { count: 0, delay: 1.7, duration: 0.12 },
        rate: { delay: 0.05, quantity: 30 },
        size: { width: 0, height: 0 },
        position: { x: 15, y: 25 }
      },
      {
        life: { count: 0, delay: 2.2, duration: 0.12 },
        rate: { delay: 0.05, quantity: 30 },
        size: { width: 0, height: 0 },
        position: { x: 85, y: 45 }
      }
    ]
  },

  confetti: {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 90, density: { enable: true } },
      color: { value: ['#ffc200', '#ff6b6b', '#4ecdc4', '#45b7d1', '#a29bfe', '#fd79a8', '#00b894', '#e17055'] },
      shape: { type: ['square', 'circle'] },
      opacity: { value: { min: 0.6, max: 1 } },
      size: { value: { min: 5, max: 12 } },
      move: {
        enable: true,
        direction: 'bottom',
        speed: { min: 2, max: 6 },
        straight: false,
        outModes: { default: 'out' },
        random: true
      },
      rotate: {
        value: { min: 0, max: 360 },
        animation: { enable: true, speed: 25, sync: false }
      },
      tilt: {
        enable: true,
        value: { min: 0, max: 360 },
        animation: { enable: true, speed: 15, sync: false }
      },
      wobble: {
        enable: true,
        distance: 25,
        speed: { min: -10, max: 10 }
      }
    }
  },

  autumn: {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 50, density: { enable: true } },
      color: { value: ['#ff6b35', '#f7931e', '#c1272d', '#8b4513', '#d4621a', '#a0522d', '#e8821a'] },
      shape: { type: ['circle', 'star', 'polygon'] },
      opacity: { value: { min: 0.5, max: 0.9 } },
      size: { value: { min: 6, max: 14 } },
      move: {
        enable: true,
        direction: 'bottom-right',
        speed: { min: 1.5, max: 4 },
        straight: false,
        outModes: { default: 'out' },
        random: true
      },
      rotate: {
        value: { min: 0, max: 360 },
        animation: { enable: true, speed: 12, sync: false }
      },
      wobble: {
        enable: true,
        distance: 30,
        speed: { min: -6, max: 6 }
      }
    }
  },

  stars: {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 140, density: { enable: true } },
      color: { value: ['#ffffff', '#ffffcc', '#ccccff', '#ffcccc'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 1 },
        animation: { enable: true, speed: 1.2, sync: false }
      },
      size: { value: { min: 1, max: 3.5 } },
      links: {
        enable: true,
        distance: 130,
        color: '#ffffff',
        opacity: 0.12,
        width: 1
      },
      move: {
        enable: true,
        speed: { min: 0.2, max: 0.8 },
        direction: 'none',
        outModes: { default: 'out' },
        random: true
      },
      twinkle: {
        particles: { enable: true, frequency: 0.06, opacity: 1 }
      }
    }
  },

  hearts: {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 35, density: { enable: true } },
      color: { value: ['#ff69b4', '#ff1493', '#ff0055', '#ff6b8a', '#ffb6c1'] },
      shape: { type: 'heart' },
      opacity: { value: { min: 0.5, max: 0.95 } },
      size: { value: { min: 10, max: 22 } },
      move: {
        enable: true,
        direction: 'top',
        speed: { min: 1, max: 3.5 },
        straight: false,
        outModes: { default: 'out' },
        random: true
      },
      rotate: {
        value: { min: -20, max: 20 },
        animation: { enable: true, speed: 5, sync: false }
      },
      wobble: {
        enable: true,
        distance: 15,
        speed: { min: -4, max: 4 }
      }
    }
  },

  bubbles: {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    particles: {
      number: { value: 35, density: { enable: true } },
      color: { value: ['#00d4ff', '#0095ff', '#00ffb3', '#6c5ce7', '#00cec9'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.05, max: 0.35 },
        animation: { enable: true, speed: 1, sync: false }
      },
      size: {
        value: { min: 15, max: 50 },
        animation: { enable: true, speed: 4, sync: false }
      },
      stroke: {
        width: 2,
        color: { value: ['#00d4ff', '#0095ff', '#00ffb3', '#6c5ce7'] }
      },
      move: {
        enable: true,
        direction: 'top',
        speed: { min: 0.5, max: 2 },
        straight: false,
        outModes: { default: 'out' },
        random: true
      }
    }
  }
}

export const effectMeta = {
  halloween: { name: 'Halloween', emoji: '🦇', description: 'Spooky bats' },
  none:     { name: 'None',          emoji: '❌', description: 'No particles' },
  snow:     { name: 'Snow',          emoji: '❄️', description: 'Winter snowfall' },
  fireworks:{ name: 'Fireworks',     emoji: '🎆', description: '4th of July celebration' },
  confetti: { name: 'Confetti',      emoji: '🎉', description: 'Party celebration' },
  autumn:   { name: 'Autumn Leaves', emoji: '🍂', description: 'Fall foliage' },
  stars:    { name: 'Starry Night',  emoji: '⭐', description: 'Night sky effect' },
  hearts:   { name: 'Hearts',        emoji: '❤️', description: "Valentine's Day" },
  bubbles:  { name: 'Bubbles',       emoji: '🫧', description: 'Floating bubbles' }
}
