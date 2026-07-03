<template>
  <v-app :dark="isDark" :class="['app-root', { 'dark-mode': isDark }]">
    <!-- Particle Effect Layer -->
    <shared-particle-effect />
    
    <layout-main-nav :is-dark="isDark" @toggle-dark="toggleDark" />
    <v-content v-show="loaded" class="animated fadeIn" style="padding-top: 0;">
      <nuxt/>
    </v-content>

    <v-footer height="auto">
      <v-card class="flex" flat tile color="accent">
        <v-card-actions class="grey darken-3" style="padding: 10px 24px;">
          <span style="flex:1;text-align:left;font-size:0.85rem;">
            &copy; {{ currentYear }} &mdash; <strong>Dirty Boyz Sanitation</strong>
          </span>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:0.8rem;opacity:0.7;">Created By</span>
            <v-img
              :src="wyopcLogo"
              width="110"
              height="40"
              contain
              style="flex-shrink:0;"
            ></v-img>
          </div>
        </v-card-actions>
      </v-card>
    </v-footer>

    <v-btn
      v-show="isScrolled"
      id="toTop"
      class="md-5 mr-3 elevation-21 animated zoomIn"
      dark
      fab
      button
      bottom
      right
      color="#ffc200"
      fixed
      style="bottom: 80px !important; right: 16px !important;"
      @click="scrollTop"
    >
      <v-icon dark>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      wyopcLogo: require('@/assets/revamplogo.png'),
      loaded: false,
      isScrolled: false,
      isDark: true,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  beforeMount() {
    // eventually fix this image load time problem
    this.loadApp()
    if (process.browser) {
      const stored = localStorage.getItem('darkMode')
      this.isDark = stored === null ? true : stored === 'true'
      window.onscroll = this.handleScroll
    }
  },
  methods: {
    loadApp() {
      this.loaded = !this.loaded
    },
    toggleDark() {
      this.isDark = !this.isDark
      if (process.browser) {
        localStorage.setItem('darkMode', String(this.isDark))
      }
    },
    scrollTop() {
      window.scrollTo(0, 0)
    },
    handleScroll() {
      if (process.browser) {
        if (
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
        ) {
          this.isScrolled = true
        } else {
          this.isScrolled = false
        }
      }
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>

