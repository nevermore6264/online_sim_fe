<template>
  <aside class="sidebar">
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
      <li v-for="(item, index) in menuItems" :key="index">
        <NuxtLink :to="item.to">
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
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

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

// Điều hướng đến trang nạp tiền
const goToPayment = () => {
  router.push("/payment");
};

// Đăng xuất
const logout = () => {
  // Thêm logic đăng xuất tại đây, ví dụ: xóa token, chuyển hướng về trang login
  console.log("Logged out");
  router.push("/");
};
</script>

<style scoped>
.sidebar {
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
  padding: 20px 20px;
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
</style>
