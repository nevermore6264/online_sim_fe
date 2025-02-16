<template>
  <div class="layout-topbar">
    <!-- Logo Section -->
    <div class="p-menubar-start">
      <a class="layout-topbar-logo" href="/">
        <img src="/layout/images/logo.png" alt="logo" width="75px" />
      </a>
    </div>

    <!-- Hiển thị chức năng cho Desktop -->
    <template v-if="userInfo?.data?.id">
      <div v-if="!isMobile" class="additional-functions d-none d-md-flex">
        <Button
          :label="$t('landing.headerActivations')"
          class="p-button-text"
          @click="handleActivations"
        />
        <Button
          :label="$t('landing.headerBuyOTP')"
          class="p-button-text"
          @click="handleRentOTP"
        />
        <Button class="p-button-text" @click="handleProxy">
          <b style="color: red; font-size: 15px">HQ</b>
          <span>{{ $t("landing.headerProxy") }}</span>
        </Button>
        <Button
          :label="$t('landing.headerNews')"
          class="p-button-text"
          @click="handleNews"
        />
        <Button
          :label="$t('landing.headerAPI')"
          class="p-button-text"
          @click="handleAPI"
        />
      </div>
    </template>

    <!-- Menu Section -->
    <div class="p-menubar-end d-flex align-items-center">
      <template v-if="userInfo?.data?.id">
        <span class="user-name clickable" @click="goToProfile">
          {{ $t("landing.hello") }}, {{ userInfo.data.firstName }}
          {{ userInfo.data.lastName }}
        </span>
        <span class="balance"> ({{ userInfo.data.balanceAmount }} USDT)</span>

        <Button
          aria-label="Logout"
          class="p-button p-component p-button-text"
          @click="handleLogout"
          v-if="!isMobile"
        >
          <span class="p-button-icon pi pi-sign-out"></span>
          <span>{{ $t("landing.logout") }}</span>
        </Button>
        <!-- Hiển thị Menu Dropdown cho Mobile -->
        <div v-if="isMobile" class="d-flex d-md-none">
          <Button
            icon="pi pi-bars"
            class="p-button-text"
            @click="toggleMenu"
            aria-haspopup="true"
            aria-controls="mobileMenu"
          />
          <OverlayPanel ref="mobileMenu" id="mobileMenu">
            <ul class="mobile-menu">
              <li @click="handleActivations">
                {{ $t("landing.headerActivations") }}
              </li>
              <li @click="handleRentOTP">{{ $t("landing.headerBuyOTP") }}</li>
              <li @click="handleProxy">
                <b style="color: red; font-size: 15px">HQ</b>
                <span>{{ $t("landing.headerProxy") }}</span>
              </li>
              <li @click="handleNews">{{ $t("landing.headerNews") }}</li>
              <li @click="handleAPI">{{ $t("landing.headerAPI") }}</li>
              <li @click="handleLogout">{{ $t("landing.logout") }}</li>
            </ul>
          </OverlayPanel>
        </div>
      </template>
      <template v-else>
        <Button
          aria-label="Login"
          class="p-button p-component p-button-text"
          @click="() => $router.push('/login')"
        >
          <span class="p-button-icon pi pi-sign-in"></span>
          <span>{{ $t("landing.login") }}</span>
        </Button>

        <Button
          aria-label="Sign Up"
          class="p-button p-component p-button-text"
          @click="() => $router.push('/signup')"
        >
          <span class="p-button-icon pi pi-user-plus"></span>
          <span>{{ $t("landing.signup") }}</span>
        </Button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { push } from "notivue";
import UserService from "@/services/user";
import OverlayPanel from "primevue/overlaypanel";

const isMobile = ref(false);

const updateScreenSize = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 768;
  }
};

const router = useRouter();
const userInfo = reactive({});
const mobileMenu = ref(null); // Ref cho OverlayPanel

const toggleMenu = (event) => {
  mobileMenu.value.toggle(event);
};

const handleLogout = () => {
  localStorage.clear();
  Object.keys(userInfo).forEach((key) => delete userInfo[key]);
  push.success("Logged out successfully!");
  router.push("/");
  window.location.reload();
};

const handleActivations = () => router.push("/activations");
const handleRentOTP = () => router.push("/buy-otp");
const handleProxy = () => router.push("/proxy");
const handleNews = () => router.push("/news");
const handleAPI = () => (window.location.href = "https://japansim.net/");

const fetchUserInfo = async (token) => {
  try {
    const response = await UserService.GetCurrentAccount(token);
    Object.assign(userInfo, response);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    console.error("Error fetching user info:", error);
    push.error("An error occurred during fetchUserInfo.");
  }
};

const goToProfile = () => {
  if (userInfo?.data?.id) {
    router.push(`/profile`);
  } else {
    push.warning("User information not available.");
  }
};

onMounted(async () => {
  updateScreenSize();
  const token = localStorage.getItem("token");
  if (token) {
    await fetchUserInfo(token);
  }
  window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
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

.user-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.user-name.clickable:hover {
  color: #0056b3;
  text-decoration: underline;
}

.balance {
  font-size: 14px; /* Kích thước nhỏ hơn */
  font-weight: normal; /* Không in đậm */
  color: #666; /* Màu khác, ví dụ: màu xám nhạt */
  margin-left: 5px; /* Khoảng cách bên trái */
}

.user-name.clickable {
  cursor: pointer;
  color: #007bff;
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
  margin: 0 auto;
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
  text-align: center;
}

.additional-functions {
  display: flex;
  gap: 1rem;
  /* Khoảng cách giữa các nút */
  margin-left: 20px;
  /* Khoảng cách giữa logo và các nút */
}

.additional-functions .p-button-text {
  color: #2aabee;
}

.additional-functions .p-button-text:hover {
  color: #3b82f6;
}

.social-login {
  margin-top: 1rem;
  text-align: center;
}

.social-login p {
  margin-bottom: 0.5rem;
  color: #666;
}

/* Responsive Layout for Mobile and Tablet */
@media (max-width: 768px) {
  .layout-topbar {
    align-items: flex-start;
    justify-content: center;
    padding: 10px;
  }

  .layout-topbar .p-menubar-start,
  .p-menubar-end {
    justify-content: center;
  }

  .layout-topbar .p-menubar-end {
    margin-top: 10px;
    justify-content: center;
  }

  .footer-content {
    display: block !important;
  }

  .footer-icons-box {
    justify-content: center !important;
    margin-top: 20px !important;
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
    /* flex-direction: column; */
    align-items: center;
    justify-content: end;
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

.mobile-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.mobile-menu li {
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.mobile-menu li:last-child {
  border-bottom: none;
}

.mobile-menu li:hover {
  background-color: #f0f0f0;
}

@media (max-width: 768px) {
  .additional-functions {
    display: none !important;
  }
}
</style>
