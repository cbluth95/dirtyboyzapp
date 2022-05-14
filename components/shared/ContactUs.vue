<template>
  <section id="contact">
    <v-container fluid>
      <v-layout>
        <v-flex xs12>
          <v-card color="grey lighten-2">
            <v-container fill-height>
              <v-layout row wrap align-center justify-center>
                <v-flex xs12 sm6 pa-2>
                  <shared-contact-form />
                </v-flex>

                <v-flex xs12 sm6 pa-2>
                  <v-card light>
                    <div class="pTitle text-xs-center mt-2 mb-2">About Us</div>
                    <v-divider></v-divider>
                    <v-container fill-height>
                      <v-layout align-center>
                        <v-flex xs12 pa-2 text-xs-center>
                          <div class="subheading font-weight-light">
                            {{ compText }}
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                  <v-card light>
                    <div class="pTitle text-xs-center mt-2 mb-2">Location</div>
                    <v-divider></v-divider>
                    <v-container fill-height>
                      <v-layout align-center>
                        <v-flex xs12 pa-2 text-xs-center>
                          <div class="subheading font-weight-light">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.8090419289397!2d-107.24776828425085!3d41.78932887894307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x875d017fa8d26015%3A0x556511f79a11a03b!2sDirty%20Boyz%20Sanitation%20Service!5e0!3m2!1sen!2sus!4v1652492709468!5m2!1sen!2sus"
                              width="100%"
                              height="400"
                              style="border:0;max-width: 800px;"
                              allowfullscreen=""
                              loading="lazy"
                              referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
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
import moment from 'moment'
var converter = require('number-to-words')

export default {
  data: () => {
    return {}
  },
  computed: {
    compText() {
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
