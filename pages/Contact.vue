<template>
  <div class="page-wrapper">
    <div class="page-header">
      <h1 class="page-header-title">Contact Us</h1>
      <p class="page-header-sub">Get your free estimate &mdash; (307) 321-3874</p>
    </div>

    <div class="page-content">
      <section class="glass-section">
        <div class="glass-section-header">
          <span class="section-accent"></span>
          <h2>Send Us a Message</h2>
        </div>
        <v-layout row wrap style="gap: 20px 0;">
          <v-flex xs12 md7>
            <div class="liquid-card contact-form-outer">
              <shared-contact-form />
            </div>
          </v-flex>
          <v-flex xs12 md4 offset-md1>
            <div class="liquid-card contact-info-card">
              <div class="contact-info-block">
                <v-icon color="#ffc200" size="28" class="mb-2">phone</v-icon>
                <div class="contact-info-label">Phone</div>
                <a href="tel:307-321-3874" class="contact-info-value">(307) 321-3874</a>
              </div>
              <v-divider style="margin:24px 0;border-color:var(--glass-border)!important"></v-divider>
              <div class="contact-info-block">
                <v-icon color="#ffc200" size="28" class="mb-2">place</v-icon>
                <div class="contact-info-label">Location</div>
                <div class="contact-info-value">816 W. Spruce St<br>Rawlins, WY 82301</div>
              </div>
              <v-divider style="margin:24px 0;border-color:var(--glass-border)!important"></v-divider>
              <div class="contact-info-block">
                <v-icon color="#ffc200" size="28" class="mb-2">schedule</v-icon>
                <div class="contact-info-label">Hours</div>
                <div class="contact-info-value">Mon–Fri: 7am–5pm<br>Weekends: On Call</div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </section>

      <!-- Map -->
      <section class="glass-section">
        <div class="glass-section-header">
          <span class="section-accent"></span>
          <h2>Find Us</h2>
        </div>
        <div class="liquid-card" style="padding:0;overflow:hidden;border-radius:20px;">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.8090419289397!2d-107.24776828425085!3d41.78932887894307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x875d017fa8d26015%3A0x556511f79a11a03b!2sDirty%20Boyz%20Sanitation%20Service!5e0!3m2!1sen!2sus!4v1652492709468!5m2!1sen!2sus"
            width="100%"
            height="380"
            style="border:0;display:block;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.contact-form-outer {
  padding: 0;
  overflow: hidden;
}

.contact-info-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 28px;
  height: 100%;
}

.contact-info-block {
  text-align: center;
}

.contact-info-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--brand-gold);
  font-weight: 700;
  margin-bottom: 6px;
  margin-top: 6px;
}

.contact-info-value {
  font-size: 1.05rem;
  color: var(--text-primary);
  font-weight: 500;
  text-decoration: none;
  line-height: 1.7;
  display: block;
}

a.contact-info-value:hover {
  color: var(--brand-gold);
}

@media (max-width: 959px) {
  .contact-info-card {
    margin-top: 20px;
    height: auto;
  }
}
</style>
