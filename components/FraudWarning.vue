<template>
  <div class="fraud-warning">
    <p>
      There are fraudulent sites that copy our design. Check the site domain
      when you visit the site. Our domain is <strong>Verifysms.com</strong>. Be
      careful and do not trust fraudulent sites. We are not responsible for the
      actions of these fraudulent sites.
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
