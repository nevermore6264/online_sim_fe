<template>
  <div class="layout-topbar">
    <!-- Logo Section -->
    <div class="p-menubar-start">
      <a class="layout-topbar-logo" href="/">
        <img src="/layout/images/logo.png" alt="logo" width="75px" />
      </a>
    </div>

    <div class="additional-functions">
      <Button
        label="Rent Number"
        class="p-button-text"
        @click="handleRentNumber"
      />
      <Button label="Proxy" class="p-button-text" @click="handleProxy" />
    </div>

    <!-- Menu Section -->
    <div class="p-menubar-end d-flex align-items-center">
      <!-- Kiểm tra nếu userInfo tồn tại -->
      <template v-if="userInfo?.data?.id">
        <!-- Hiển thị tên người dùng -->
        <span class="user-name">
          Hello, {{ userInfo.data.firstName }} {{ userInfo.data.lastName }}
        </span>

        <!-- Logout Button -->
        <Button
          aria-label="Logout"
          class="p-button p-component p-button-text"
          @click="handleLogout"
        >
          <span class="p-button-icon pi pi-sign-out"></span>
          <span>Logout</span>
        </Button>
      </template>

      <!-- Hiển thị Login và Sign Up nếu không có userInfo -->
      <template v-else>
        <!-- Login Button -->
        <Button
          aria-label="Login"
          class="p-button p-component p-button-text"
          @click="openLoginDialog"
        >
          <span class="p-button-icon pi pi-sign-in"></span>
          <span>Login</span>
        </Button>

        <!-- Sign Up Button -->
        <Button
          aria-label="Sign Up"
          class="p-button p-component p-button-text"
          @click="openSignUpDialog"
        >
          <span class="p-button-icon pi pi-user-plus"></span>
          <span>Sign Up</span>
        </Button>
      </template>
    </div>
  </div>

  <!-- Login Dialog -->
  <Dialog
    v-model:visible="visibleLogin"
    modal
    header="Login"
    class="auth-dialog"
  >
    <form @submit.prevent="handleLogin">
      <div class="auth-left">
        <div class="logo">
          <img src="/layout/images/logo.png" alt="Logo" class="logo-image" />
        </div>
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
      <Button label="Sign Up!" class="auth-signup" @click="switchToSignUp" />
    </div>
  </Dialog>

  <!-- Sign Up Dialog -->
  <Dialog
    v-model:visible="visibleSignUp"
    modal
    header="Sign Up"
    class="auth-dialog"
  >
    <form @submit.prevent="handleSignUp">
      <div class="auth-left">
        <div class="logo">
          <img src="/layout/images/logo.png" alt="Logo" class="logo-image" />
        </div>
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
      <Button label="Sign In!" class="auth-signup" @click="switchToLogin" />
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { push } from "notivue";
import UserService from "@/services/user"; // Import từ user.js

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

// Sử dụng UserService để xử lý login
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
  } finally {
    loading.value = false;
  }
};

// Sử dụng UserService để xử lý đăng ký
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

      visibleSignUp.value = false;
    } else {
      push.error("Registration failed.");
    }
  } catch (error) {
    push.error("An error occurred during registration.");
  } finally {
    loading.value = false;
  }
};

const handleLogout = () => {
  localStorage.clear();
  Object.keys(userInfo).forEach((key) => delete userInfo[key]);
  push.success("Logged out successfully!");
  router.push("/");
  window.location.reload();
};

const handleRentNumber = () => {
  push.info("Redirecting to Rent Number...");
  router.push("/rent-number"); // Điều hướng tới trang "Rent Number"
};

const handleProxy = () => {
  push.info("Redirecting to Proxy...");
  router.push("/proxy"); // Điều hướng tới trang "Proxy"
};

// Sử dụng UserService để lấy thông tin người dùng
const fetchUserInfo = async (token) => {
  try {
    const response = await UserService.GetCurrentAccount(token);
    Object.assign(userInfo, response); // Lưu thông tin vào `userInfo`
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    console.error("Error fetching user info:", error);
    push.error("An error occurred during fetchUserInfo.");
  }
};

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    await fetchUserInfo(token);
  }
});
</script>

<style>
.layout-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* box-shadow: 0 3px 5px rgba(0, 0, 0, 0.02), 0 0 2px rgba(0, 0, 0, 0.05),
    0 1px 4px rgba(0, 0, 0, 0.08); */
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) -2px -3px 10px inset;
}

.layout-topbar .p-menubar-start {
  display: flex;
  align-items: center;
}

.layout-topbar .p-menubar-end {
  display: flex;
  margin-left: auto;
}

.layout-topbar .p-menuitem-link {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.layout-topbar .p-menubar {
  border: 0 !important;
  border-bottom: 1px solid #e2e8f0 !important;
  border-radius: 0px !important;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}

.layout-topbar .auth-dialog .p-dialog-header {
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
  padding: 0 2rem;
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
  background: linear-gradient(to left, #56ccf2, #2f80ed);
  color: #f5f7fa;
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
  color: #56ccf2;
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
  background: linear-gradient(to left, #56ccf2, #2f80ed);
  color: #ffffff;
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
  background: #ffffff;
  color: #56ccf2;
  border: 1px solid white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.input-field {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;
}

.layout-topbar .p-button-rounded {
  width: 100%;
}

.layout-topbar .p-button-icon {
  margin-right: 8px;
}

.layout-topbar .p-button.p-button-text {
  color: #56ccf2;
}

.logo {
  width: 100%;
  display: block;
  background: #ffffff;
  text-align: center;
}

.user-name {
  margin-right: 10px;
  font-weight: bold;
  color: #333;
  padding: 1rem 0;
}

.additional-functions {
  display: flex;
  gap: 1rem; /* Khoảng cách giữa các nút */
  margin-left: 20px; /* Khoảng cách giữa logo và các nút */
}

.additional-functions .p-button-text {
  color: #2aabee;
}

.additional-functions .p-button-text:hover {
  color: #3b82f6;
}

/* Responsive Layout for Mobile and Tablet */
@media (max-width: 768px) {
  .layout-topbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .layout-topbar .p-menubar-start,
  .p-menubar-end {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }

  .layout-topbar .p-menubar-end {
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

  .layout-topbar .p-button-icon {
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

  .layout-topbar .p-menubar-end {
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
