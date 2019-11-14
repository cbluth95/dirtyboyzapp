<template>
  <section>
    <v-container>
      <v-layout row wrap justify-center text-xs-center>
        <v-flex xs12 mt-2 mb-2>
          <p class="pTitle black--text">Residential Services</p>
          <v-divider class="black"></v-divider>
        </v-flex>
        <v-flex xs12 mt-2>
          <v-flex xs12 md6 style="margin-left: auto;margin-right:auto;padding:4px">
            <v-card :height="auto" color="#34221a">
              <p
                class="headline"
                style="padding:6px"
              >Dirty Boyz Sanitation is proud to provide top quality residential garbage removal services. Please call (307) 321-3874 to start residential trash service for your home.</p>
            </v-card>
          </v-flex>
        </v-flex>
        <v-flex mt-5 mb-2>
          <p class="pTitle black--text">Commercial Services</p>
          <v-divider class="black"></v-divider>
        </v-flex>
        <v-flex xs12 mt-2>
          <v-flex xs12 md6 style="margin-left: auto;margin-right:auto;padding:4px">
            <v-card height="auto" color="#34221a">
              <p
                class="headline"
                style="padding:6px"
              >Dirty Boyz Sanitation proudly offers reliable and affordable commercial garbage collection and we work to meet our customer’s needs. Our wide assortment of receptacles ensure we have the right options to fit the unique trash removal demands of your business. Please call (307) 321-3874 and we will work with you to find the best solution to meet your needs.</p>
            </v-card>
          </v-flex>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <shared-acceptable-trash />
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>