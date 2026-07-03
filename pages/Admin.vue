<template>
  <v-container fluid class="admin-panel">

    <!-- ── LOGIN ── -->
    <div v-if="!isLoggedIn" class="login-wrapper">
      <v-card class="login-card elevation-16">
        <!-- Header -->
        <div class="login-header">
          <img src="@/assets/logo1.png" class="login-logo" alt="Dirty Boyz Sanitation" />
          <h2 class="login-title">Admin Access</h2>
          <p class="login-sub">Dirty Boyz Sanitation</p>
        </div>

        <!-- Form -->
        <div class="login-body">
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="loginEmail"
              label="Email"
              type="email"
              solo
              prepend-inner-icon="person"
              class="login-field"
              required
            ></v-text-field>

            <v-text-field
              v-model="loginPassword"
              label="Password"
              :type="showPass ? 'text' : 'password'"
              solo
              prepend-inner-icon="lock"
              class="login-field"
              required
            >
              <template v-slot:append>
                <v-icon @click="showPass = !showPass" style="cursor:pointer;color:rgba(255,255,255,0.6);">
                  {{ showPass ? 'visibility_off' : 'visibility' }}
                </v-icon>
              </template>
            </v-text-field>

            <v-slide-y-transition>
              <v-alert v-if="loginError" type="error" :value="true" class="login-error" dense>
                {{ loginError }}
              </v-alert>
            </v-slide-y-transition>

            <v-btn
              type="submit"
              block
              class="login-btn"
              color="#ffc200"
              :loading="loggingIn"
              large
            >
              <v-icon left color="#34221a">exit_to_app</v-icon>
              <span style="color:#34221a;font-weight:700;font-size:1.05rem;">Sign In</span>
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </div>

    <!-- ── ADMIN PANEL ── -->
    <v-layout v-else row wrap>
      <v-flex xs12>
        <v-card class="glass-card elevation-12">
          <v-card-title class="headline primary--text">
            <v-icon left color="primary">settings</v-icon>
            Particle Effect Admin Panel
          </v-card-title>
          <v-card-text>
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
                      <shared-particle-effect
                        v-if="settings.enabled && settings.effectType !== 'none'"
                        :key="settings.effectType"
                        :inline="true"
                        :preview-effect="settings.effectType"
                        class="preview-particles"
                      />
                      <div v-else class="no-preview">
                        <v-icon size="64" color="grey lighten-1">visibility_off</v-icon>
                        <p class="mt-3 grey--text">{{ settings.enabled ? 'Select an effect' : 'Enable particles to preview' }}</p>
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
import { particlePresets, effectMeta } from '@/plugins/particlePresets'
import { auth, db } from '@/plugins/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, onSnapshot } from 'firebase/firestore'

export default {
  name: 'ParticleAdmin',
  data() {
    return {
      isLoggedIn: false,
      showPass: false,
      loginEmail: '',
      loginPassword: '',
      loginError: '',
      loggingIn: false,
      saveSuccess: false,
      settings: {
        enabled: false,
        effectType: 'none'
      },
      datePresets: [
        { name: 'Christmas', emoji: '🎄', effect: 'snow' },
        { name: '4th of July', emoji: '🎆', effect: 'fireworks' },
        { name: 'Valentine\'s', emoji: '❤️', effect: 'hearts' },
        { name: 'New Year', emoji: '🎉', effect: 'confetti' },
        { name: 'Halloween', emoji: '🦇', effect: 'halloween' }
      ]
    }
  },
  computed: {
    previewConfig() {
      const preset = particlePresets[this.settings.effectType] || particlePresets.none
      const config = JSON.parse(JSON.stringify(preset))
      // Reduce particles for preview box
      if (config.particles && config.particles.number) {
        config.particles.number.value = Math.floor((config.particles.number.value || 50) * 0.35)
      }
      // Scale down emitters for preview
      if (config.emitters) {
        config.emitters = config.emitters.map(e => ({ ...e, rate: { ...e.rate, quantity: Math.floor(e.rate.quantity * 0.4) } }))
      }
      return config
    },
    effectTypes() {
      return effectMeta
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
    } else if (process.client) {
      // Firebase not configured — load from localStorage
      try {
        const stored = localStorage.getItem('particleSettings')
        if (stored) this.settings = JSON.parse(stored)
      } catch (e) {}
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
      if (!db) return

      const settingsRef = doc(db, 'config', 'particles')
      onSnapshot(settingsRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data()
          this.settings = {
            enabled: data.enabled || false,
            effectType: data.effectType || 'none'
          }
        }
      })
    },

    async saveSettings() {
      if (!process.client) return

      // Always mirror to localStorage for instant local ParticleEffect updates
      try {
        localStorage.setItem('particleSettings', JSON.stringify(this.settings))
        window.dispatchEvent(new CustomEvent('particleSettingsChanged', {
          detail: this.settings
        }))
      } catch (e) {}

      // Persist to Firestore if available
      if (db && this.isLoggedIn) {
        try {
          await setDoc(doc(db, 'config', 'particles'), {
            ...this.settings,
            updatedAt: new Date().toISOString()
          })
          this.saveSuccess = true
          setTimeout(() => { this.saveSuccess = false }, 3000)
        } catch (error) {
          console.error('Firestore save error:', error)
        }
      } else {
        this.saveSuccess = true
        setTimeout(() => { this.saveSuccess = false }, 3000)
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
/* ── Page ── */
.admin-panel {
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
}

/* ── Login card ── */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 160px);
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(52, 34, 26, 0.94) !important;
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border-radius: 22px !important;
  border: 1px solid rgba(255, 194, 0, 0.28);
  overflow: hidden;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px 28px;
  background: linear-gradient(160deg, rgba(255,194,0,0.1) 0%, rgba(52,34,26,0) 100%);
  border-bottom: 1px solid rgba(255, 194, 0, 0.18);
}

.login-logo {
  height: 88px;
  width: 88px;
  object-fit: contain;
  margin-bottom: 14px;
  filter: drop-shadow(0 4px 18px rgba(0,0,0,0.45));
}

.login-title {
  font-family: 'Baloo Bhai', cursive;
  font-size: 1.65rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px;
  letter-spacing: 0.4px;
}

.login-sub {
  font-size: 0.82rem;
  color: rgba(255, 194, 0, 0.7);
  margin: 0;
  letter-spacing: 0.5px;
}

.login-body {
  padding: 32px 36px 40px;
}

.login-field {
  margin-bottom: 14px;
}

.login-field >>> .v-input__slot {
  background: rgba(255, 255, 255, 0.07) !important;
  border: 1px solid rgba(255, 194, 0, 0.2) !important;
  border-radius: 12px !important;
  padding: 0 16px !important;
}

.login-field >>> .v-label,
.login-field >>> input,
.login-field >>> .v-icon {
  color: rgba(255, 255, 255, 0.75) !important;
}

.login-error {
  border-radius: 10px !important;
  margin-bottom: 14px;
}

.login-btn {
  margin-top: 6px;
  border-radius: 26px !important;
  font-family: 'Baloo Bhai', cursive !important;
  height: 52px !important;
  text-transform: none !important;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 22px rgba(255, 194, 0, 0.4) !important;
  transition: box-shadow 0.3s ease, transform 0.2s ease !important;
}

.login-btn:hover {
  box-shadow: 0 6px 32px rgba(255, 194, 0, 0.55) !important;
  transform: translateY(-1px);
}

/* ── Admin panel ── */
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

@media (max-width: 600px) {
  .admin-panel { padding: 20px 10px; }
  .login-body { padding: 24px 20px 32px; }
  .preview-container { height: 300px; }
}
</style>
</style>
