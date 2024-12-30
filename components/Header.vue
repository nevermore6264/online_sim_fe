<template>
  <div class="layout-topbar">
    <!-- Logo Section -->
    <div class="p-menubar-start">
      <a class="layout-topbar-logo" href="/">
        <img src="/layout/images/logo.png" alt="logo" class="logo-image" />
      </a>
    </div>

    <!-- Menu Section -->
    <div class="p-menubar-end">
      <div class="d-flex align-items-center">
        <!-- Login Button -->
        <Button
          aria-label="Login"
          class="p-button p-component p-button-text"
          @click="openLoginDialog"
        >
          <span class="p-button-icon pi pi-sign-in"></span>
          <span>Login</span>
        </Button>

        <!-- Login Dialog -->
        <Dialog
          v-model:visible="visibleLogin"
          modal
          header="Login"
          class="auth-dialog"
        >
          <form @submit.prevent="handleLogin">
            <div class="auth-left">
              <img
                src="/layout/images/logo.png"
                alt="Logo"
                class="logo-image"
              />
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
                label="Login"
                type="submit"
                class="auth-submit"
                :disabled="loading"
              />
              <a href="#" class="forgot-password">Forgot password?</a>
            </div>
          </form>
          <div class="auth-right">
            <h2>Register</h2>
            <p>Don't have an account? Sign up now!</p>
            <Button
              label="Sign Up!"
              class="auth-signup"
              @click="switchToSignUp"
            />
          </div>
        </Dialog>

        <!-- Sign Up Button -->
        <Button
          aria-label="Sign Up"
          class="p-button p-component p-button-text"
          @click="openSignUpDialog"
        >
          <span class="p-button-icon pi pi-user-plus"></span>
          <span>Sign Up</span>
        </Button>

        <!-- Sign Up Dialog -->
        <Dialog
          v-model:visible="visibleSignUp"
          modal
          header="Sign Up"
          class="auth-dialog"
        >
          <form @submit.prevent="handleSignUp">
            <div class="auth-left">
              <img
                src="/layout/images/logo.png"
                alt="Logo"
                class="logo-image"
              />
              <InputText
                v-model="signUpData.firstName"
                placeholder="First Name"
                required
                class="auth-input"
              />
              <InputText
                v-model="signUpData.lastName"
                placeholder="Last Name"
                required
                class="auth-input"
              />
              <InputText
                v-model="signUpData.username"
                placeholder="Username"
                required
                class="auth-input"
              />
              <InputText
                v-model="signUpData.password"
                type="password"
                placeholder="Password"
                required
                class="auth-input"
              />
              <InputText
                v-model="signUpData.confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                class="auth-input"
              />
              <Button
                label="Sign Up"
                type="submit"
                class="auth-submit"
                :disabled="loading"
              />
            </div>
          </form>
          <div class="auth-right">
            <h2>Login</h2>
            <p>Already have an account? Log in here.</p>
            <Button
              label="Sign In!"
              class="auth-signup"
              @click="switchToLogin"
            />
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { push } from "notivue";

const visibleLogin = ref(false);
const visibleSignUp = ref(false);
const loading = ref(false);
const router = useRouter();
const userInfo = reactive({}); // Lưu trữ thông tin người dùng

const loginData = ref({ username: "", password: "" });
const signUpData = ref({
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
});

const openLoginDialog = () => {
  visibleLogin.value = true;
  visibleSignUp.value = false;
};

const openSignUpDialog = () => {
  visibleSignUp.value = true;
  visibleLogin.value = false;
};

const switchToLogin = () => {
  visibleSignUp.value = false;
  visibleLogin.value = true;
};

const switchToSignUp = () => {
  visibleLogin.value = false;
  visibleSignUp.value = true;
};

const handleLogin = async () => {
  if (!loginData.value.username || !loginData.value.password) {
    alert("Please fill in both fields.");
    return;
  }

  loading.value = true;
  try {
    const response = await axios.post(
      "https://verifysms.org/api/web/login",
      loginData.value
    );
    const { token } = response.data?.data;

    if (token) {
      await fetchUserInfo(token);

      localStorage.setItem("token", token);
      push.success("Login successful!");
      visibleLogin.value = false;
      router.push("/receive-sms");
    } else {
      push.error("Invalid login credentials.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred during login.");
  } finally {
    loading.value = false;
  }
};

const handleSignUp = async () => {
  const { firstName, lastName, username, password, confirmPassword } =
    signUpData.value;
  if (!firstName || !lastName || !username || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  loading.value = true;
  try {
    const response = await axios.post(
      "https://japansim.net/api/web/register",
      signUpData.value
    );

    if (response.data.success) {
      alert("Registration successful! Please log in.");
      visibleSignUp.value = false;
    } else {
      alert("Registration failed.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred during registration.");
  } finally {
    loading.value = false;
  }
};

const fetchUserInfo = async (token) => {
  try {
    // Gọi API lấy thông tin người dùng
    const response = await axios.get(
      `https://japansim.net/api/account/get-info`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Object.assign(userInfo, response.data?.data); // Lưu thông tin vào userInfo
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

// Lấy thông tin khi component được mount (nếu đã có api_key trong localStorage)
onMounted(async () => {
  const api_key = localStorage.getItem("api_key");
  if (api_key) {
    await fetchUserInfo(api_key);
  }
});
</script>

<style scoped>
.layout-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.p-menubar-start {
  display: flex;
  align-items: center;
}

.p-menubar-end {
  display: flex;
  align-items: center;
}

.p-menuitem-link {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.p-menubar {
  border: 0 !important;
  border-bottom: 1px solid #e2e8f0 !important;
  border-radius: 0px !important;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}

.auth-dialog .p-dialog-header {
  background-color: #007bff;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-field {
  width: 100%;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.forgot-password {
  text-align: center;
  margin-top: 1rem;
}

.forgot-password a {
  color: #007bff;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.auth-left {
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  float: left;
}

.auth-logo {
  margin-bottom: 1rem;
}

.auth-form {
  width: 100%;
  max-width: 400px;
}

.auth-field {
  display: flex;
  align-items: center;
  border-radius: 4px;
}

.auth-label {
  font-size: 1rem;
  margin-right: 0.5rem;
  color: #888;
}

.auth-input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
}

.auth-submit {
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.75rem;
}

.auth-submit:hover {
  background-color: #0056b3;
}

.forgot-password {
  display: block;
  text-align: right;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.recaptcha-container {
  margin-top: 2rem;
  text-align: center;
}

.auth-right {
  width: 50%;
  height: 425px;
  padding: 2rem;
  background-color: #007bff;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.auth-right h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.auth-right p {
  margin-bottom: 2rem;
}

.auth-signup {
  background-color: white;
  color: #007bff;
  border: 1px solid white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.auth-signup:hover {
  background-color: #e8e8e8;
  color: #0056b3;
}

.input-field {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;
}

.p-button-rounded {
  width: 100%;
}

.p-button-icon {
  margin-right: 8px;
}

/* Responsive Layout for Mobile and Tablet */
@media (max-width: 768px) {
  .layout-topbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .p-menubar-start,
  .p-menubar-end {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }

  .p-menubar-end {
    margin-top: 10px;
    justify-content: flex-end;
  }

  .auth-dialog {
    width: 90% !important;
  }

  .auth-left,
  .auth-right {
    width: 100%;
    float: none;
    padding: 1rem;
    text-align: center;
  }

  .auth-right {
    margin-top: 20px;
    display: none;
  }

  .auth-input {
    width: 100%;
    font-size: 14px;
  }

  .auth-submit,
  .auth-signup {
    width: 100%;
    font-size: 16px;
  }

  .forgot-password {
    text-align: center;
  }

  .p-button-icon {
    margin-right: 4px;
  }

  .auth-right h2 {
    font-size: 1.5rem;
  }

  .auth-right p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .layout-topbar {
    padding: 5px;
  }

  .p-menubar-end {
    flex-direction: column;
    align-items: center;
  }

  .auth-dialog {
    width: 95% !important;
  }

  .auth-left,
  .auth-right {
    padding: 0.5rem;
  }

  .auth-right h2 {
    font-size: 1.2rem;
  }

  .auth-right p {
    font-size: 0.9rem;
  }

  .auth-input {
    font-size: 12px;
    padding: 8px;
  }

  .auth-submit,
  .auth-signup {
    font-size: 14px;
    padding: 10px;
  }

  .forgot-password {
    font-size: 0.9rem;
  }
}
</style>
