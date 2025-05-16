<template>
  <!-- <FraudWarning /> -->
  <LanguageSwitcher />

  <Header />
  <div class="main">
    <div class="container">
      <main class="main-content">
        <NuxtPage />
      </main>
      <div class="side-content">
        <!-- Hiển thị các thành phần chỉ khi đã login -->
        <ClientsBlock v-if="!isLoggedIn" />
        <GuideBlock v-if="!isLoggedIn" />
        <FeaturesBlock v-if="!isLoggedIn" />
        <ContinueBlock v-if="!isLoggedIn" />
        <NewsTips />
        <NewsContent />
        <TipsBlock />
      </div>
    </div>
    <!-- Thêm component Support vào đây -->
    <Support />
    <FooterLandingPage />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import NewsContent from "@/components/Home/NewsContent.vue";

const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  const userInfo = localStorage.getItem("userInfo");
  isLoggedIn.value = !!userInfo; // Đã login nếu userInfo không rỗng
};

onMounted(() => {
  checkLoginStatus();

  window.addEventListener("storage", checkLoginStatus);
});

onUnmounted(() => {
  window.removeEventListener("storage", checkLoginStatus);
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column; /* Make the main container stack on small screens */
  min-height: calc(100vh - 262px);
}

.container {
  display: flex;
  flex: 1;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
}

.main-content {
  padding: 0 20px;
  width: 440px;
}

.side-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

@media (max-width: 1366px) {
  .container {
    flex-direction: column; /* Stack the main content and side content for tablets */
  }

  .main-content {
    min-width: 100%; /* Ensure main content takes full width on tablets */
  }

  .side-content {
    width: 100%; /* Side content takes full width on tablets */
    margin-top: 20px; /* Add margin between side content and main content */
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

  .side-content {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
  }
}

@media (max-width: 480px) {
  .main-content {
    font-size: 14px; /* Adjust font size on very small screens */
  }

  .side-content {
    padding: 10px;
  }
}
</style>
