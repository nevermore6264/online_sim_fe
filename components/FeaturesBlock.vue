<template>
  <div class="features-block">
    <h2>{{ $t("landing.features_title") }}</h2>
    <span style="margin-left: 2px; margin-top: 5px">
      {{ $t("landing.features_description") }}
    </span>
    <div class="cards-block w-100">
      <div class="card" v-for="(feature, index) in features" :key="index">
        <div class="image">
          <i :class="`pi ${feature.icon}`"></i>
        </div>
        <div class="card-header">
          {{ $t(`landing.features[${index}].header`) }}
        </div>
        <div class="card-body">{{ $t(`landing.features[${index}].body`) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        { icon: "pi-verified" },
        { icon: "pi-flag-fill" },
        { icon: "pi-clock" },
        { icon: "pi-shield" },
        { icon: "pi-whatsapp" },
        { icon: "pi-qrcode" },
      ],
    };
  },
};
</script>

<style scoped>
.features-block {
  margin: 0 auto;
  width: 95%;
}

.cards-block {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 calc(50% - 20px);
  padding: 20px 20px 30px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 15px;
  margin-bottom: 10px;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 8px rgb(227, 227, 227);
  margin-right: 20px;
  margin-top: 10px;
}

@media (max-width: 480px) {
  .card {
    margin-right: 0px !important;
  }
}

.card i {
  color: rgb(0, 174, 255);
  font-size: 2rem;
}

.card-header {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  padding: 0 10px 0 10px;
  color: rgb(56, 56, 56);
}

.card-body {
  padding: 0 10px 0 10px;
  margin-top: 20px;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  color: rgb(56, 56, 56);
}

.card .image {
  margin-bottom: 30px;
  margin-left: 10px;
}
</style>
