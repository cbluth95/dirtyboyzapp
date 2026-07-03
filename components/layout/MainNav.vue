<template>
  <div id="nav">
    <!-- Mobile Drawer -->
    <v-navigation-drawer
      class="hidden-lg-and-up drawerBack"
      style="background-color: #34221a;"
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      disable-resize-watcher
      fixed
      app
    >
      <!-- Drawer logo header -->
      <div class="drawer-header">
        <img src="../../assets/logo1.png" class="drawer-logo" alt="Dirty Boyz Sanitation" />
        <div class="drawer-brand">Dirty Boyz Sanitation</div>
      </div>
      <v-divider style="border-color: rgba(255,194,0,0.3);"></v-divider>
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.path"
          @click="drawer = false"
        >
          <v-list-tile-content class="link-title">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      color="transparent"
      height="80"
      app
      flat
      :clipped-left="clipped"
      :class="['main-nav', 'glass-nav', { 'nav-hidden': navHidden }]"
    >
      <!-- Mobile: hamburger -->
      <v-btn
        icon
        flat
        class="hidden-lg-and-up hamburger-btn"
        @click.stop="drawer = !drawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>

      <!-- Desktop LEFT nav: all 4 items -->
      <v-toolbar-items class="hidden-md-and-down nav-items-container">
        <v-btn
          v-for="(item, i) in navItems"
          :key="'l'+i"
          class="navBtn text-capitalize"
          :ripple="false"
          flat
          :to="item.path"
          :exact="item.path === '/'"
        >{{ item.title }}</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <!-- CENTER LOGO MEDALLION (desktop only, absolutely centered) -->
      <div class="center-logo-wrap hidden-md-and-down">
        <router-link to="/" class="medallion-link">
          <div class="logo-medallion">
            <img
              src="../../assets/logo1.png"
              class="nav-logo-center"
              alt="Dirty Boyz Sanitation"
            />
          </div>
        </router-link>
      </div>

      <!-- Mobile logo — absolutely centered -->
      <div class="mobile-logo-wrap hidden-lg-and-up">
        <router-link to="/">
          <img
            src="../../assets/logo1.png"
            class="nav-logo"
            alt="Dirty Boyz Sanitation"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <!-- Dark Mode Toggle -->
      <v-btn icon flat class="dark-toggle-btn" @click="$emit('toggle-dark')" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        <v-icon color="#ffc200">{{ isDark ? 'brightness_7' : 'brightness_4' }}</v-icon>
      </v-btn>

      <!-- Call Button -->
      <v-btn
        href="tel:307-321-3874"
        class="call-btn elevation-6"
        color="#ffc200"
      >
        <v-icon left color="#34221a">phone</v-icon>
        <span class="hidden-sm-and-down">Call Us</span>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Dirty Boyz Sanitation',
      navHidden: false,
      lastScrollY: 0
    }
  },
  mounted() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  computed: {
    navItems() {
      return [
        { title: 'Home', path: '/' },
        { title: 'Services', path: '/services' },
        { title: 'About', path: '/about' },
        { title: 'Contact', path: '/contact' }
      ]
    }
  },
  watch: {
    $route() {
      this.navHidden = false
      this.lastScrollY = 0
    }
  },
  methods: {
    handleScroll() {
      const y = window.scrollY
      if (y < 80) {
        this.navHidden = false
      } else if (y > this.lastScrollY + 6) {
        this.navHidden = true
      } else if (y < this.lastScrollY - 6) {
        this.navHidden = false
      }
      this.lastScrollY = y
    }
  }
}
</script>

<style scoped>
/* Drawer border only when open — when closed it translates offscreen by its
   width, which would leave a 1px border line visible at the screen edge */
.drawerBack {
  border-right: 1px solid #ffc200;
}

.drawerBack.v-navigation-drawer--close {
  border-right: none;
  visibility: hidden;
  /* wait for the slide-out animation before hiding */
  transition: visibility 0s 0.3s, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glassmorphism Navigation */
.glass-nav {
  background: #34221a !important;
  border-bottom: 1px solid rgba(255, 194, 0, 0.2) !important;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: visible !important;
  will-change: transform;
}

.glass-nav.nav-hidden {
  transform: translateY(calc(-100% - 60px)) !important;
}

/* Mobile logo — absolutely centered in toolbar */
.mobile-logo-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}

.mobile-logo-wrap a {
  display: block;
  text-decoration: none;
}

/* Hamburger button */
.hamburger-btn {
  color: #ffc200 !important;
  margin-right: 4px;
}

.hamburger-btn .v-icon {
  color: #ffc200 !important;
  font-size: 28px !important;
}

/* Drawer header */
.drawer-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 16px;
  gap: 8px;
}

.drawer-logo {
  height: 80px;
  width: 80px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
}

.drawer-brand {
  font-family: 'Baloo Bhai', cursive;
  font-size: 1rem;
  color: rgba(255,255,255,0.85);
  text-align: center;
  letter-spacing: 0.5px;
}

.nav-logo {
  height: 52px;
  transition: transform 0.3s ease;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.3));
}

.nav-logo:hover {
  transform: scale(1.05);
}

/* Center medallion — desktop */
.center-logo-wrap {
  position: absolute;
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
  z-index: 10;
}

.medallion-link {
  display: block;
  text-decoration: none;
}

.logo-medallion {
  width: 114px;
  height: 114px;
  border-radius: 50%;
  background: rgba(52, 34, 26, 0.96);
  border: 2px solid rgba(255, 194, 0, 0.5);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.45),
    0 0 0 4px rgba(255, 194, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.logo-medallion:hover {
  border-color: rgba(255, 194, 0, 0.9);
  box-shadow:
    0 6px 32px rgba(0, 0, 0, 0.5),
    0 0 0 4px rgba(255, 194, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transform: scale(1.06);
}

.nav-logo-center {
  height: 92px;
  width: 92px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
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
  transition: color 0.3s ease !important;
  margin: 0 4px;
  background: transparent !important;
  border-radius: 0 !important;
  box-shadow: inset 0 -3px 0 0 transparent !important;
}

/* Kill Vuetify's built-in hover/active overlay + ripple completely */
.navBtn::before,
.navBtn::after {
  display: none !important;
}

.navBtn >>> .v-ripple__container {
  display: none !important;
}

.navBtn:hover,
.navBtn:focus,
.navBtn:active {
  background: transparent !important;
}

.navBtn:hover {
  color: #ffc200 !important;
}

/* Keyboard focus: gold underline instead of outline box */
.navBtn:focus,
.navBtn:focus-visible {
  outline: none !important;
}

.navBtn:focus-visible {
  color: #ffc200 !important;
  box-shadow: inset 0 -4px 0 0 #ffc200 !important;
}

a.navBtn.v-btn--active {
  background: transparent !important;
  color: #ffc200 !important;
  font-weight: 600 !important;
  box-shadow: inset 0 -4px 0 0 #ffc200 !important;
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

/* Hamburger Menu Icon */
.v-toolbar__side-icon {
  min-width: 48px !important;
  width: 48px !important;
  height: 48px !important;
  margin-right: 8px !important;
}

.v-toolbar__side-icon .v-icon {
  font-size: 28px !important;
  color: #ffc200 !important;
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
    height: 50px;
  }

  .glass-nav {
    height: 72px !important;
  }
}
</style>
