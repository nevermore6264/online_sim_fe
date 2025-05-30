<template>
  <div class="invite-container">
    <div class="invite-card">
      <i class="pi pi-user-plus invite-icon"></i>
      <h1 class="invite-title">{{ $t("referral.welcome") }}</h1>
      <p class="invite-message">{{ $t("referral.inviteMessage") }}</p>
      <Button
        :label="$t('landing.signup')"
        @click="() => $router.push('/signup')"
        class="invite-btn"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  const referralCode = route.params.code;
  if (referralCode) {
    localStorage.setItem("referralCode", referralCode);
  }
});
</script>

<style scoped>
.invite-container {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
}
.invite-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  padding: 48px 32px;
  text-align: center;
  max-width: 420px;
  width: 100%;
}
.invite-icon {
  font-size: 3rem;
  color: #ffc107;
  margin-bottom: 16px;
}
.invite-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: #222;
}
.invite-message {
  color: #666;
  margin-bottom: 32px;
}
.invite-btn {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s;
}
.invite-btn:hover {
  background: linear-gradient(135deg, #ff9800, #ffc107);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
</style>
