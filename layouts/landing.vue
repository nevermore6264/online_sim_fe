<template>
  <div>
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isAuthenticated = ref(false);
const isLoading = ref(true);

onMounted(() => {
  const token = localStorage.getItem("token");
  isAuthenticated.value = token !== null;
  isLoading.value = false;
});
</script>

<style scoped></style>
