<template>
  <div class="continue-block">
    <h2 class="signup-block-info">
      {{ $t("landing.signup_info_heading") }}
    </h2>
    <p class="signup-block-info">
      {{ $t("landing.signup_info_paragraph") }}
    </p>
    <Button class="try_it_out noselect" @click="() => $router.push('/signup')">
      {{ $t("landing.signup") }}
      <i
        class="pi pi-arrow-right"
        style="font-size: 0.75rem; margin-left: 10px"
      ></i>
    </Button>
  </div>
</template>

<script setup></script>

<style scoped>
.continue-block {
  border-radius: 5px;
  margin: 2rem auto;
  width: 95%;
}

.try_it_out {
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  padding: 14px 15px 15px 15px;
  padding-inline: 25px;
  border-radius: 15px;
  margin-top: 10px;
  background-color: #2aabee;
  border: none;
}

.try_it_out:hover {
  background-color: #3b82f6;
}
</style>
