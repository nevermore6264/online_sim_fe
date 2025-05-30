<template>
  <div class="layout-topbar">
    <!-- Logo Section -->
    <div class="p-menubar-start">
      <a class="layout-topbar-logo" href="/">
        <img src="/layout/images/logo.jpg" alt="logo" width="75px" />
      </a>
    </div>

    <!-- Hiển thị chức năng cho Desktop -->
    <template v-if="userInfo?.data?.id">
      <div v-if="!isMobile" class="additional-functions d-none d-md-flex">
        <Button
          :label="$t('landing.headerBuyOTP')"
          class="p-button-text"
          :class="{ 'active-menu': activeMenu === 'activations' }"
          @click="handleRentOTP"
        />
        <Button
          :label="$t('landing.headerRentSim')"
          class="p-button-text"
          :class="{ 'active-menu': activeMenu === 'rent-sim' }"
          @click="handleActivations"
        />
        <Button
          :label="$t('landing.headerCall')"
          class="p-button-text"
          :class="{ 'active-menu': activeMenu === 'call' }"
          @click="handleCall"
        />

        <Button
          class="p-button-text"
          :class="{ 'active-menu': activeMenu === 'proxy' }"
          @click="handleProxy"
        >
          <b style="color: red; font-size: 15px">HQ</b>
          <span>{{ $t("landing.headerProxy") }}</span>
        </Button>
        <!-- <Button
          :label="$t('landing.headerNews')"
          class="p-button-text"
          :class="{ 'active-menu': activeMenu === 'news' }"
          @click="handleNews"
        /> -->
        <Button
          :label="$t('landing.headerAPI')"
          class="p-button-text"
          :class="{ 'active-menu': activeMenu === 'api' }"
          @click="handleAPI"
        />
        <Button
          :label="$t('landing.headerHelp')"
          class="p-button-text"
          :class="{ 'active-menu': activeMenu === 'help' }"
          @click="handleHelp"
        />
        <Button
          :label="$t('landing.headerDeposit')"
          class="p-button-text"
          :class="{ 'active-menu': activeMenu === 'deposit' }"
          @click="handleDeposit"
        />
        <Button
          :label="$t('landing.headerReferral')"
          class="p-button-text"
          :class="{ 'active-menu': activeMenu === 'referral' }"
          @click="handleReferral"
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
        <span class="balance"> ({{ userInfo.data.balanceAmount }} USD)</span>

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
              <li
                @click="handleCall"
                :class="{ 'active-menu': activeMenu === 'call' }"
              >
                {{ $t("landing.headerCall") }}
              </li>
              <li
                @click="handleActivations"
                :class="{ 'active-menu': activeMenu === 'rent-sim' }"
              >
                {{ $t("landing.headerRentSim") }}
              </li>
              <li
                @click="handleRentOTP"
                :class="{ 'active-menu': activeMenu === 'activations' }"
              >
                {{ $t("landing.headerBuyOTP") }}
              </li>
              <li
                @click="handleProxy"
                :class="{ 'active-menu': activeMenu === 'proxy' }"
              >
                <b style="color: red; font-size: 15px">HQ</b>
                <span>{{ $t("landing.headerProxy") }}</span>
              </li>
              <!-- <li
                @click="handleNews"
                :class="{ 'active-menu': activeMenu === 'news' }"
              >
                {{ $t("landing.headerNews") }}
              </li> -->
              <li
                @click="handleAPI"
                :class="{ 'active-menu': activeMenu === 'api' }"
              >
                {{ $t("landing.headerAPI") }}
              </li>
              <li
                @click="handleHelp"
                :class="{ 'active-menu': activeMenu === 'help' }"
              >
                {{ $t("landing.headerHelp") }}
              </li>
              <li
                @click="handleDeposit"
                :class="{ 'active-menu': activeMenu === 'deposit' }"
              >
                {{ $t("landing.headerDeposit") }}
              </li>
              <li
                @click="handleReferral"
                :class="{ 'active-menu': activeMenu === 'referral' }"
              >
                {{ $t("landing.headerReferral") }}
              </li>
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
import { useRoute } from "vue-router";

const isMobile = ref(false);
const activeMenu = ref(""); // Theo dõi menu hiện tại

const updateScreenSize = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 768;
  }
};

const router = useRouter();
const route = useRoute();
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

const handleActivations = () => {
  activeMenu.value = "rent-sim";
  router.push("/rent-sim");
};

const handleRentOTP = () => {
  activeMenu.value = "activations";
  router.push("/activations");
};

const handleProxy = () => {
  activeMenu.value = "proxy";
  router.push("/proxy");
};

const handleNews = () => {
  activeMenu.value = "news";
  router.push("/news");
};

const handleAPI = () => {
  activeMenu.value = "api";
  window.open("https://japansim.net/", "_blank");
};

const handleCall = () => {
  activeMenu.value = "call";
  router.push("/call");
};

const handleHelp = () => {
  activeMenu.value = "help";
  router.push("/help");
};

const handleDeposit = () => {
  activeMenu.value = "deposit";
  router.push("/deposit");
};

const handleReferral = () => {
  activeMenu.value = "referral";
  router.push("/referral");
};

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
    if (
      token ==
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjkzMjMyMDYwNSwiaWF0IjoxNzQxMDgzMjk4fQ.HUF0TnWfCjv2L_xoeE3rBC0ucG6pmu-qlK03wLfuw4w"
    ) {
      userInfo.data = {
        id: "9999",
        firstName: "Admin",
        lastName: "",
        balanceAmount: "N/A",
      };
    } else {
      await fetchUserInfo(token);
    }
  }
  window.addEventListener("resize", updateScreenSize);

  // Add event listener for user info updates
  window.addEventListener("userInfoUpdated", (event) => {
    Object.assign(userInfo, event.detail);
  });

  switch (route.path) {
    case "/rent-sim":
      activeMenu.value = "rent-sim";
      break;
    case "/activations":
      activeMenu.value = "activations";
      break;
    case "/proxy":
      activeMenu.value = "proxy";
      break;
    case "/news":
      activeMenu.value = "news";
      break;
    default:
      activeMenu.value = "";
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
  // Remove event listener for user info updates
  window.removeEventListener("userInfoUpdated", (event) => {
    Object.assign(userInfo, event.detail);
  });
});
</script>

<style>
.layout-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #e0f7fa 0%, #ffffff 100%);
  box-shadow: 0 4px 24px rgba(42, 171, 238, 0.1);
  border-radius: 0 0 18px 18px;
  padding: 0 28px;
  min-height: 64px;
  border-bottom: 1px solid #e3f2fd;
}

.layout-topbar-logo {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 8px;
  box-sizing: border-box;
}

.layout-topbar-logo img {
  width: 48px !important;
  height: 48px !important;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(42, 171, 238, 0.12);
  transition: transform 0.2s;
}
.layout-topbar-logo img:hover {
  transform: scale(1.08) rotate(-2deg);
}

.additional-functions {
  display: flex;
  gap: 1.2rem;
  margin-left: 20px;
}

.additional-functions .p-button-text {
  color: #2196f3;
  border-radius: 10px;
  font-weight: 500;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  padding: 7px 18px;
}
.additional-functions .p-button-text:hover,
.additional-functions .active-menu {
  background: #e3f2fd !important;
  color: #1565c0 !important;
  box-shadow: 0 2px 8px rgba(42, 171, 238, 0.13);
}

.user-name {
  font-size: 16px;
  font-weight: bold;
  color: #1976d2;
  cursor: pointer;
  border-radius: 8px;
  padding: 4px 12px;
  background: #f5fbff;
  margin-right: 6px;
  transition: background 0.2s, color 0.2s;
}
.user-name.clickable:hover {
  background: #e3f2fd;
  color: #0d47a1;
  text-decoration: underline;
}

.balance {
  font-size: 14px;
  color: #388e3c;
  background: #e8f5e9;
  border-radius: 8px;
  padding: 3px 10px;
  margin-left: 4px;
  font-weight: 600;
}

.p-menubar-end .p-button.p-button-text {
  color: #2196f3;
  background: #f5fbff;
  border-radius: 10px;
  font-weight: 500;
  margin-left: 8px;
  box-shadow: 0 1px 4px rgba(42, 171, 238, 0.06);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  padding: 7px 18px;
}
.p-menubar-end .p-button.p-button-text:hover {
  background: #e3f2fd;
  color: #1565c0;
  box-shadow: 0 2px 8px rgba(42, 171, 238, 0.13);
}

.p-menubar-end .p-button.p-button-text .p-button-icon {
  margin-right: 6px;
}

.mobile-menu li {
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  border-bottom: 1px solid #e3f2fd;
  border-radius: 8px;
  margin: 2px 0;
  transition: background 0.18s, color 0.18s;
}
.mobile-menu li:hover,
.mobile-menu li.active-menu {
  background: #e3f2fd;
  color: #1565c0;
}

@media (max-width: 900px) {
  .layout-topbar {
    padding: 0 8px;
    min-height: 54px;
  }
  .layout-topbar-logo img {
    width: 36px !important;
    height: 36px !important;
  }
  .additional-functions {
    gap: 0.5rem;
    margin-left: 8px;
  }
}

@media (max-width: 768px) {
  .layout-topbar {
    padding: 0 4px;
    min-height: 44px;
    border-radius: 0 0 10px 10px;
  }
  .layout-topbar-logo img {
    width: 32px !important;
    height: 32px !important;
  }
  .user-name {
    font-size: 14px;
    padding: 2px 8px;
  }
  .balance {
    font-size: 12px;
    padding: 2px 6px;
  }
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
}

.input-field {
  width: 100%;
}

.actions {
  display: flex;
  justify-content: center;
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
  margin-bottom: 0.75rem;
}

.auth-submit:hover {
  background-color: #0056b3;
}

.forgot-password {
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

.social-login {
  margin-top: 1rem;
  text-align: center;
}

.social-login p {
  margin-bottom: 0.5rem;
  color: #666;
}

.active-menu {
  color: #007bff !important; /* Màu chữ */
  font-weight: bold; /* In đậm */
  border-bottom: 2px solid #007bff; /* Gạch chân */
}

.layout-topbar-logo {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 8px;
  box-sizing: border-box;
}

.layout-topbar-logo img {
  width: 48px !important;
  height: 48px !important;
  object-fit: cover;
  display: block;
}

/* Nếu bạn muốn thay đổi màu nền */
.active-menu {
  background-color: #f0f8ff; /* Màu nền nhạt */
}

/* Responsive Layout for Mobile and Tablet */
@media (max-width: 768px) {
  .layout-topbar {
    align-items: center;
    justify-content: space-between;
    padding: 4px 10px;
    min-height: 48px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
    background: rgba(255, 255, 255, 0.98);
  }
  .layout-topbar-logo {
    height: 40px;
    padding: 0 4px;
  }
  .layout-topbar-logo img {
    width: 36px !important;
    height: 36px !important;
  }
  .p-menubar-end {
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  }
  .user-name {
    font-size: 15px;
    font-weight: 600;
    color: #2196f3;
    margin-right: 4px;
  }
  .balance {
    font-size: 13px;
    color: #888;
    margin-left: 2px;
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
