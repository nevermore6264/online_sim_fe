<template>
  <!-- <FraudWarning /> -->
  <!-- <Weather /> -->
  <LanguageSwitcher />
  <Header />
  <div class="main">
    <div class="container">
      <main class="main-content">
        <NuxtPage />
      </main>
    </div>
  </div>
  <Support />
  <FooterLandingPage />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Weather from "@/components/Weather.vue";
import { socket } from "@/utils/socket";
import { push } from "notivue";
const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  const userInfo = localStorage.getItem("userInfo");
  isLoggedIn.value = !!userInfo; // Đã login nếu userInfo không rỗng
};

onMounted(() => {
  checkLoginStatus();
  window.addEventListener("storage", checkLoginStatus);

  // Lắng nghe sự kiện nạp tiền thành công
  socket.on("NewDeposit", (data) => {
    push.success(
      `Nạp tiền thành công!\nSố tiền: ${data.amount} ${data.currency}\n${
        data.description || ""
      }`
    );
  });
});

onUnmounted(() => {
  window.removeEventListener("storage", checkLoginStatus);
  socket.off("NewDeposit");
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column; /* Make the main container stack on small screens */
  min-height: calc(100vh - 262px);
}

.main-content {
  padding: 0 20px;
}

@media (max-width: 1366px) {
  .container {
    flex-direction: column; /* Stack the main content and side content for tablets */
  }

  .main-content {
    min-width: 100%; /* Ensure main content takes full width on tablets */
  }
}

@media (max-width: 768px) {
  .main {
    padding: 10px; /* Add some padding to the main container on mobile */
  }

  .container {
    flex-direction: column; /* Stack the elements vertically */
  }

  .main-content {
    padding: 10px;
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .main-content {
    font-size: 14px; /* Adjust font size on very small screens */
  }
}
</style>
