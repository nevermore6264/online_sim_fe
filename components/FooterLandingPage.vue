<template>
  <footer class="main-footer">
    <div class="container">
      <!-- Dòng chính chứa nội dung và logo -->
      <div class="footer-content">
        <!-- Thông tin công ty -->
        <div class="footer-text-box">
          <p class="footer-text">
            Kinelija, UAB | Registration code: 303336386 |
            <nuxt-link to="/public-offer.html"
              >Public Offer, Terms and Policy</nuxt-link
            >
          </p>
          <p class="footer-address">
            Vilniaus r. sav., Dūkštų sen., Vėlybniškių k., Dvaro g. 112,
            LT-14223
          </p>
        </div>

        <!-- Logo thanh toán -->
        <div class="footer-icons-box">
          <img
            src="/layout/images/visa-logo.png"
            alt="Visa logo"
            class="footer-icon"
          />
          <img
            src="/layout/images/mastercard-logo.png"
            alt="MasterCard logo"
            class="footer-icon"
          />
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

.footer-text-box {
  text-align: center; /* Đảm bảo thông tin được căn giữa */
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

.footer-icons-box {
  display: flex;
  gap: 15px; /* Khoảng cách giữa các logo */
}

.footer-icon {
  width: 70px;
  height: 40px;
}
</style>
