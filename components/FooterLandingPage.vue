<template>
  <footer class="main-footer">
    <div class="container">
      <!-- Dòng chính chứa nội dung và logo -->
      <div class="footer-content">
        <!-- Thông tin công ty -->
        <div class="footer-text-box">
          <p class="footer-text">
            Musashino, Tokyo | Registration code: 180-0006 |
            <nuxt-link to="/">Public Offer, Terms and Policy</nuxt-link>
          </p>
          <p class="footer-address">3-chōme-15 Nakachō</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Không cần thêm logic trong script nếu chỉ hiển thị giao diện tĩnh
</script>

<style scoped>
.main-footer {
  position: relative;
  padding: 20px 0;
  background: linear-gradient(to right, #d7f2fe, #ffffff);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Căn thông tin và logo ra hai bên */
}

.footer-text {
  color: rgb(99, 99, 99);
  margin: 5px 0;
  font-size: 14px;
  line-height: 18px;
}

.footer-address {
  color: rgb(99, 99, 99);
  margin: 5px 0;
  font-size: 12px;
  line-height: 14px;
}
</style>
