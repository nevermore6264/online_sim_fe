<template>
  <div class="auth-container">
    <div class="auth-form">
      <h2 class="form-title">{{ $t("landing.signup") }}</h2>
      <form @submit.prevent="handleSignUp" class="signup-form">
        <div class="form-row">
          <div class="input-group">
            <label for="firstName">{{ $t("landing.firstName") }}</label>
            <InputText
              id="firstName"
              v-model="signupData.firstName"
              placeholder="First Name"
              required
              class="auth-input"
            />
          </div>
          <div class="input-group">
            <label for="lastName">{{ $t("landing.lastName") }}</label>
            <InputText
              id="lastName"
              v-model="signupData.lastName"
              placeholder="Last Name"
              required
              class="auth-input"
            />
          </div>
        </div>
        <div class="input-group">
          <label for="username">{{ $t("landing.username") }}</label>
          <InputText
            id="username"
            v-model="signupData.username"
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
              v-model="signupData.password"
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
        <div class="input-group">
          <label for="confirmPassword">{{
            $t("landing.confirmPassword")
          }}</label>
          <div class="password-input-container">
            <InputText
              id="confirmPassword"
              v-model="signupData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm Password"
              required
              class="auth-input"
            />
            <i
              :class="[
                'password-toggle',
                showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye',
              ]"
              @click="showConfirmPassword = !showConfirmPassword"
            ></i>
          </div>
        </div>
        <div class="input-group">
          <label for="referralCode">{{ $t("landing.referralCode") }}</label>
          <InputText
            id="referralCode"
            v-model="signupData.referralCode"
            placeholder="Referral Code (Optional)"
            class="auth-input"
          />
        </div>
        <div class="input-group">
          <label for="captcha">{{ $t("landing.security.captcha") }}</label>
          <div class="captcha-container">
            <div class="captcha-code">{{ captchaCode }}</div>
            <InputText
              id="captcha"
              v-model="signupData.captcha"
              :placeholder="$t('landing.security.enterCaptcha')"
              class="auth-input"
              required
            />
            <button
              type="button"
              class="refresh-captcha"
              @click="generateCaptcha"
            >
              <i class="pi pi-refresh"></i>
            </button>
          </div>
        </div>
        <Button
          :label="$t('landing.signup')"
          type="submit"
          class="auth-submit"
          :disabled="loading || !isCaptchaValid || isRateLimited"
        />
        <div v-if="isRateLimited" class="rate-limit-message">
          {{ $t("landing.security.waitTime", { time: remainingTime }) }}
        </div>
      </form>
      <p class="switch-link">
        {{ $t("landing.haveAccount") }}
        <nuxt-link to="/login" class="login-link">{{
          $t("landing.login")
        }}</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { push } from "notivue";
import UserService from "@/services/user";

const signupData = ref({
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
  referralCode: "",
  captcha: "",
});

const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const captchaCode = ref("");
const lastAttemptTime = ref(0);
const attemptCount = ref(0);
const RATE_LIMIT_WINDOW = 300000; // 5 minutes in milliseconds
const MAX_ATTEMPTS = 5;
const COOLDOWN_TIME = 60; // 60 seconds cooldown

const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  captchaCode.value = code;
};

// Generate initial captcha
generateCaptcha();

const isCaptchaValid = computed(() => {
  return signupData.value.captcha.toUpperCase() === captchaCode.value;
});

const isRateLimited = computed(() => {
  const now = Date.now();
  const timeSinceLastAttempt = now - lastAttemptTime.value;

  if (timeSinceLastAttempt > RATE_LIMIT_WINDOW) {
    attemptCount.value = 0;
    return false;
  }

  return attemptCount.value >= MAX_ATTEMPTS;
});

const remainingTime = computed(() => {
  const now = Date.now();
  const timeSinceLastAttempt = now - lastAttemptTime.value;
  const remaining = Math.ceil(
    (RATE_LIMIT_WINDOW - timeSinceLastAttempt) / 1000
  );
  return remaining > 0 ? remaining : 0;
});

const handleSignUp = async () => {
  const { firstName, lastName, username, password, confirmPassword } =
    signupData.value;

  if (!firstName || !lastName || !username || !password || !confirmPassword) {
    push.warning("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    push.warning("Passwords do not match.");
    return;
  }

  if (!isCaptchaValid.value) {
    push.warning($t("landing.security.invalidCaptcha"));
    generateCaptcha();
    return;
  }

  if (isRateLimited.value) {
    push.warning(
      $t("landing.security.rateLimit", { time: remainingTime.value })
    );
    return;
  }

  // Update rate limiting
  const now = Date.now();
  if (now - lastAttemptTime.value > RATE_LIMIT_WINDOW) {
    attemptCount.value = 0;
  }
  attemptCount.value++;
  lastAttemptTime.value = now;

  // Get referral code from localStorage if exists
  const storedReferralCode = localStorage.getItem("referralCode");
  if (storedReferralCode) {
    signupData.value.referralCode = storedReferralCode;
  }

  loading.value = true;
  try {
    // Add artificial delay to prevent rapid requests
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await UserService.CreateUser({
      ...signupData.value,
    });
    if (response.success) {
      // Clear referral code from localStorage after successful registration
      localStorage.removeItem("referralCode");
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
    generateCaptcha();
    signupData.value.captcha = "";
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
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

.switch-link {
  text-align: center;
  margin-top: 1.25rem;
  color: #4a5568;
  font-size: 0.9rem;
}

.login-link {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
  margin-left: 0.5rem;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #3182ce;
  text-decoration: underline;
}

@media (max-width: 640px) {
  .auth-form {
    padding: 1.25rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

.recaptcha-container {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
}

.captcha-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.captcha-code {
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1.2rem;
  letter-spacing: 2px;
  user-select: none;
  min-width: 100px;
  text-align: center;
}

.refresh-captcha {
  background: none;
  border: none;
  color: #4299e1;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.refresh-captcha:hover {
  color: #3182ce;
}

.rate-limit-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
