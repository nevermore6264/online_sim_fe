<template>
  <div class="auth-container">
    <div class="auth-form">
      <div class="logo">
        <img src="/layout/images/logo.jpg" alt="Logo" class="logo-image" />
      </div>
      <h2>{{ $t("landing.login") }}</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">{{ $t("landing.username") }}</label>
          <InputText
            id="username"
            v-model="loginData.username"
            placeholder="Username"
            required
            class="auth-input"
          />
        </div>
        <div class="input-group">
          <label for="password">{{ $t("landing.password") }}</label>
          <InputText
            id="password"
            v-model="loginData.password"
            type="password"
            placeholder="Password"
            required
            class="auth-input"
          />
        </div>
        <Button
          :label="$t('landing.login')"
          type="submit"
          class="auth-submit"
          :disabled="loading"
        />
        <a href="#" class="forgot-password">{{
          $t("landing.forgot_password")
        }}</a>
        <div class="social-login">
          <p>{{ $t("landing.or_login") }}</p>
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

const handleLoginSuccess = async (response) => {
  const { credential } = response;
  console.log("Access Token:", credential);

  // Giải mã JWT để lấy thông tin người dùng (nếu cần)
  const userInfo = jwtDecode(credential);
  console.log("User Info:", userInfo);

  // Gửi token đến server bằng Axios
  try {
    const loginData = {
      token: credential,
    };

    const response = await UserService.LoginGoogle(loginData);
    const { token } = response.data;

    if (token) {
      await fetchUserInfo(token);

      localStorage.setItem("token", token);
      push.success("Login successful!");
      visibleLogin.value = false;
      window.location.reload();
    } else {
      push.error("Invalid login credentials.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    push.error("An error occurred during login.");
  }
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>

<style scoped>
/* Styles specific for LoginForm.vue */
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
