<template>
  <div class="fab-container">
    <button class="fab-main" @click="toggleMenu">
      <i class="pi pi-comments"></i>
    </button>

    <div v-if="isMenuOpen" class="fab-menu">
      <button class="fab-item" @click="openEmail">
        <i class="pi pi-envelope"></i>
      </button>
      <button class="fab-item" @click="openTelegram">
        <i class="pi pi-telegram"></i>
      </button>
    </div>

    <div v-if="isEmailOpen" class="overlay">
      <div class="overlay-content">
        <div class="overlay-header">
          <h3>{{ $t("support.title") }}</h3>
          <button class="close-icon" @click="closeEmail">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div class="form-group">
          <label for="name">{{ $t("support.name") }}</label>
          <input
            id="name"
            v-model="name"
            :placeholder="$t('support.name')"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="email">{{ $t("support.email") }}</label>
          <input
            id="email"
            v-model="email"
            :placeholder="$t('support.email')"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="message">{{ $t("support.message") }}</label>
          <textarea
            id="message"
            v-model="message"
            rows="5"
            :placeholder="$t('support.message')"
            class="form-textarea"
          ></textarea>
        </div>
        <div class="button-group">
          <button class="submit-button" @click="sendEmail">
            {{ $t("support.send") }}
          </button>
        </div>
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
  window.open("https://t.me/JPSimFATHER", "_blank");
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
.fab-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.fab-main {
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.fab-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(66, 153, 225, 0.4);
}

.fab-menu {
  position: absolute;
  bottom: 70px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fab-item {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background-color: white;
  color: #4299e1;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.fab-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #f7fafc;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.overlay-content {
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  animation: scaleIn 0.3s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.overlay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.overlay-header h3 {
  margin: 0;
  font-size: 20px;
  color: #2d3748;
  font-weight: 600;
}

.close-icon {
  background: none;
  border: none;
  color: #718096;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-icon:hover {
  background-color: #f7fafc;
  color: #2d3748;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
  font-size: 14px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #2d3748;
  transition: all 0.3s ease;
  background-color: #f8fafc;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  background-color: white;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.button-group {
  margin-top: 24px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.2);
}

.submit-button:active {
  transform: translateY(0);
}

@media (max-width: 1366px) {
  .fab-main {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }

  .fab-item {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

@media (max-width: 640px) {
  .overlay-content {
    padding: 20px;
    width: 95%;
  }

  .overlay-header h3 {
    font-size: 18px;
  }
}
</style>
