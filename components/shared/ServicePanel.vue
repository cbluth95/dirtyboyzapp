<template>
  <section>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex
          style="background-color: white;"
          xs12
          sm6
          md3
          v-for="(item, i) in serviceList"
          :key="i"
        >
          <v-card light height="400px">
            <v-container fill-height>
              <v-layout row wrap align-center>
                <v-flex xs12 mt-2 justify-center text-xs-center>
                  <v-img
                    cover
                    :src="item.icon"
                    class="service-icon"
                    height="150px"
                    :width="item.imgWidth"
                  ></v-img>
                  <p class="mt-2 headline">{{item.title}}</p>
                </v-flex>
                <v-flex xs12 ml-2 mr-2>
                  <v-divider></v-divider>
                </v-flex>

                <v-flex xs12 pa-3 text-xs-center>
                  <p>{{item.info}}</p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      recycleImg: require('@/assets/images/static/icons/recycle.png'),
      wasteImg: require('@/assets/images/static/services/waste.png'),
      bulkPickupImg: require('@/assets/images/static/services/bulkpickup.png'),
      cleanoutImg: require('@/assets/images/static/services/cleanout.png')
    }
  },
  computed: {
    serviceList() {
      const items = [
        {
          icon: this.recycleImg,
          title: 'Recycling Services',
          info: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit,
             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Justo eget magna fermentum iaculis eu non diam phasellus.
             Dictum fusce ut placerat orci nulla pellentesque.
             Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget.
             Pulvinar mattis nunc sed blandit.`,
          imgWidth: 155,
          btnTitle: ''
        },
        {
          icon: this.wasteImg,
          title: 'Waste Management',
          info: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit,
             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Justo eget magna fermentum iaculis eu non diam phasellus.
             Dictum fusce ut placerat orci nulla pellentesque.
             Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget.
             Pulvinar mattis nunc sed blandit.`,
          imgWidth: 267,
          btnTitle: ''
        },
        {
          icon: this.cleanoutImg,
          title: 'House Clean Outs',
          info: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit,
             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Justo eget magna fermentum iaculis eu non diam phasellus.
             Dictum fusce ut placerat orci nulla pellentesque.
             Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget.
             Pulvinar mattis nunc sed blandit.`,
          imgWidth: 200,
          btnTitle: ''
        },
        {
          icon: this.bulkPickupImg,
          title: 'Bulk Pickup',
          info: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit,
             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
             Justo eget magna fermentum iaculis eu non diam phasellus.
             Dictum fusce ut placerat orci nulla pellentesque.
             Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget.
             Pulvinar mattis nunc sed blandit.`,
          imgWidth: 267,
          btnTitle: ''
        }
      ]
      return items
    }
  }
}
</script>

<style scoped>
.service-icon {
  margin-left: auto;
  margin-right: auto;
}
</style>


