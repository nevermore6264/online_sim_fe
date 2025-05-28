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
          <div class="password-input-container">
            <InputText
              id="password"
              v-model="loginData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              required
              class="auth-input"
            />
            <i
              :class="[
                'password-toggle',
                showPassword ? 'pi pi-eye-slash' : 'pi pi-eye',
              ]"
              @click="showPassword = !showPassword"
            ></i>
          </div>
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
          <button
            class="google-signin-btn"
            @click.prevent="handleGoogleSignIn"
            :disabled="loading"
            type="button"
          >
            <svg
              class="google-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="18px"
              height="18px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Sign in with Google
          </button>
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
const showPassword = ref(false);

const handleLogin = async () => {
  if (!loginData.value.username || !loginData.value.password) {
    push.warning("Please fill in both fields.");
    return;
  }

  // Hardcode login for admin
  if (
    loginData.value.username === "admin" &&
    loginData.value.password === "admin"
  ) {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjkzMjMyMDYwNSwiaWF0IjoxNzQxMDgzMjk4fQ.HUF0TnWfCjv2L_xoeE3rBC0ucG6pmu-qlK03wLfuw4w"
    );
    push.success("Admin login successful!");
    window.location.href = "/admin/news";
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

const handleGoogleSignIn = async () => {
  try {
    loading.value = true;
    const token = await UserService.LoginGoogle();

    if (token) {
      localStorage.setItem("token", token);
      push.success("Login successful!");
      window.location.href = "/";
    } else {
      push.error("Failed to sign in with Google.");
    }
  } catch (error) {
    console.error("Error during Google sign in:", error);
    push.error("An error occurred during Google sign in.");
  } finally {
    loading.value = false;
  }
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

.password-input-container {
  position: relative;
  width: 100%;
}

.password-input-container .auth-input {
  padding-right: 2.5rem;
  /* Chừa chỗ cho icon */
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 35%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
  z-index: 2;
}

.password-toggle:hover {
  color: #333;
}

.google-signin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #757575;
  transition: background-color 0.3s ease;
}

.google-signin-btn:hover {
  background-color: #f5f5f5;
}

.google-signin-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.google-icon {
  width: 18px;
  height: 18px;
}
</style>
