<template>
  <section>
    <v-container>
      <v-layout row wrap justify-center text-xs-center>
        <v-flex xs12 mt-2>
          <p class="pTitle black--text">About</p>
          <v-divider class="black"></v-divider>
        </v-flex>
        <v-flex xs12 sm6 mt-4>
          <v-card dark>
            <v-card-text class="headline font-weight-medium">{{
              numYears
            }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import moment from 'moment'
var converter = require('number-to-words')

export default {
  data: () => {
    return {}
  },
  computed: {
    numYears() {
      var curYear = moment().format('YYYY')
      var year = curYear - 2008
      console.log(curYear)
      var nYear = converter.toWords(year)
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
      let text = `
        Dirty Boyz Sanitation Service, Inc. opened in 2008 providing quality service and competitive pricing in the face of national competition. Dirty Boyz Sanitation Service knew that a small, local company could compete successfully and offer better personal service, attention and value to its customers. ${capitalizeFirstLetter(
          nYear
        )} years later, the company has grown from one trucks and 3 employee, to 4 trucks and 9 employees. We provide solid waste removal for government, commercial, and residential customers in Rawlins Wyoming.
      `
      return text
    }
  }
}
</script>

<style></style>
