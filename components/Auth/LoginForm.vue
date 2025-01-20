<template>
  <div class="auth-container">
    <div class="auth-form">
      <div class="logo">
        <img src="/layout/images/logo.png" alt="Logo" class="logo-image" />
      </div>
      <h2>{{ $t("landing.login") }}</h2>
      <form @submit.prevent="handleLogin">
        <InputText
          v-model="loginData.username"
          placeholder="Username"
          required
          class="auth-input"
        />
        <InputText
          v-model="loginData.password"
          type="password"
          placeholder="Password"
          required
          class="auth-input"
        />
        <Button
          :label="$t('landing.login')"
          type="submit"
          class="auth-submit"
          :disabled="loading"
        />
        <a href="#" class="forgot-password">Forgot password?</a>
        <div class="social-login">
          <p>Or log in with:</p>
          <GoogleSignInButton
            @success="handleLoginSuccess"
            @error="handleLoginError"
          />
        </div>
      </form>
      <p class="switch-link">
        {{ $t("landing.noAccount") }}
        <nuxt-link to="/signup">{{ $t("landing.signup") }}</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { push } from "notivue";
import UserService from "@/services/user"; // Import service
import { jwtDecode } from "jwt-decode";

const loginData = ref({ username: "", password: "" });
const loading = ref(false);

const handleLogin = async () => {
  if (!loginData.value.username || !loginData.value.password) {
    push.warning("Please fill in both fields.");
    return;
  }

  loading.value = true;
  try {
    const response = await UserService.Login(loginData.value);
    const { token } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      push.success("Login successful!");
      window.location.href = "/";
    } else {
      push.error("Invalid login credentials.");
    }
  } catch (error) {
    push.error("An error occurred during login.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Styles specific for LoginForm.vue */
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  text-align: center;
}
.auth-input {
  margin-bottom: 1rem;
}
.switch-link {
  margin-top: 1rem;
}
</style>
