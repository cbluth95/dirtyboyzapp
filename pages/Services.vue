<template>
  <div class="page-wrapper">
    <div class="page-header">
      <h1 class="page-header-title">Our Services</h1>
      <p class="page-header-sub">Professional waste removal for Rawlins, WY &mdash; (307) 321-3874</p>
    </div>

    <div class="page-content">
      <section class="glass-section">
        <div class="glass-section-header">
          <span class="section-accent"></span>
          <h2>Residential Services</h2>
        </div>
        <div class="liquid-card">
          <p class="service-body">
            Dirty Boyz Sanitation Service, Inc. offers valet service as well as alley pickup. By City Ordinance,
            ALL trash must be bagged. Bags must be suitable for storage and disposal of sanitary waste, resistant
            to weakening by moisture and weather conditions, and securely tied prior to placement. We do not
            require trash rollouts to be placed curbside. We are proud to provide top quality residential garbage
            removal &amp; recycling services.
          </p>
          <v-btn color="#ffc200" href="tel:307-321-3874" round class="service-cta">
            <v-icon left color="#34221a">phone</v-icon>
            <span style="color:#34221a;font-weight:600;">Call to Start Service</span>
          </v-btn>
        </div>
      </section>

      <section class="glass-section">
        <div class="glass-section-header">
          <span class="section-accent"></span>
          <h2>Commercial Services</h2>
        </div>
        <div class="liquid-card">
          <p class="service-body">
            Dirty Boyz Sanitation proudly offers reliable and affordable commercial garbage collection. We work
            to meet each customer's unique needs. Our wide assortment of receptacles ensures we have the right
            options to fit the unique trash removal demands of your business.
          </p>
          <v-btn color="#ffc200" href="tel:307-321-3874" round class="service-cta">
            <v-icon left color="#34221a">phone</v-icon>
            <span style="color:#34221a;font-weight:600;">Get a Custom Quote</span>
          </v-btn>
        </div>
      </section>

      <section class="glass-section">
        <div class="glass-section-header">
          <span class="section-accent"></span>
          <h2>Acceptable &amp; Unacceptable Items</h2>
        </div>
        <shared-acceptable-trash />
      </section>
    </div>
  </div>
</template>

<style scoped>
.service-body {
  font-size: 1.04rem;
  line-height: 1.8;
  color: var(--text-primary);
  margin-bottom: 20px;
}
.service-cta {
  font-family: 'Baloo Bhai', cursive !important;
  font-size: 1rem !important;
  text-transform: none !important;
}
</style>
