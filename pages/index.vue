<template>
  <v-container>
    <v-layout>
      <v-carousel>
        <v-carousel-item
          v-for="(item,i) in sliderItems"
          :key="i"
          :src="item.src"
          reverse-transition="fade"
          transition="fade"
        ></v-carousel-item>
      </v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: null
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
