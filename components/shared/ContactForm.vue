<template>
  <div class="cform">
    <!-- Title bar -->
    <div class="cform-title contact-form-title">
      Contact Us
    </div>

    <!-- Fields -->
    <div class="cform-body">
      <v-text-field
        ref="name"
        v-model="name"
        :rules="[() => !!name || 'This field is required']"
        :error-messages="errorMessages"
        label="Full Name"
        placeholder="John Doe"
        solo
        hide-details
        class="cform-field"
        required
      ></v-text-field>

      <v-text-field
        ref="mail"
        v-model="mail"
        :rules="[() => !!mail || 'This field is required']"
        :error-messages="errorMessages"
        label="Email"
        placeholder="JohnDoe@email.com"
        solo
        hide-details
        class="cform-field"
        required
      ></v-text-field>

      <v-text-field
        ref="phone"
        v-model="phone"
        :rules="[() => !!phone || 'This field is required']"
        :error-messages="errorMessages"
        label="Phone"
        placeholder="(111) 222-3333"
        solo
        hide-details
        class="cform-field"
        required
      ></v-text-field>

      <v-layout row wrap class="cform-row">
        <v-flex xs8 class="pr-2">
          <v-text-field
            ref="address"
            v-model="address"
            :rules="[
              () => !!address || 'This field is required',
              () => (!!address && address.length <= 25) || 'Max 25 characters',
              addressCheck
            ]"
            label="Address Line"
            placeholder="123 Apple Ave"
            solo
            hide-details
            class="cform-field"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            ref="city"
            v-model="city"
            :rules="[() => !!city || 'This field is required', addressCheck]"
            label="City"
            placeholder="Rawlins"
            solo
            hide-details
            class="cform-field"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap class="cform-row">
        <v-flex xs3 class="pr-2">
          <v-text-field
            ref="state"
            v-model="state"
            :rules="[() => !!state || 'This field is required']"
            label="State"
            placeholder="WY"
            solo
            hide-details
            class="cform-field"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs9>
          <v-text-field
            ref="zip"
            v-model="zip"
            :rules="[() => !!zip || 'This field is required']"
            label="ZIP / Postal Code"
            placeholder="82301"
            solo
            hide-details
            class="cform-field"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-textarea
        ref="msg"
        v-model="msg"
        name="message"
        label="Message"
        id="msg"
        :counter="150"
        :rules="msgRules"
        :rows="4"
        auto-grow
        solo
        class="cform-field"
        required
      ></v-textarea>
    </div>

    <!-- Actions -->
    <div class="cform-actions">
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
      <v-spacer></v-spacer>
      <v-btn
        color="#ffc200"
        class="cform-submit"
        :loading="loading"
        @click="submit"
      >
        <v-icon left color="#34221a">send</v-icon>
        <span style="color:#34221a;font-weight:700;">Send Message</span>
      </v-btn>
    </div>

    <!-- Snackbar -->
    <v-snackbar
      v-model="alert"
      :color="sColor === 'success' ? '#4caf50' : '#f44336'"
      absolute
      :bottom="true"
      :multi-line="true"
      :timeout="5000"
    >
      {{ sText }}
      <v-btn color="white" flat @click="alert = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    errorMessages: '',
    loading: false,
    alert: false,
    sText: 'Your message has been sent.',
    sColor: 'success',
    name: '',
    mail: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    msg: '',
    formHasErrors: false,
    msgRules: [
      v => !!v || 'A message is required',
      v => (v && v.length <= 150) || 'Message must be less than 150 characters'
    ]
  }),

  computed: {
    form() {
      return {
        name: this.name,
        mail: this.mail,
        phone: this.phone,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        msg: this.msg
      }
    }
  },

  watch: {
    name() {
      this.errorMessages = ''
    }
  },

  methods: {
    addressCheck() {
      this.errorMessages = this.address && !this.name ? "Hey! I'm required" : ''

      return true
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })

      if (this.formHasErrors) {
        console.log('Debug: form has ERRORS')
        this.sText = 'Please fill out all required fields'
        this.sColor = 'error'
        this.alert = true
      } else {
        this.loading = true
        const email = {
          name: this.name,
          mail: this.mail,
          phone: this.phone,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          msg: this.msg
        }
        
        // Use relative path for API call (works in dev and prod)
        this.$axios
          .post('/api/email/send', email)
          .then(res => {
            this.sText = res.data.message || 'Your message has been sent successfully!'
            this.sColor = 'success'
            this.alert = true
            this.resetForm()
            this.loading = false
          })
          .catch(err => {
            console.error('Email send error:', err)
            
            // Handle different error scenarios
            if (err.response) {
              // Server responded with error
              this.sText = err.response.data.error || 'Failed to send message. Please try again.'
              
              if (err.response.status === 503) {
                this.sText = 'Email service is temporarily unavailable. Please try again later.'
              }
            } else if (err.request) {
              // Request made but no response
              this.sText = 'Unable to connect to server. Please check your connection.'
            } else {
              // Something else happened
              this.sText = 'An error occurred. Please try again.'
            }
            
            this.sColor = 'error'
            this.alert = true
            this.loading = false
          })
      }
    }
  }
}
</script>

<style scoped>
.cform {
  display: flex;
  flex-direction: column;
}

.cform-title {
  font-family: 'Baloo Bhai', cursive;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  padding: 20px 24px 18px;
  letter-spacing: 0.5px;
  border-radius: 20px 20px 0 0;
}

.cform-body {
  padding: 24px 28px 8px;
}

.cform-row {
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  margin-bottom: 14px;
}

.cform-row .v-flex {
  min-width: 0;
  padding: 0;
}

.cform-field {
  margin-bottom: 14px;
}

.cform-row .cform-field {
  margin-bottom: 0;
}

/* Solo input overrides — more padding, rounder corners */
.cform-field .v-input__slot {
  padding: 0 20px !important;
  min-height: 56px !important;
  border-radius: 10px !important;
}

.cform-field .v-label {
  padding-left: 4px;
}

.cform-actions {
  display: flex;
  align-items: center;
  padding: 12px 28px 24px;
}

.cform-submit {
  font-family: 'Baloo Bhai', cursive !important;
  font-size: 1rem !important;
  text-transform: none !important;
  border-radius: 24px !important;
  padding: 0 28px !important;
  height: 46px !important;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 16px rgba(255,194,0,0.35) !important;
}

.cform-submit:hover {
  box-shadow: 0 6px 24px rgba(255,194,0,0.5) !important;
}
</style>
