<template>
  <v-container fluid>
    <main>
      <section>
        <v-img cover :src="background" :height="window.height">
          <div class="fill-height overlay-gradient">
            <v-container bg fill-height grid-list-md text-xs-center>
              <v-layout row wrap align-center justify-center>
                <v-flex xs12 text-xs-center>
                  <h1
                    style="font-size: 6em;color: #ffc200;line-height: 1;"
                    class="pTitle"
                  >We Want Your Trash!</h1>
                  <v-btn class="header-btn" outline large to="/contact">Get a free estimate</v-btn>
                  <v-btn class="header-btn" outline large to="/services">Our Services</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </v-img>
        <!-- <v-parallax :src="background" :height="window.height">
          <div class="fill-height overlay-gradient">
            <v-container bg fill-height grid-list-md text-xs-center>
              <v-layout row wrap align-center justify-center>
                <v-flex xs12 text-xs-center>
                  <h1 style="font-size: 4em">We Want Your Trash!</h1>
                  <v-btn class="header-btn" outline large>Get a free estimate</v-btn>
                  <v-btn class="header-btn" outline large to="/services">Our Services</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </v-parallax>-->
      </section>
      <shared-service-panel />
      <!-- <shared-news-updates/> -->
      <shared-service-promo />
      <shared-contact-us />
    </main>
  </v-container>
</template>

<script>
import background from '../assets/images/img2.jpg'
import Glass from '../assets/images/static/trashbins/glass.png'

export default {
  data() {
    return {
      items: null,
      background: background,
      glass: Glass,
      window: {
        width: 0,
        height: 0
      }
    }
  },
  beforeMount() {
    if (process.browser) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  },
  computed: {
    sliderItems() {
      const items = [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
      return items
    }
  }
}
</script>

<style>
.v-parallax__content {
  padding: 0 !important;
}
.v-parallax__image {
  background-position: bottom;
}
.overlay-gradient {
  background-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.9) 100%
    ),
    linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
}
.overlay-gradient-red {
  background-image: linear-gradient(to bottom, #67434366 0%, #b52020a8 100%),
    linear-gradient(to top, #000000a8 0%, #350000e8 100%);
}
.header-btn {
  width: 220px;
}

/* Transitions using the page hook */
page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}
.page-enter,
.page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}
</style>

