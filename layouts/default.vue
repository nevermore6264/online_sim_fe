<template>
  <div>
    <!-- Hiển thị layout dựa vào trạng thái đăng nhập -->
    <div v-if="!isAuthenticated">
      <!-- Landing Page Layout -->
      <Header />
      <main>
        <slot />
        <!-- Nội dung chính của landing page -->
      </main>
      <Footer />
    </div>

    <div v-else>
      <!-- App Layout sau khi login -->
      <Sidebar />
      <main class="app-content">
        <slot />
        <!-- Nội dung chính sau khi đăng nhập -->
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Trạng thái đăng nhập
const isAuthenticated = ref(false); // Cập nhật dựa trên trạng thái user (có thể từ Vuex hoặc Pinia)
const route = useRoute();

// Theo dõi thay đổi đường dẫn để xác định trạng thái auth
watch(
  () => route.path,
  () => {
    if (typeof window !== "undefined") {
      // Thực hiện thao tác với localStorage
      const token = localStorage.getItem("token");

      isAuthenticated.value = token !== null;
    }
  },
  { immediate: true } // Gọi ngay khi khởi tạo
);

// Import các thành phần layout
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Sidebar from "~/components/Sidebar.vue";
</script>

<style scoped>
/* Layout sau khi đăng nhập */
.app-content {
  margin-left: 250px; /* Khoảng cách bên trái cho sidebar */
  padding: 1rem; /* Khoảng cách padding cho nội dung chính */
}
</style>
