<template>
  <div class="without-login">
    <h1>Receive SMS Online - Verifysms</h1>
    <h2
      style="
        color: rgb(56, 56, 56);
        margin-left: 2px;
        margin-top: 5px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
      "
    >
      Receive SMS online to temporary numbers from all over the world
    </h2>
    <div class="spacer-25"></div>
    <Button class="try_it_out noselect" @click="openSignUpDialog">
      Try it now
      <i
        class="pi pi-arrow-right"
        style="font-size: 0.75rem; margin-left: 10px"
      ></i>
    </Button>
    <div class="clients_block">
      <div class="clients_stars">
        <div class="stars noselect">
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
        </div>
        <span class="users_count">550,000+ users</span>
      </div>
      <div class="clients_text">
        <h3>
          We are trusted by more than 550,000 paying customers, and that number
          continues to grow...
        </h3>
        <br />
        <span>
          With our Temporary Number service, you'll only get high-quality,
          billable numbers with the highest success rates on the market today.
        </span>
      </div>
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
import { ref, reactive, onMounted } from "vue";
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
      router.push("/receive-sms");
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

// Lấy thông tin khi component được mount (nếu đã có api_key trong localStorage)
onMounted(async () => {
  const api_key = localStorage.getItem("api_key");
  if (api_key) {
    await fetchUserInfo(api_key);
  }
});
</script>

<style scoped>
.clients_block {
  display: flex;
  flex-direction: column; /* Sắp xếp theo cột */
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
  margin-bottom: 10px;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 8px rgb(227, 227, 227);
}

.without-login {
  margin: 2rem auto;
  width: 95%;
}

.stars {
  text-align: center;
  margin-bottom: 10px; /* Khoảng cách giữa ngôi sao và dòng "550,000+ users" */
  color: #2aabee; /* Đổi màu ngôi sao thành xanh */
}

.stars i {
  font-size: 18px;
}

.users_count {
  font-size: 16px;
  font-weight: 500;
  color: rgb(56, 56, 56); /* Màu chữ tối */
}

.clients_text {
  text-align: left;
  margin-top: 15px;
  width: 100%;
}

.clients_text h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.clients_text span {
  display: block;
  margin-top: 5px;
  font-size: 14px;
  line-height: 24px;
  color: rgb(110, 120, 130);
}

.try_it_out {
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  padding: 14px 15px 15px 15px;
  padding-inline: 25px;
  border-radius: 15px;
  margin-top: 10px;
  background-color: #2aabee;
  margin: 2rem auto;
  border: none;
}

.try_it_out:hover {
  background-color: #3b82f6; /* Darker on hover */
}
</style>
