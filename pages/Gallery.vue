<template>
  <section>
    <v-container>
      <v-layout row wrap justify-center text-xs-center>
        <v-flex xs12 mt-2>
          <p class="pTitle black--text">Gallery</p>
          <v-divider class="black"></v-divider>
        </v-flex>
        <!-- <v-flex xs12 mt-4 mb-4>
          <v-card>
            <v-container grid-list-sm fluid>
              <v-layout row wrap>
                <v-flex v-for="n in 9" :key="n" xs4 d-flex>
                  <v-card flat tile class="d-flex">
                    <v-img
                      :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                      :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    >
                      <template v-slot:placeholder>
                        <v-layout fill-height align-center justify-center ma-0>
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                      </template>
                    </v-img>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>-->
      </v-layout>
    </v-container>
  </section>
</template>
