<template>
  <v-container fluid class="admin-panel">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="glass-card elevation-12">
          <v-card-title class="headline primary--text">
            <v-icon left color="primary">settings</v-icon>
            Particle Effect Admin Panel
          </v-card-title>
          
          <!-- Login Section -->
          <v-card-text v-if="!isLoggedIn">
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="loginEmail"
                label="Admin Email"
                type="email"
                prepend-icon="person"
                required
              ></v-text-field>
              <v-text-field
                v-model="loginPassword"
                label="Password"
                type="password"
                prepend-icon="lock"
                required
              ></v-text-field>
              <v-alert v-if="loginError" type="error" dismissible>
                {{ loginError }}
              </v-alert>
              <v-btn type="submit" color="primary" large block :loading="loggingIn">
                <v-icon left>login</v-icon>
                Login
              </v-btn>
            </v-form>
          </v-card-text>

          <!-- Control Panel -->
          <v-card-text v-else>
            <v-layout row wrap>
              <!-- Enable/Disable Toggle -->
              <v-flex xs12 class="mb-4">
                <v-switch
                  v-model="settings.enabled"
                  label="Enable Particle Effects"
                  color="primary"
                  @change="saveSettings"
                ></v-switch>
              </v-flex>

              <!-- Effect Type Selection -->
              <v-flex xs12 md6 class="pa-2">
                <v-card class="effect-card">
                  <v-card-title class="subheading">
                    Select Effect Type
                  </v-card-title>
                  <v-card-text>
                    <v-radio-group v-model="settings.effectType" @change="saveSettings">
                      <v-radio
                        v-for="(effect, key) in effectTypes"
                        :key="key"
                        :label="effect.name"
                        :value="key"
                        color="primary"
                      >
                        <template v-slot:label>
                          <div class="effect-label">
                            <span>{{ effect.emoji }}</span>
                            <strong class="ml-2">{{ effect.name }}</strong>
                            <span class="ml-2 grey--text">{{ effect.description }}</span>
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- Live Preview -->
              <v-flex xs12 md6 class="pa-2">
                <v-card class="preview-card" dark>
                  <v-card-title class="subheading">
                    Live Preview
                  </v-card-title>
                  <v-card-text>
                    <div class="preview-container">
                      <vue-particles
                        v-if="settings.enabled && currentPreview"
                        :color="currentPreview.color"
                        :particleOpacity="currentPreview.opacity"
                        :particlesNumber="40"
                        :shapeType="currentPreview.shape"
                        :particleSize="currentPreview.size"
                        :linesColor="currentPreview.lineColor"
                        :linesWidth="currentPreview.lineWidth"
                        :lineLinked="currentPreview.lineLinked"
                        :lineOpacity="currentPreview.lineOpacity"
                        :linesDistance="currentPreview.lineDistance"
                        :moveSpeed="currentPreview.speed"
                        :hoverEffect="currentPreview.hoverEffect"
                        :hoverMode="currentPreview.hoverMode"
                        :clickEffect="currentPreview.clickEffect"
                        :clickMode="currentPreview.clickMode"
                        class="preview-particles"
                      />
                      <div v-else class="no-preview">
                        <v-icon size="64" color="grey lighten-1">visibility_off</v-icon>
                        <p class="mt-3 grey--text">Preview disabled</p>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- Quick Date Presets -->
              <v-flex xs12 class="mt-4">
                <v-card class="preset-card">
                  <v-card-title class="subheading">
                    <v-icon left>event</v-icon>
                    Quick Date Presets
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md3 class="pa-2" v-for="preset in datePresets" :key="preset.name">
                        <v-btn
                          block
                          color="accent"
                          @click="applyPreset(preset.effect)"
                          class="preset-btn"
                        >
                          <span class="mr-2">{{ preset.emoji }}</span>
                          {{ preset.name }}
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- Status & Actions -->
              <v-flex xs12 class="mt-4">
                <v-layout row wrap align-center>
                  <v-flex xs12 sm6>
                    <v-alert :value="saveSuccess" type="success" dismissible>
                      Settings saved successfully!
                    </v-alert>
                  </v-flex>
                  <v-flex xs12 sm6 text-xs-right>
                    <v-btn color="error" @click="logout">
                      <v-icon left>logout</v-icon>
                      Logout
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { auth, database } from '@/plugins/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { ref, set, onValue } from 'firebase/database'

export default {
  name: 'ParticleAdmin',
  data() {
    return {
      isLoggedIn: false,
      loginEmail: '',
      loginPassword: '',
      loginError: '',
      loggingIn: false,
      saveSuccess: false,
      settings: {
        enabled: false,
        effectType: 'none'
      },
      effectTypes: {
        none: {
          name: 'None',
          emoji: '❌',
          description: 'No particles'
        },
        snow: {
          name: 'Snow',
          emoji: '❄️',
          description: 'Winter snowfall'
        },
        fireworks: {
          name: 'Fireworks',
          emoji: '🎆',
          description: '4th of July celebration'
        },
        confetti: {
          name: 'Confetti',
          emoji: '🎉',
          description: 'Party celebration'
        },
        autumn: {
          name: 'Autumn Leaves',
          emoji: '🍂',
          description: 'Fall foliage'
        },
        stars: {
          name: 'Starry Night',
          emoji: '⭐',
          description: 'Night sky effect'
        },
        hearts: {
          name: 'Hearts',
          emoji: '❤️',
          description: 'Valentine\'s Day'
        },
        bubbles: {
          name: 'Bubbles',
          emoji: '🫧',
          description: 'Floating bubbles'
        }
      },
      datePresets: [
        { name: 'Christmas', emoji: '🎄', effect: 'snow' },
        { name: '4th of July', emoji: '🎆', effect: 'fireworks' },
        { name: 'Valentine\'s', emoji: '❤️', effect: 'hearts' },
        { name: 'New Year', emoji: '🎉', effect: 'confetti' }
      ],
      particlePresets: {
        snow: {
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
          color: '#ff69b4',
          opacity: 0.7,
          shape: 'circle',
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
    currentPreview() {
      return this.particlePresets[this.settings.effectType] || this.particlePresets.none
    }
  },
  mounted() {
    if (process.client && auth) {
      auth.onAuthStateChanged((user) => {
        this.isLoggedIn = !!user
        if (user) {
          this.loadSettings()
        }
      })
    }
  },
  methods: {
    async login() {
      if (!auth) {
        this.loginError = 'Firebase not configured'
        return
      }
      
      this.loggingIn = true
      this.loginError = ''
      
      try {
        await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword)
        this.isLoggedIn = true
        this.loadSettings()
      } catch (error) {
        this.loginError = 'Invalid email or password'
        console.error('Login error:', error)
      } finally {
        this.loggingIn = false
      }
    },
    
    async logout() {
      if (!auth) return
      await signOut(auth)
      this.isLoggedIn = false
      this.loginEmail = ''
      this.loginPassword = ''
    },
    
    loadSettings() {
      if (!database) return
      
      const settingsRef = ref(database, 'particleSettings')
      onValue(settingsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          this.settings = {
            enabled: data.enabled || false,
            effectType: data.effectType || 'none'
          }
        }
      })
    },
    
    async saveSettings() {
      if (!database || !this.isLoggedIn) return
      
      try {
        const settingsRef = ref(database, 'particleSettings')
        await set(settingsRef, this.settings)
        
        this.saveSuccess = true
        setTimeout(() => {
          this.saveSuccess = false
        }, 3000)
      } catch (error) {
        console.error('Save error:', error)
      }
    },
    
    applyPreset(effectType) {
      this.settings.effectType = effectType
      this.settings.enabled = true
      this.saveSettings()
    }
  }
}
</script>

<style scoped>
.admin-panel {
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  overflow: hidden;
}

.effect-card,
.preview-card,
.preset-card {
  height: 100%;
  border-radius: 12px;
}

.effect-label {
  display: flex;
  align-items: center;
  width: 100%;
}

.preview-container {
  position: relative;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  overflow: hidden;
}

.preview-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.no-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.preset-btn {
  text-transform: none;
  font-size: 1em;
}

/* Mobile responsive */
@media (max-width: 600px) {
  .admin-panel {
    padding: 20px 10px;
  }
  
  .preview-container {
    height: 300px;
  }
}
</style>
