<template>
  <div class="fab-container">
    <!-- Nút chính -->
    <button class="fab-main" @click="toggleMenu">
      <i class="pi pi-question"></i>
      <!-- Icon hỗ trợ -->
    </button>

    <!-- Các nút phụ -->
    <div v-if="isMenuOpen" class="fab-menu">
      <button class="fab-item" @click="openEmail">
        <i class="pi pi-envelope"></i>
        <!-- Icon Email -->
      </button>
      <button class="fab-item" @click="openTelegram">
        <i class="pi pi-telegram"></i>
        <!-- Icon Telegram -->
      </button>
    </div>

    <!-- Overlay cho Email -->
    <div v-if="isEmailOpen" class="overlay">
      <div class="overlay-content">
        <h3>Gửi Email Hỗ Trợ</h3>
        <div class="form-group">
          <label for="name">Tên</label>
          <input id="name" v-model="name" placeholder="Nhập tên của bạn" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" placeholder="Nhập email của bạn" />
        </div>
        <div class="form-group">
          <label for="message">Nội dung</label>
          <textarea
            id="message"
            v-model="message"
            rows="5"
            placeholder="Nhập nội dung tin nhắn"
          ></textarea>
        </div>
        <button class="submit-button" @click="sendEmail">Gửi</button>
        <button class="close-button" @click="closeEmail">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false); // Trạng thái mở/đóng menu
const isEmailOpen = ref(false); // Trạng thái mở/đóng form email
const name = ref("");
const email = ref("");
const message = ref("");

// Mở/đóng menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Mở form email
const openEmail = () => {
  isEmailOpen.value = true;
  isMenuOpen.value = false; // Đóng menu khi mở form email
};

// Đóng form email
const closeEmail = () => {
  isEmailOpen.value = false;
};

// Mở Telegram
const openTelegram = () => {
  window.open("https://t.me/your_telegram_link", "_blank");
};

// Gửi email (logic giả lập)
const sendEmail = () => {
  console.log("Gửi email:", {
    name: name.value,
    email: email.value,
    message: message.value,
  });
  // Reset form
  name.value = "";
  email.value = "";
  message.value = "";
  closeEmail();
};
</script>

<style scoped>
/* Container chính */
.fab-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

/* Nút chính */
.fab-main {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.fab-main:hover {
  background-color: #0056b3;
}

/* Menu các nút phụ */
.fab-menu {
  position: absolute;
  bottom: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Nút phụ */
.fab-item {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: white;
  color: #007bff;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.fab-item:hover {
  background-color: #f0f0f0;
}

/* Overlay cho form email */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.overlay-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.overlay-content h3 {
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.submit-button,
.close-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}

.close-button {
  background-color: #f0f0f0;
  color: #333;
}

.close-button:hover {
  background-color: #ddd;
}
</style>
