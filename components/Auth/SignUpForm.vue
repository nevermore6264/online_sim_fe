<template>
  <div class="auth-container">
    <div class="auth-form">
      <div class="logo">
        <img src="/layout/images/logo.png" alt="Logo" class="logo-image" />
      </div>
      <h2>{{ $t("landing.signup") }}</h2>
      <form @submit.prevent="handleSignUp">
        <div class="input-group">
          <label for="firstName">{{ $t("landing.firstName") }}</label>
          <InputText
            id="firstName"
            v-model="signUpData.firstName"
            :placeholder="$t('landing.firstName')"
            required
            class="auth-input"
          />
        </div>
        <div class="input-group">
          <label for="lastName">{{ $t("landing.lastName") }}</label>
          <InputText
            id="lastName"
            v-model="signUpData.lastName"
            :placeholder="$t('landing.lastName')"
            required
            class="auth-input"
          />
        </div>
        <div class="input-group">
          <label for="username">{{ $t("landing.username") }}</label>
          <InputText
            id="username"
            v-model="signUpData.username"
            :placeholder="$t('landing.username')"
            required
            class="auth-input"
          />
        </div>
        <div class="input-group">
          <label for="password">{{ $t("landing.password") }}</label>
          <InputText
            id="password"
            v-model="signUpData.password"
            type="password"
            :placeholder="$t('landing.password')"
            required
            class="auth-input"
          />
        </div>
        <div class="input-group">
          <label for="confirmPassword">{{
            $t("landing.confirmPassword")
          }}</label>
          <InputText
            id="confirmPassword"
            v-model="signUpData.confirmPassword"
            type="password"
            :placeholder="$t('landing.confirmPassword')"
            required
            class="auth-input"
          />
        </div>
        <Button
          :label="$t('landing.signup')"
          type="submit"
          class="auth-submit"
          :disabled="loading"
        />
      </form>
      <p class="switch-link">
        {{ $t("landing.alreadyAccount") }}
        <nuxt-link to="/login">{{ $t("landing.login") }}</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { push } from "notivue";
import UserService from "@/services/user";

const signUpData = ref({
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
});
const loading = ref(false);

const handleSignUp = async () => {
  const { firstName, lastName, username, password, confirmPassword } =
    signUpData.value;

  if (!firstName || !lastName || !username || !password || !confirmPassword) {
    push.warning("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    push.warning("Passwords do not match.");
    return;
  }

  loading.value = true;
  try {
    const response = await UserService.CreateUser(signUpData.value);
    if (response.success) {
      push.success("Registration successful! Please log in.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      push.error("Registration failed.");
    }
  } catch (error) {
    push.error("An error occurred during registration.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Styles specific for SignUpForm.vue */
.auth-container {
  width: 70%;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background: rgb(255, 255, 255);
  border-radius: 15px;
  box-shadow: 0 0 8px rgb(227, 227, 227);
}
.auth-input {
  margin-bottom: 1rem;
}
.switch-link {
  margin-top: 1rem;
}

.input-group {
  text-align: left;
}

.input-group label {
  display: block;
}

.auth-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
