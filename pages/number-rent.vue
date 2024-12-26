<template>
  <div class="under-construction">
    <h1>Number Rent</h1>
    <h2>This page is currently under construction.</h2>
    <p>We're working hard to bring you new content. Please check back soon!</p>
    <img src="/layout/images/construction-image.png" alt="Under Construction" />
  </div>
</template>

<script setup>
// You can add any script logic here if needed
</script>

<style scoped>
.under-construction {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh; /* Full viewport height */
  background-color: #f9f9f9;
  color: #333;
}

h2 {
  margin: 20px 0;
}

p {
  max-width: 600px;
  margin: 0 auto;
}

img {
  margin-top: 20px;
  width: 300px; /* Adjust image size as needed */
}
</style>
