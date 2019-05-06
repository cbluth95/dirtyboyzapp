<template>
  <div id="nav">
    <!-- <v-toolbar light app height="40px" class="elevation-0 top-bar">
      <v-spacer></v-spacer>
      <v-btn flat icon href="mailto:contact@themovies3.com">
        <v-icon>mail</v-icon>
      </v-btn>
      <v-btn flat icon href="tel:307-324-6624">
        <v-icon color="black">phone</v-icon>
      </v-btn>
    </v-toolbar>-->
    <v-navigation-drawer
      class="hidden-lg-and-up drawerBack"
      dark
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      disable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in navItems" :key="i" :to="item.path">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="white--text">
            <v-list-tile-title v-if="item.dropdown == null">{{item.title}}</v-list-tile-title>
            <v-menu open-on-hover bottom offset-y v-if="item.dropdown == true" light>
              <v-list-tile-title slot="activator">
                {{item.title}}
                <v-icon v-for="i in item.subItems" :key="i.id" v-html="i.icon"></v-icon>
              </v-list-tile-title>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in item.subItems"
                  :to="item.path"
                  :key="index"
                  @click
                >
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar light height="100" app :clipped-left="clipped" class="main-nav">
      <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer class="hidden-lg-and-up"></v-spacer>
      <router-link to="/">
        <img src="../../assets/logo.png" style="width: 250px;height: 55px" alt>
        <!-- <v-toolbar-title class="white--text text-xs-center mr-4">{{title}}</v-toolbar-title> -->
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down" v-for="(item, i) in navItems" :key="i">
        <v-btn
          v-if="item.dropdown == null"
          class="navBtn"
          :ripple="{ class: 'primary--text' }"
          flat
          :to="item.path"
        >{{item.title}}</v-btn>
        <v-menu open-on-hover bottom offset-y v-if="item.dropdown == true" light>
          <v-btn v-if="item.dropdown == true" slot="activator" class="navBtn" flat>
            {{item.title}}
            <v-icon v-for="i in item.subItems" :key="i.id" v-html="i.icon"></v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, index) in item.subItems" :to="item.path" :key="index" @click>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Dirty Boyz Sanitation'
    }
  },
  computed: {
    navItems() {
      const items = [
        {
          icon: 'home',
          title: 'home',
          path: '/'
        },
        {
          icon: '',
          title: 'services',
          path: '/services'
        },
        {
          icon: '',
          title: 'gallery',
          path: '/gallery'
        },
        {
          icon: '',
          title: 'about',
          path: '/about'
        },
        {
          icon: '',
          title: 'contact',
          path: '/contact'
        }
      ]
      return items
    }
  }
}
</script>

