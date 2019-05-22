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
      style="background-color: #34221a;border-right: 1px solid #ffc200;"
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
            <v-icon color="black" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="link-title">
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
    <v-toolbar color="#34221a" height="100" app :clipped-left="clipped" class="main-nav">
      <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-container fill-height fluid>
        <v-layout row align-center justify-center text-xs-center>
          <router-link to="/">
            <img
              src="../../assets/logo1.png"
              class="animated rubberBand"
              style="height: 80px; margin-left: -36px;"
              alt
            >
          </router-link>
        </v-layout>
        <v-layout justify-center class="hidden-md-and-down">
          <v-toolbar-items v-for="(item, i) in navItems" :key="i">
            <v-btn
              v-if="item.dropdown == null"
              class="navBtn text-capitalize"
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
          </v-toolbar-items>
        </v-layout>
      </v-container>
      <v-spacer class="hidden-lg-and-up"></v-spacer>

      <!-- <v-spacer></v-spacer> -->
      <!-- <v-toolbar-items class="hidden-md-and-down" v-for="(item, i) in navItems" :key="i">
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
      </v-toolbar-items>-->
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
          title: 'Home',
          path: '/'
        },
        {
          icon: '',
          title: 'Services',
          path: '/services'
        },
        {
          icon: '',
          title: 'Gallery',
          path: '/gallery'
        },
        {
          icon: '',
          title: 'About',
          path: '/about'
        },
        {
          icon: '',
          title: 'Contact',
          path: '/contact'
        }
      ]
      return items
    }
  }
}
</script>

<style>
/* shouldnt have to do this */
.primary--text {
  color: black !important;
}
#nav {
  z-index: 10;
}
.v-list {
  padding: 0;
}
.v-list > div {
  background-color: #ffc200;
}
.navBtn {
  width: 150px;
  font-size: 1.25em;
  font-family: 'Baloo Bhai', cursive;
  /* font-family: 'Merriweather', serif; */
  /* font-family: 'Gravitas One', cursive; */
}
.link-title {
  font-size: 1.25em;
  font-family: 'Baloo Bhai', cursive;
}
a.v-list__tile--active {
  color: white !important;
}
a.navBtn.v-btn--active {
  font-size: 1.5em;
  background-color: #292929;
  transition: background-color 0.5s;
  border-bottom: 4px solid #ffc200;
}

/* nav drawer */
a.v-list__tile.v-list__tile--link.theme--dark.primary--text {
  border-bottom: 1px solid black;
}
</style>


