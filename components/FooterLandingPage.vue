<template>
  <footer class="main-footer">
    <div class="container">
      <!-- Dòng chính chứa nội dung và logo -->
      <div class="footer-content">
        <!-- Thông tin công ty -->
        <div class="footer-text-box">
          <p class="footer-text">
            <a
              href="https://www.google.com/maps/place/3-ch%C5%8Dme-15+Nakach%C5%8D,+Musashino,+Tokyo+180-0006,+Nh%E1%BA%ADt+B%E1%BA%A3n/@35.7081548,139.5656352,17z/data=!3m1!4b1!4m6!3m5!1s0x6018efadae409857:0x9a8c1e82a73deedd!8m2!3d35.7081261!4d139.5657168!16s%2Fg%2F11bw4cwzsk?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              >Musashino, Tokyo | Registration code: 180-0006 |</a
            >
            <nuxt-link to="/">Public Offer, Terms and Policy</nuxt-link>
          </p>
          <p class="footer-address">
            <a
              href="https://www.google.com/maps/place/3-ch%C5%8Dme-15+Nakach%C5%8D,+Musashino,+Tokyo+180-0006,+Nh%E1%BA%ADt+B%E1%BA%A3n/@35.7081548,139.5656352,17z/data=!3m1!4b1!4m6!3m5!1s0x6018efadae409857:0x9a8c1e82a73deedd!8m2!3d35.7081261!4d139.5657168!16s%2Fg%2F11bw4cwzsk?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              3-chōme-15 Nakachō
            </a>
          </p>
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

.footer-text-box {
  text-align: center; /* Đảm bảo thông tin được căn giữa */
}

.footer-text-box a {
  color: rgb(99, 99, 99);
  margin: 5px 0;
  font-size: 12px;
  line-height: 14px;
  text-decoration: none;
}
</style>
