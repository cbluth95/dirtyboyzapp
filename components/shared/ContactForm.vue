
<template>
  <section>
    <v-container fluid>
      <v-layout row wrap justify-center>
        <v-flex xs12>
          <v-card light ref="form">
            <div class="headline font-weight-medium text-xs-center mt-2 mb-2">Contact Us</div>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                ref="name"
                v-model="name"
                :rules="[() => !!name || 'This field is required']"
                :error-messages="errorMessages"
                label="Full Name"
                placeholder="John Doe"
                required
              ></v-text-field>
              <v-text-field
                ref="address"
                v-model="address"
                :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
              addressCheck
            ]"
                label="Address Line"
                placeholder="Snowy Rock Pl"
                counter="25"
                required
              ></v-text-field>
              <v-text-field
                ref="city"
                v-model="city"
                :rules="[() => !!city || 'This field is required', addressCheck]"
                label="City"
                placeholder="El Paso"
                required
              ></v-text-field>
              <v-text-field
                ref="state"
                v-model="state"
                :rules="[() => !!state || 'This field is required']"
                label="State/Province/Region"
                required
                placeholder="TX"
              ></v-text-field>
              <v-text-field
                ref="zip"
                v-model="zip"
                :rules="[() => !!zip || 'This field is required']"
                label="ZIP / Postal Code"
                required
                placeholder="79938"
              ></v-text-field>
              <v-autocomplete
                ref="country"
                v-model="country"
                :rules="[() => !!country || 'This field is required']"
                :items="countries"
                label="Country"
                placeholder="Select..."
                required
              ></v-autocomplete>
            </v-card-text>
            <v-divider class="mt-5"></v-divider>
            <v-card-actions>
              <v-btn flat>Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-slide-x-reverse-transition>
                <v-tooltip v-if="formHasErrors" left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon class="my-0" @click="resetForm" v-on="on">
                      <v-icon>refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Refresh form</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
              <v-btn color="primary" flat @click="submit">Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>