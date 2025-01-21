<template>
  <div class="fraud-warning">
    <p>
      {{ $t("landing.berrors_top_yellow") }}
    </p>
  </div>
</template>

<script>
export default {
  name: "FraudWarning",
};
</script>

<style scoped>
.fraud-warning {
  background-color: #ffefcc;
  color: black;
  width: 100%;
  height: max-content;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  min-height: 70px;
  line-height: 70px;
  text-align: center;
}

.fraud-warning p {
  line-height: 1.5;
  display: inline-block;
  vertical-align: middle;
}
</style>
