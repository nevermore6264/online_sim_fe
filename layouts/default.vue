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
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const isAuthenticated = ref(false);
const isLoading = ref(true);
const route = useRoute();

onMounted(() => {
  // Chỉ kiểm tra khi component đã mount
  const token = localStorage.getItem("token");
  isAuthenticated.value = token !== null;
  isLoading.value = false;
});

// Theo dõi thay đổi đường dẫn
watch(
  () => route.path,
  () => {
    // Không cần kiểm tra khi chuyển đổi đường dẫn nếu đã xác định trạng thái
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.loading-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-top: 1rem;
}
</style>
