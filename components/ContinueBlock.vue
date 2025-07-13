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
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  padding: 14px 15px 15px 15px;
  padding-inline: 25px;
  border-radius: 15px;
  margin-top: 10px;
  background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
  border: none;
  color: white;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.18);
  position: relative;
  overflow: hidden;
}

.try_it_out:hover {
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 60%, #60a5fa 100%);
  transform: translateY(-1px) scale(1.03);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.28);
}
</style>
