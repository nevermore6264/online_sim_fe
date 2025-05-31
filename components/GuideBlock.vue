<template>
  <div class="guide-block">
    <h2>{{ $t("landing.guide_title") }}</h2>
    <p class="guide-description">
      {{ $t("landing.guide_description") }}
    </p>
    <div class="cards">
      <div class="guide-card" v-for="(step, index) in steps" :key="index">
        <div class="guide-card-body">
          <h3>{{ $t(`landing.steps[${index}].title`) }}</h3>
          <p>
            <b>{{ $t(`landing.steps[${index}].action1`) }}</b>
          </p>
          <p>
            <b>{{ $t(`landing.steps[${index}].action2`) }}</b>
          </p>
        </div>
        <div class="image">
          <img
            :src="step.image"
            :alt="$t(`landing.steps[${index}].title`)"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  { image: "/layout/images/guide1.svg" },
  { image: "/layout/images/guide2.svg" },
  { image: "/layout/images/guide3.svg" },
];
</script>

<style scoped>
.guide-block {
  margin: 2rem auto;
  width: 95%;
}

.guide-description {
  margin-left: 2px;
  margin-top: 5px;
  color: rgb(56, 56, 56);
  font-size: 16px;
  line-height: 1.5;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;
}

.guide-card {
  flex: 1 1 calc(33.333% - 20px);
  min-width: 280px;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 8px rgb(227, 227, 227);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.guide-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.guide-card-body {
  flex: 1;
  min-height: 175px;
}

.guide-card-body h3 {
  margin-top: 10px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: rgb(56, 56, 56);
}

.guide-card-body p {
  font-style: normal;
  font-size: 14px;
  line-height: 17px;
  color: rgb(56, 56, 56);
  opacity: 0.6;
  margin: 8px 0;
}

.image {
  text-align: right;
  margin-top: 15px;
}

.image img {
  max-width: 100px;
  height: auto;
  transition: transform 0.3s ease;
}

.image img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .guide-card {
    flex: 1 1 100%;
  }

  .guide-card-body {
    min-height: auto;
  }

  .guide-description {
    font-size: 14px;
  }
}
</style>
