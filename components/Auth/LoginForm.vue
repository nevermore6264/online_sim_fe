<template>
  <div class="auth-container">
    <div class="auth-form">
      <h2 class="form-title">{{ $t("landing.login") }}</h2>
      <form @submit.prevent="handleLogin" class="login-form">
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
        <div class="or-divider">hoặc đăng nhập/đăng ký với</div>
        <div class="social-buttons">
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
            Google
          </button>
          <button
            class="telegram-signin-btn"
            @click.prevent="handleTelegramSignIn"
            :disabled="loading"
            type="button"
          >
            <svg
              class="telegram-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18px"
              height="18px"
            >
              <path
                fill="#ffffff"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.49.8-.75 3.12-1.36 5.2-2.26 6.24-2.7 2.98-1.24 3.6-1.45 4.01-1.45.09 0 .29.02.42.12.11.08.14.19.16.27.02.07.02.15.01.2z"
              />
            </svg>
            Telegram
          </button>
        </div>
      </form>
      <p class="switch-link">
        {{ $t("landing.noAccount") }}
        <nuxt-link to="/signup" class="signup-link">{{
          $t("landing.signup")
        }}</nuxt-link>
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

const handleTelegramSignIn = async () => {
  try {
    loading.value = true;
    const token = await UserService.LoginTelegram();

    if (token) {
      localStorage.setItem("token", token);
      push.success("Login successful!");
      window.location.href = "/";
    } else {
      push.error("Failed to sign in with Telegram.");
    }
  } catch (error) {
    console.error("Error during Telegram sign in:", error);
    push.error("An error occurred during Telegram sign in.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  margin: 1rem auto;
}

.auth-form {
  width: 100%;
  max-width: 380px;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.form-title {
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  text-align: center;
  font-weight: 600;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
}

.auth-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #2d3748;
  transition: all 0.3s ease;
  background-color: #f8fafc;
}

.auth-input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  background-color: white;
}

.password-input-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #718096;
  transition: color 0.3s ease;
  font-size: 1rem;
}

.password-toggle:hover {
  color: #2d3748;
}

.auth-submit {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.auth-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.2);
}

.auth-submit:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  transform: none;
}

.forgot-password {
  display: block;
  text-align: center;
  color: #4299e1;
  font-size: 0.9rem;
  margin: 0.75rem 0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #3182ce;
  text-decoration: underline;
}

.social-buttons {
  display: flex;
  gap: 10px;
  margin-top: 0.75rem;
}

.google-signin-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.telegram-signin-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0.75rem;
  background-color: #0088cc;
  border: 1px solid #0088cc;
  border-radius: 8px;
  font-size: 0.95rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.google-signin-btn:hover {
  background-color: #f7fafc;
  border-color: #cbd5e0;
  transform: translateY(-1px);
}

.telegram-signin-btn:hover {
  background-color: #0077b3;
  border-color: #0077b3;
  transform: translateY(-1px);
}

.google-signin-btn:disabled,
.telegram-signin-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.google-icon,
.telegram-icon {
  width: 18px;
  height: 18px;
}

.switch-link {
  text-align: center;
  margin-top: 1.25rem;
  color: #4a5568;
  font-size: 0.9rem;
}

.signup-link {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.5rem;
  transition: color 0.3s ease;
}

.signup-link:hover {
  color: #3182ce;
  text-decoration: underline;
}

.or-divider {
  text-align: center;
  color: #718096;
  font-size: 0.9rem;
  margin: 0.75rem 0;
  position: relative;
}

.or-divider::before,
.or-divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 15%;
  height: 1px;
  background-color: #e2e8f0;
}

.or-divider::before {
  left: 0;
}

.or-divider::after {
  right: 0;
}

@media (max-width: 640px) {
  .auth-form {
    padding: 1.25rem;
  }
}
</style>
