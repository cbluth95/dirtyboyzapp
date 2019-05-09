<template>
  <section>
    <v-container fluid>
      <v-layout>
        <v-flex xs12>
          <v-card light>
            <v-img cover :src="truckImg" max-height="700" width="100%">
              <div class="fill-height overlay-gradient-red">
                <v-container fill-height>
                  <v-layout row wrap align-center justify-center>
                    <v-flex xs12 mt-4>
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

                    <v-flex xs12 ml-4 mr-4 mb-2>
                      <v-card color="grey lighten-2">
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
                                      <v-flex xs12 sm3>
                                        <v-img
                                          height="400"
                                          contain
                                          :src="item.img"
                                          class="animated fadeIn"
                                        ></v-img>
                                      </v-flex>
                                      <v-flex xs12 sm3 text-xs-center mt-5>
                                        <h1 class="animated fadeInDown">{{item.tabTitle}}</h1>
                                        <v-divider></v-divider>
                                        <p class="body-2 font-weight-light">{{item.text}}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>

                                  <!-- <v-card flat>
                                    <v-card-text v-text="item.text"></v-card-text>
                                  </v-card>-->
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
            <!-- TODO fix style here -->
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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Feugiat pretium nibh ipsum consequat nisl vel pretium. Viverra ipsum nunc aliquet bibendum enim. Vitae congue eu consequat ac felis donec et odio pellentesque.'
        },
        {
          tabTitle: 'Residential',
          img: this.wasteImg,
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Feugiat pretium nibh ipsum consequat nisl vel pretium. Viverra ipsum nunc aliquet bibendum enim. Vitae congue eu consequat ac felis donec et odio pellentesque.'
        }
      ]
      return items
    }
  }
}
</script>

<style>
</style>


