<template>
  <section class="service-panel-section">
    <div class="service-panel-inner">
      <div class="service-panel-grid">
        <div
          v-for="(item, i) in serviceList"
          :key="i"
          class="service-card"
        >
          <v-avatar size="130" color="transparent" class="animated fadeIn">
            <v-img
              contain
              :src="item.icon"
              :width="item.imgWidth"
              max-height="130"
            ></v-img>
          </v-avatar>
          <p class="service-card-title">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      recycleImg: require('@/assets/images/static/icons/recycle.png'),
      wasteImg: require('@/assets/images/static/services/waste.png'),
      bulkPickupImg: require('@/assets/images/static/services/bulkpickup.png'),
      cleanoutImg: require('@/assets/images/static/services/cleanout.png')
    }
  },
  computed: {
    serviceList() {
      return [
        { icon: this.recycleImg, title: 'Recycling Services', imgWidth: 155 },
        { icon: this.wasteImg, title: 'Waste Management', imgWidth: 267 }
      ]
    }
  }
}
</script>

<style scoped>
.service-panel-section {
  padding: 48px 16px;
  background: var(--section-alt-bg);
}

.service-panel-inner {
  max-width: 900px;
  margin: 0 auto;
}

.service-panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
</style>


<style scoped>
.service-icon {
  margin-left: auto;
  margin-right: auto;
}
</style>
