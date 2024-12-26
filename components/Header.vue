<template>
  <div
    class="p-menubar p-component p-menubar-mobile-active layout-topbar"
    data-pc-name="menubar"
    data-pc-section="root"
  >
    <!-- Logo Section -->
    <div class="p-menubar-start" data-pc-section="start">
      <a class="layout-topbar-logo" href="/">
        <img src="/layout/images/logo.svg" alt="logo" />
      </a>
    </div>

    <!-- End Section -->
    <div class="p-menubar-end" data-pc-section="end">
      <div class="d-flex align-items-center">
        <!-- Login Button -->
        <Button
          aria-label="Login"
          class="p-button p-component p-button-text"
          @click="visible = true"
        >
          <span
            class="p-button-icon p-c p-button-icon-left pi pi-sign-in"
            data-pc-section="icon"
          ></span>
          <span class="p-button-label p-c" data-pc-section="label">
            Login
          </span>
        </Button>

        <!-- Login Dialog -->
        <Dialog
          v-model:visible="visible"
          modal
          header="Login"
          :style="{ width: '50%' }"
          class="auth-dialog"
        >
          <div class="auth-left">
            <div class="auth-logo">
              <img
                src="/layout/images/logo.svg"
                alt="Logo"
                class="logo-image"
              />
            </div>
            <form @submit.prevent="handleLogin" class="auth-form">
              <div class="auth-field">
                <label for="username" class="auth-label">
                  <i class="pi pi-user"></i>
                </label>
                <InputText
                  id="username"
                  v-model="email"
                  placeholder="Enter name"
                  required
                  class="auth-input"
                />
              </div>
              <div class="auth-field">
                <label for="password" class="auth-label">
                  <i class="pi pi-lock"></i>
                </label>
                <InputText
                  id="password"
                  type="password"
                  v-model="password"
                  placeholder="Enter password"
                  required
                  class="auth-input"
                />
              </div>
              <Button label="Sign in" type="submit" class="auth-submit" />
              <a href="#" class="forgot-password">Forgot password?</a>
            </form>
          </div>
          <div class="auth-right">
            <h2>Register</h2>
            <p>
              If you do not have an account, please register for one now to
              experience our services.
            </p>
            <Button label="Sign up!" class="auth-signup" />
          </div>
        </Dialog>

        <!-- Sign Up Button -->
        <Button
          aria-label="Sign Up"
          class="p-button p-component p-button-text"
          @click="visibleSignUp = true"
        >
          <span
            class="p-button-icon p-c p-button-icon-left pi pi-user-plus"
            data-pc-section="icon"
          ></span>
          <span class="p-button-label p-c" data-pc-section="label">
            Sign Up
          </span>
        </Button>

        <!-- Sign Up Dialog -->
        <Dialog
          v-model:visible="visibleSignUp"
          modal
          header="Sign Up"
          :style="{ width: '50%' }"
          class="auth-dialog"
        >
          <div class="auth-left">
            <div class="auth-logo">
              <img
                src="/layout/images/logo.svg"
                alt="Logo"
                class="logo-image"
              />
            </div>
            <form @submit.prevent="handleSignup" class="auth-form">
              <div class="auth-field">
                <label for="email" class="auth-label">
                  <i class="pi pi-envelope"></i>
                </label>
                <InputText
                  id="email"
                  v-model="email"
                  placeholder="Enter your email"
                  required
                  class="auth-input"
                />
              </div>
              <div class="auth-field">
                <label for="password" class="auth-label">
                  <i class="pi pi-lock"></i>
                </label>
                <InputText
                  id="password"
                  type="password"
                  v-model="password"
                  placeholder="Enter password"
                  required
                  class="auth-input"
                />
              </div>
              <div class="auth-field">
                <label for="confirmPassword" class="auth-label">
                  <i class="pi pi-lock"></i>
                </label>
                <InputText
                  id="confirmPassword"
                  type="password"
                  v-model="confirmPassword"
                  placeholder="Confirm password"
                  required
                  class="auth-input"
                />
              </div>
              <Button label="Sign Up" type="submit" class="auth-submit" />
            </form>
          </div>
          <div class="auth-right">
            <h2>Login</h2>
            <p>If you already have an account, please log in to the system.</p>
            <Button label="Sign in!" class="auth-signup" />
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios"; // Dùng thư viện axios để gọi API

const visible = ref(false);
const visibleSignUp = ref(false);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const userInfo = reactive({}); // Lưu trữ thông tin người dùng
const router = useRouter();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert("Please fill in both fields.");
    return;
  }

  //   try {
  // Gọi API đăng nhập
  // const response = await axios.post(
  //   "https://japansim.net/api/account/login",
  //   {
  //     email: email.value,
  //     password: password.value,
  //   }
  // );

  // const { api_key } = response.data; // Lấy api_key từ response
  const api_key = "bb642c5a-c7dd-4afc-86ea-6221de6c33af";
  if (!api_key) {
    alert("Login failed! Please try again.");
    return;
  }

  // Lưu api_key vào localStorage
  localStorage.setItem("api_key", api_key);

  // Lấy thông tin người dùng
  await fetchUserInfo(api_key);

  // Đóng dialog đăng nhập
  visible.value = false;
  alert("Login successful!");
  router.push("/receive-sms");
  rout;
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert("Login failed! Please check your credentials.");
  //   }
};

const fetchUserInfo = async (api_key) => {
  try {
    // Gọi API lấy thông tin người dùng
    const response = await axios.get(
      `https://japansim.net/api/account/get-info?api_key=${api_key}`
    );
    Object.assign(userInfo, response.data?.data); // Lưu thông tin vào userInfo
    // Lưu userInfo vào localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    console.error("Error fetching user info:", error);
    alert("Failed to fetch user information.");
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
  margin-bottom: 1rem;
  border-radius: 4px;
}

.auth-label {
  font-size: 1.5rem;
  margin-right: 0.5rem;
  color: #888;
}

.auth-input {
  width: 100%;
  border: none;
  outline: none;
}

.auth-submit {
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
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
</style>
