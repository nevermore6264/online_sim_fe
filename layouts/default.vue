<template>
  <div class="layout">
    <Header />
    <div class="content-container">
      <aside class="sidebar">
        <Sidebar />
      </aside>
      <main class="main-content">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Phần chứa sidebar và main content */
.content-container {
  display: flex;
  flex: 1; /* Đẩy Footer xuống đáy */
  overflow: hidden; /* Đảm bảo layout không bị tràn */
}

.header {
  padding: 1rem;
  text-align: center;
}

/* Sidebar */
.sidebar {
  overflow-y: auto; /* Nếu nội dung dài, sẽ cuộn */
}

/* Main content */
.main-content {
  flex: 1; /* Lấy hết không gian còn lại */
  padding: 1rem;
  overflow-y: auto; /* Cuộn nếu nội dung quá dài */
}

footer {
  margin-top: auto;
}
</style>
