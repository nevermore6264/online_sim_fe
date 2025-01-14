<template>
  <div class="profile-page">
    <div class="profile-header">
      <!-- <img
        src="/default-avatar.png"
        alt="Default Avatar"
        class="profile-avatar"
      /> -->
      <h2>{{ userInfo?.firstName }} {{ userInfo?.lastName }}</h2>
      <p class="username">ID: {{ userInfo?.id }}</p>
    </div>

    <div class="profile-body">
      <h3>About</h3>
      <p>Số dư tài khoản: {{ userInfo?.balanceAmount }} USD</p>
      <p v-if="userInfo?.depositAddress">
        Địa chỉ nạp: {{ userInfo?.depositAddress }}
      </p>
      <p v-else>Địa chỉ nạp chưa được cung cấp.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const userInfo = ref(null);

// Lấy thông tin người dùng từ localStorage
const fetchUserInfoFromLocalStorage = () => {
  const storedData = localStorage.getItem("userInfo");
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (parsedData.success) {
        userInfo.value = parsedData.data;
      } else {
        console.error("User data is not valid.");
      }
    } catch (error) {
      console.error("Error parsing user info from localStorage:", error);
    }
  } else {
    console.warn("No user info found in localStorage.");
  }
};

onMounted(fetchUserInfoFromLocalStorage);
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.username {
  color: #888;
  font-size: 14px;
}

.profile-body {
  text-align: left;
}

.profile-body h3 {
  margin-top: 20px;
  color: #007bff;
}
</style>
