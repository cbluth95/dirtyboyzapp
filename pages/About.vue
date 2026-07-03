<template>
  <div class="page-wrapper">
    <div class="page-header">
      <h1 class="page-header-title">About Us</h1>
      <p class="page-header-sub">Serving Rawlins, Wyoming since 2008</p>
    </div>

    <div class="page-content">
      <section class="glass-section">
        <div class="glass-section-header">
          <span class="section-accent"></span>
          <h2>Our Story</h2>
        </div>
        <div class="liquid-card about-card">
          <div class="about-stat">
            <v-icon color="#ffc200" small>star</v-icon>
            In business since 2008
          </div>
          <p class="about-text">{{ numYears }}</p>
        </div>
      </section>

      <section class="glass-section">
        <div class="glass-section-header">
          <span class="section-accent"></span>
          <h2>Contact Us</h2>
        </div>
        <div class="liquid-card">
          <div class="about-contact-grid">
            <div class="about-contact-item">
              <v-icon color="#ffc200">phone</v-icon>
              <a href="tel:307-321-3874" class="about-link">(307) 321-3874</a>
            </div>
            <div class="about-contact-item">
              <v-icon color="#ffc200">place</v-icon>
              <span style="color:var(--text-primary)">816 W. Spruce St, Rawlins, WY</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
var converter = require('number-to-words')

export default {
  computed: {
    numYears() {
      var curYear = moment().format('YYYY')
      var year = curYear - 2008
      var nYear = converter.toWords(year)
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
      return `Dirty Boyz Sanitation Service, Inc. opened in 2008 providing quality service and competitive pricing in the face of national competition. ${capitalizeFirstLetter(nYear)} years later, the company has grown from one truck and 3 employees to 4 trucks and 9 employees. We provide solid waste removal for government, commercial, and residential customers in Rawlins, Wyoming.`
    }
  }
}
</script>

<style scoped>
.about-text {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--text-primary);
  margin: 0;
}

.about-contact-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.about-contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.05rem;
}

.about-link {
  color: var(--brand-gold);
  text-decoration: none;
  font-weight: 600;
}

.about-link:hover {
  text-decoration: underline;
}
</style>

