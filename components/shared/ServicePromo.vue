<template>
  <section>
    <v-container fluid>
      <v-layout>
        <v-flex xs12>
          <v-card light height="600">
            <v-img contain :src="wasteImg" height="600">
              <div class="fill-height overlay-gradient">
                <v-container fill-height>
                  <v-layout row wrap align-center justify-center>
                    <v-flex xs4 mt-2>
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

                        <!-- <v-tab
                          v-for="(item, i) in modelItems"
                          :key="i"
                          :href="`#tab-${i}`"
                        >{{item.tabTitle}}</v-tab>-->
                      </v-tabs>
                    </v-flex>
                    <v-flex xs12>
                      <v-card dark height="300">
                        <v-container>
                          <v-layout row wrap>
                            <v-flex xs12>
                              <v-tabs-items v-model="model">
                                <v-tab-item
                                  :transition="false"
                                  :reverse-transition="false"
                                  v-for="(item, i) in modelItems"
                                  :key="i"
                                  :value="`tab-${i}`"
                                >
                                  <v-card flat>
                                    <v-card-text v-text="item.text"></v-card-text>
                                  </v-card>
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
      wasteImg: require('@/assets/images/static/services/waste.png'),
      model: 'tab-0'
    }
  },
  computed: {
    modelItems() {
      const items = [
        {
          tabTitle: 'Commercial',
          text: 'thissiifdjnsidnafnsdfkjnasdkjfnaskdl'
        },
        {
          tabTitle: 'Residential',
          text: 'pieekfsknaklfnd;lafdssdafasd,md,s sa;ds;afj;dsamf'
        }
      ]
      return items
    }
  }
}
</script>

