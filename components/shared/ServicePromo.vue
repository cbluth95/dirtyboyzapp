<template>
  <section>
    <v-container fluid>
      <v-layout>
        <v-flex xs12>
          <v-card light>
            <v-img cover :src="truckImg" max-height="800" width="100%">
              <div class="fill-height overlay-gradient-red">
                <v-container fill-height>
                  <v-layout row wrap align-center justify-center>
                    <v-flex xs12 ml-4 mr-4 mb-2>
                      <v-flex xs12 mb-2 mt-4>
                        <v-tabs
                          dark
                          height="75"
                          v-model="model"
                          centered
                          color="transparent"
                          slider-color="red"
                        >
                          <v-tab
                            style="padding: 0px"
                            v-for="(item, i) in modelItems"
                            :key="i"
                            :href="`#tab-${i}`"
                          >
                            <v-btn dark outline>{{item.tabTitle}}</v-btn>
                          </v-tab>
                        </v-tabs>
                      </v-flex>
                      <v-card color="grey lighten-2" max-height="600">
                        <v-container fill-height>
                          <v-layout row wrap align-center>
                            <v-flex xs12>
                              <v-tabs-items v-model="model">
                                <v-tab-item
                                  :transition="false"
                                  :reverse-transition="false"
                                  v-for="(item, i) in modelItems"
                                  :key="i"
                                  :value="`tab-${i}`"
                                >
                                  <v-container>
                                    <v-layout row wrap justify-center>
                                      <v-flex xs12 sm6 ma-2>
                                        <v-img
                                          max-height="400"
                                          contain
                                          :src="item.img"
                                          class="animated fadeIn"
                                        ></v-img>
                                      </v-flex>
                                      <v-flex xs12 sm4 text-xs-center ma-4>
                                        <h1 class="animated fadeInDown">{{item.tabTitle}}</h1>
                                        <v-divider></v-divider>
                                        <p class="body-2 font-weight-light">{{item.text}}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-tab-item>
                              </v-tabs-items>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-img>
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
      truckImg: require('@/assets/images/img5.jpg'),
      wasteImg: require('@/assets/images/static/services/waste.png'),
      commercialImg: require('@/assets/images/img1.png'),
      model: 'tab-0'
    }
  },
  computed: {
    modelItems() {
      const items = [
        {
          tabTitle: 'Commercial',
          img: this.commercialImg,
          text:
            'Dirty Boyz Sanitation proudly offers reliable and affordable commercial garbage collection and we work to meet our customer’s needs. Our wide assortment of receptacles ensure we have the right options to fit the unique trash removal demands of your business. Please call (307) 321-3874 and we will work with you to find the best solution to meet your needs.'
        },
        {
          tabTitle: 'Residential',
          img: this.wasteImg,
          text:
            'Dirty Boyz Sanitation is proud to provide top quality residential garbage removal & recycling services. Please call (307) 321-3874 to start residential trash service for your home.'
        }
      ]
      return items
    }
  }
}
</script>

<style>
</style>


