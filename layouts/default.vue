<template>
  <v-app dark style="background-color: white;">
    <layout-main-nav/>
    <v-content v-show="loaded" class="animated fadeIn">
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>

    <v-footer height="auto">
      <v-card class="flex" flat tile color="accent">
        <v-card-actions class="grey darken-3 justify-center">
          <v-layout row wrap justify-center text-xs-center>
            <v-flex xs12>
              &copy; —
              <strong>Dirty Boyz Sanitation</strong>
            </v-flex>
            <v-flex xs12>
              <strong>Created By</strong>
              <v-img :src="wyopcLogo" width="150" style="margin-left:auto;margin-right:auto;"></v-img>
            </v-flex>
          </v-layout>
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
      wyopcLogo: require('@/assets/wyopclogo.png'),
      loaded: false,
      isScrolled: false,
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
  beforeMount() {
    // eventually fix this image load time problem
    this.loadApp()
    if (process.browser) {
      window.onscroll = this.handleScroll
    }
  },
  methods: {
    loadApp() {
      this.loaded = !this.loaded
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
.container {
  padding: 0px !important;
}
.pTitle {
  font-size: 2.5em;
  font-family: 'Baloo Bhai', cursive;
}
</style>

