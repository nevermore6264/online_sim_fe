<template>
  <div class="layout">
    <Header />
    <div class="content-container">
      <Sidebar />
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
  height: 100vh;
}
.content-container {
  min-height: 100vh;
}

.header {
  padding: 1rem;
  text-align: center;
}

.main-content {
  padding: 1rem;
  overflow-y: auto;
}

footer {
  margin-top: auto;
}
</style>
