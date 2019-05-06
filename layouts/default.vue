<template>
  <v-app dark style="background-color: white;">
    <layout-main-nav/>
    <v-content>
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
  </v-app>
</template>

<script>
import wyoPcLogo from '@/assets/wyopclogo.png'
export default {
  data() {
    return {
      wyopcLogo: wyoPcLogo,
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
  }
}
</script>

<style>
.container {
  padding: 0px !important;
}
</style>

