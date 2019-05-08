<template>
  <section id="news">
    <v-container fluid>
      <v-layout>
        <v-flex xs12 class="container jagged-bottom">
          <v-card class="jagged" min-height="600" elevation="0" color="grey lighten-2">
            <v-container>
              <v-layout row wrap justify-center>
                <v-flex xs12 mt-5 text-xs-center>
                  <p style="color: #009465;" class="display-2 font-weight-medium">News & Updates</p>
                </v-flex>
                <v-flex xs12>
                  <v-divider light></v-divider>
                </v-flex>
                <v-flex xs12 mt-4 mr-4 ml-4>
                  <v-container fill-height>
                    <v-layout row wrap align-center>
                      <v-flex xs12 sm4 pa-2>
                        <v-card height="300"></v-card>
                      </v-flex>
                      <v-flex xs12 sm4 pa-2>
                        <v-card height="300"></v-card>
                      </v-flex>
                      <v-flex xs12 sm4 pa-2>
                        <v-card height="300"></v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<style>
.jagged-bottom {
  position: relative;
}
.jagged-bottom:after {
  background: #e0e0e0;
  content: '';
  z-index: 2;
  /* temp fix for weird line  */
  margin-top: -2px;
  height: 30px;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  clip-path: polygon(
    0 0,
    2.5% 100%,
    5% 0,
    7.5% 100%,
    10% 0,
    12.5% 100%,
    15% 0,
    17.5% 100%,
    20% 0,
    22.5% 100%,
    25% 0,
    27.5% 100%,
    30% 0,
    32.5% 100%,
    35% 0,
    37.5% 100%,
    40% 0,
    42.5% 100%,
    45% 0,
    47.5% 100%,
    50% 0,
    52.5% 100%,
    55% 0,
    57.5% 100%,
    60% 0,
    62.5% 100%,
    65% 0,
    67.5% 100%,
    70% 0,
    72.5% 100%,
    75% 0,
    77.5% 100%,
    80% 0,
    82.5% 100%,
    85% 0,
    87.5% 100%,
    90% 0,
    92.5% 100%,
    95% 0,
    97.5% 100%,
    100% 0
  );
}
</style>

