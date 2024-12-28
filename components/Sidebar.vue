<template>
  <div>
    <!-- Button to toggle the sidebar -->
    <button @click="toggleSidebar" class="toggle-sidebar-btn">
      <i
        :class="isSidebarVisible ? 'pi pi-angle-left' : 'pi pi-angle-right'"
      ></i>
    </button>
    <!-- Sidebar -->
    <aside id="sidebar" :class="{ 'sidebar-hidden': !isSidebarVisible }">
      <!-- Logo -->
      <div class="logo">
        <img src="/layout/images/logo.svg" alt="Logo" class="logo-image" />
      </div>
      <!-- Balance and Recharge -->
      <div class="balance-container">
        <p>Balance: {{ balanceAmount }} USD</p>
        <button @click="goToPayment" class="recharge-button">Recharge</button>
      </div>

      <!-- Menu Items -->
      <ul>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ active: $route.path === item.to }"
        >
          <NuxtLink :to="item.to" exact-active-class="active">
            <i :class="item.icon" class="menu-icon"></i>
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- User Info -->
      <div class="user-info">
        <div class="user-details">
          <i class="pi pi-user user-icon"></i>
          <span>{{ firstName }} {{ lastName }}</span>
        </div>
        <button @click="logout" class="logout-button">
          <i class="pi pi-sign-out"></i> Logout
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// State for sidebar visibility
const isSidebarVisible = ref(true);

const balanceAmount = ref(100.0); // Số dư hiện tại
const firstName = ref("John"); // Tên người dùng
const lastName = ref("Doe"); // Họ người dùng
const router = useRouter();

// Danh sách menu
const menuItems = [
  { label: "Receive SMS", icon: "pi pi-fw pi-home", to: "/receive-sms" },
  {
    label: "Mobile proxies",
    icon: "pi pi-fw pi-id-card",
    to: "/mobile-proxies",
  },
  {
    label: "Number rent",
    icon: "pi pi-fw pi-check-square",
    to: "/number-rent",
  },
  { label: "SMS history", icon: "pi pi-fw pi-mobile", to: "/sms-history" },
];

// Toggle sidebar visibility
const toggleSidebar = () => {
  const sidebar = document.getElementById("sidebar");
  const appContent = document.getElementById("app-content");

  if (isSidebarVisible.value) {
    sidebar.classList.add("sidebar-hidden");
    appContent.style.marginLeft = "0";
  } else {
    sidebar.classList.remove("sidebar-hidden");
    appContent.style.marginLeft = "250px";
  }

  isSidebarVisible.value = !isSidebarVisible.value;
};

// Điều hướng đến trang nạp tiền
const goToPayment = () => {
  router.push("/payment");
};

// Đăng xuất
const logout = () => {
  console.log("Logged out");
  router.push("/");
  localStorage.clear();
};

onMounted(() => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo);
    firstName.value = parsedUserInfo.firstName || firstName.value;
    lastName.value = parsedUserInfo.lastName || lastName.value;
    balanceAmount.value = parsedUserInfo.balanceAmount ?? 0;
  }
});
</script>

<style scoped>
/* Sidebar styles */
#sidebar {
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
  height: calc(100vh - 60px);
  position: fixed;
  left: 0;
  top: 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
}

.sidebar-hidden {
  transform: translateX(-100%);
}

.logo {
  text-align: center;
  margin-bottom: 1rem;
}

.logo-image {
  max-width: 100%;
  height: auto;
}

.balance-container {
  margin-bottom: 1rem;
  text-align: center;
}

.balance-container p {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.recharge-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.recharge-button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 15px 20px;
  font-size: 16px;
  display: block;
  width: 100%;
}

li a {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

li:hover {
  width: 100%;
  background: #00d2ff;
  background: -webkit-linear-gradient(to right, #3a7bd5, #00d2ff);
  background: linear-gradient(to right, #3a7bd5, #00d2ff);
}

li a:hover {
  color: #ffffff;
}

.menu-icon {
  font-size: 16px;
}

.user-info {
  text-align: center;
  margin-top: auto;
}

.user-details {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.user-icon {
  font-size: 20px;
}

.logout-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #a71d2a;
}

/* Toggle button styles */
.toggle-sidebar-btn {
  position: fixed;
  top: 15px;
  left: 10px;
  z-index: 1000;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-sidebar-btn:hover {
  background-color: #0056b3;
}

li.active {
  background: #00d2ff;
  background: -webkit-linear-gradient(to right, #3a7bd5, #00d2ff);
  background: linear-gradient(to right, #3a7bd5, #00d2ff);
}

li.active a {
  color: #ffffff;
}

.sidebar-hidden {
  transform: translateX(-100%);
}
</style>
