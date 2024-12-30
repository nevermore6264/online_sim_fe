<template>
  <div class="tips_block ml-40-d">
    <nuxt-link to="/referral-program">
      <img
        src="/layout/images/Referal_program.jpg"
        alt="Referral program"
        width="884"
        loading="lazy"
      />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "TipsBlock",
};
</script>

<style scoped>
.tips_block img {
  width: 100%;
  border-radius: 15px;
}

.tips_block {
  margin: 0 auto;
  width: 95%;
}
</style>
