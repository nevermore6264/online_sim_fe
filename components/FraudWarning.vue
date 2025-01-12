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
  padding: 5px 20px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}
</style>
