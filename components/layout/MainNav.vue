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
        <v-list-tile
          value="true"
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon color="black" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="link-title">
            <v-list-tile-title v-if="item.dropdown == null">{{
              item.title
            }}</v-list-tile-title>
            <v-menu
              open-on-hover
              bottom
              offset-y
              v-if="item.dropdown == true"
              light
            >
              <v-list-tile-title slot="activator">
                {{ item.title }}
                <v-icon
                  v-for="i in item.subItems"
                  :key="i.id"
                  v-html="i.icon"
                ></v-icon>
              </v-list-tile-title>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in item.subItems"
                  :to="item.path"
                  :key="index"
                >
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="transparent"
      height="70"
      app
      flat
      :clipped-left="clipped"
      class="main-nav glass-nav"
    >
      <v-toolbar-side-icon
        class="hidden-lg-and-up"
        color="#ffc200"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      
      <!-- Logo -->
      <v-toolbar-title class="logo-container">
        <router-link to="/">
          <img
            src="../../assets/logo1.png"
            class="nav-logo"
            alt="Dirty Boyz Sanitation"
          />
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Nav Items -->
      <v-toolbar-items class="hidden-md-and-down nav-items-container">
        <v-btn
          v-for="(item, i) in navItems"
          :key="i"
          v-if="item.dropdown == null"
          class="navBtn text-capitalize"
          :ripple="{ class: 'primary--text' }"
          flat
          :to="item.path"
        >
          {{ item.title }}
        </v-btn>
        <v-menu
          v-if="item.dropdown == true"
          v-for="(item, i) in navItems"
          :key="i"
          open-on-hover
          bottom
          offset-y
          light
        >
          <v-btn
            slot="activator"
            class="navBtn"
            flat
          >
            {{ item.title }}
            <v-icon
              v-for="i in item.subItems"
              :key="i.id"
              v-html="i.icon"
            ></v-icon>
          </v-btn>
          <v-list class="glass-menu">
            <v-list-tile
              v-for="(item, index) in item.subItems"
              :to="item.path"
              :key="index"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-spacer class="hidden-lg-and-up"></v-spacer>
      
      <!-- Call Button -->
      <v-btn 
        href="tel:307-321-3874" 
        class="call-btn elevation-6"
        color="#ffc200"
      >
        <v-icon left color="#34221a">phone</v-icon>
        <span class="hidden-sm-and-down">Call Us</span>
      </v-btn>

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
        // {
        //   icon: '',
        //   title: 'Gallery',
        //   path: '/gallery'
        // },
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

<style scoped>
/* Glassmorphism Navigation */
.glass-nav {
  background: rgba(52, 34, 26, 0.85) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 194, 0, 0.2) !important;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.3s ease;
}

.glass-nav:hover {
  background: rgba(52, 34, 26, 0.92) !important;
  border-bottom: 1px solid rgba(255, 194, 0, 0.4) !important;
}

/* Logo Styling */
.logo-container {
  padding: 8px 0;
}

.nav-logo {
  height: 55px;
  transition: transform 0.3s ease;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.3));
}

.nav-logo:hover {
  transform: scale(1.05);
}

/* Navigation Items */
.nav-items-container {
  gap: 8px;
  margin-right: 16px;
}

.navBtn {
  min-width: 100px !important;
  height: 50px !important;
  font-size: 1.1em !important;
  font-family: 'Baloo Bhai', cursive !important;
  font-weight: 500 !important;
  color: #ffffff !important;
  letter-spacing: 0.5px;
  position: relative;
  transition: all 0.3s ease !important;
  margin: 0 4px;
}

.navBtn::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #ffc200, #ffdd00);
  transform: translateX(-50%);
  transition: width 0.3s ease;
  border-radius: 2px 2px 0 0;
}

.navBtn:hover {
  background: rgba(255, 194, 0, 0.1) !important;
  color: #ffc200 !important;
  transform: translateY(-2px);
}

.navBtn:hover::before {
  width: 80%;
}

a.navBtn.v-btn--active {
  background: rgba(255, 194, 0, 0.15) !important;
  color: #ffc200 !important;
  font-weight: 600 !important;
}

a.navBtn.v-btn--active::before {
  width: 100%;
  height: 4px;
}

/* Call Button */
.call-btn {
  font-family: 'Baloo Bhai', cursive !important;
  font-weight: 600 !important;
  font-size: 1.1em !important;
  padding: 0 24px !important;
  height: 48px !important;
  border-radius: 24px !important;
  background: linear-gradient(135deg, #ffc200 0%, #ffdd00 100%) !important;
  color: #34221a !important;
  transition: all 0.3s ease !important;
  text-transform: none !important;
  letter-spacing: 0.5px;
}

.call-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 24px rgba(255, 194, 0, 0.4) !important;
}

/* Glass Menu Dropdown */
.glass-menu {
  background: rgba(52, 34, 26, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 194, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.glass-menu .v-list__tile {
  color: #ffffff;
  transition: all 0.3s ease;
}

.glass-menu .v-list__tile:hover {
  background: rgba(255, 194, 0, 0.2) !important;
  color: #ffc200 !important;
}

/* Mobile Drawer */
.drawerBack {
  background: rgba(52, 34, 26, 0.98) !important;
  backdrop-filter: blur(20px);
}

.link-title {
  font-size: 1.2em;
  font-family: 'Baloo Bhai', cursive;
  color: #ffffff;
}

a.v-list__tile--active {
  background: rgba(255, 194, 0, 0.15) !important;
  color: #ffc200 !important;
  border-left: 4px solid #ffc200;
}

a.v-list__tile.v-list__tile--link.theme--dark {
  border-bottom: 1px solid rgba(255, 194, 0, 0.1);
  transition: all 0.3s ease;
}

a.v-list__tile.v-list__tile--link.theme--dark:hover {
  background: rgba(255, 194, 0, 0.1) !important;
  border-left: 4px solid #ffc200;
}

#nav {
  z-index: 100;
}

/* Responsive */
@media (max-width: 960px) {
  .nav-logo {
    height: 45px;
  }
  
  .glass-nav {
    height: 64px !important;
  }
}
</style>
