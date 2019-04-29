<template>
  <v-container fluid>
    <main>
      <section>
        <v-parallax :src="background" height="500">
          <v-layout row wrap align-center justify-center>
            <v-flex xs12 text-xs-center>
              <h1 style="font-size: 4em">We want your trash!</h1>
              <v-btn>Our Services</v-btn>
              <v-btn>Get a free estimate</v-btn>
            </v-flex>
          </v-layout>
        </v-parallax>

        <div id="content">
          <v-layout row wrap class="my-5" background-color="#111">
            <v-flex xs12 sm4 pa-4>
              <v-card light height="300" class="elevation-0">
                <v-card-media height="45px" class="text-xs-center">
                  <v-icon x-large class="brown--text">flash_on</v-icon>
                </v-card-media>
                <v-card-title primary-title>
                  <div class="headline text-xs-center" style="width:100%">Recycling</div>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros.
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm4 pa-4>
              <v-card light height="300" class="elevation-0">
                <v-card-media height="45px" class="text-xs-center">
                  <v-icon x-large class="brown--text">group</v-icon>
                </v-card-media>
                <v-card-title primary-title>
                  <div class="headline text-xs-center" style="width:100%">Trash Pickup</div>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros.
                  Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere
                  et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm4 pa-4>
              <v-card light height="300" class="elevation-0">
                <v-card-media height="45px" class="text-xs-center">
                  <v-icon x-large class="brown--text">settings</v-icon>
                </v-card-media>
                <v-card-title primary-title>
                  <div class="headline text-xs-center" style="width:100%">House Clean Outs</div>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros.
                  Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </section>

      <section>
        <v-parallax :src="background" height="500">
          <v-layout column align-center justify-center>
            <div
              class="headline white--text text-xs-center"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <div id="content">
          <v-layout row wrap class="my-5">
            <v-flex xs12>
              <v-card class="elevation-0">
                <v-card-title primary-title>
                  <div class="headline text-xs-center" style="width:100%">Contact Us</div>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros.
                  Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere
                  et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl
                  maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida
                  ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia Curae;
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </section>

      <section>
        <v-parallax :src="background" height="500">
          <v-layout column align-center justify-center>
            <div
              class="headline white--text text-xs-center"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </v-layout>
        </v-parallax>
      </section>
    </main>
  </v-container>
</template>

<script>
import background from '../assets/images/img2.jpg'
export default {
  data() {
    return {
      items: null,
      background: background
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
