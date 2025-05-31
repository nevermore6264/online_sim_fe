<template>
  <section class="features-block">
    <h2 class="features-title">{{ $t("landing.features_title") }}</h2>
    <p class="features-description">
      {{ $t("landing.features_description") }}
    </p>
    <div class="cards-grid">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="feature-card"
      >
        <div class="feature-icon">
          <i :class="`pi ${feature.icon}`"></i>
        </div>
        <h3 class="feature-header">
          {{ $t(`landing.features[${index}].header`) }}
        </h3>
        <p class="feature-body">
          {{ $t(`landing.features[${index}].body`) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { icon: "pi-verified" },
  { icon: "pi-flag-fill" },
  { icon: "pi-clock" },
  { icon: "pi-shield" },
  { icon: "pi-whatsapp" },
  { icon: "pi-qrcode" },
];
</script>

<style scoped>
.features-block {
  max-width: 1200px;
}

.features-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.features-description {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  margin-bottom: 1.5rem;
}

.feature-icon i {
  color: #00aeff;
  font-size: 2.5rem;
}

.feature-header {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.feature-body {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

@media (max-width: 768px) {
  .features-block {
    padding: 2rem 1rem;
  }

  .features-title {
    font-size: 2rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
