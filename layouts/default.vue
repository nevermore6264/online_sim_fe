<template>
  <div>
    <!-- Hiển thị loading khi đang kiểm tra trạng thái đăng nhập -->
    <div v-if="isLoading" class="loading-container">
      <p class="loading-text">Loading...</p>
    </div>

    <!-- Hiển thị layout dựa vào trạng thái đăng nhập -->
    <div v-else-if="!isAuthenticated">
      <Header />
      <main>
        <slot />
      </main>
      <Footer />
    </div>

    <div v-else>
      <Sidebar />
      <main class="app-content">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

// Trạng thái đăng nhập
const isAuthenticated = ref(false);
const isLoading = ref(true);
const route = useRoute();

watch(
  () => route.path,
  () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      isAuthenticated.value = token !== null;
      isLoading.value = false;
    }
  },
  { immediate: true }
);

// Import các thành phần layout
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Sidebar from "~/components/Sidebar.vue";
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
