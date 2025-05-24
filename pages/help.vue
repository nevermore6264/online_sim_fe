<template>
  <div class="help-container">
    <!-- Social Media Section -->
    <div class="social-section">
      <h2>Kết nối với chúng tôi</h2>
      <div class="social-cards">
        <div class="social-card facebook-page">
          <i class="pi pi-facebook"></i>
          <h3>Facebook Page</h3>
          <p>Theo dõi chúng tôi trên Facebook</p>
          <a href="https://www.facebook.com/profile.php?id=61576830833933" target="_blank" class="social-button">
            <i class="pi pi-external-link"></i>
            Truy cập ngay
          </a>
        </div>

        <div class="social-card facebook-group">
          <i class="pi pi-facebook"></i>
          <h3>Facebook Group</h3>
          <p>Tham gia cộng đồng của chúng tôi</p>
          <a href="https://www.facebook.com/groups/1097334865571536" target="_blank" class="social-button">
            <i class="pi pi-external-link"></i>
            Tham gia ngay
          </a>
        </div>

        <div class="social-card telegram">
          <i class="pi pi-telegram"></i>
          <h3>Telegram Channel</h3>
          <p>Kết nối qua Telegram</p>
          <a href="https://t.me/JPtelecom1" target="_blank" class="social-button">
            <i class="pi pi-external-link"></i>
            Tham gia kênh
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No setup needed for social media section
</script>

<style scoped>
.help-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.social-section {
  margin-top: 50px;
  padding: 20px;
}

.social-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.social-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.social-card:hover {
  transform: translateY(-5px);
}

.social-card i {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.social-card.facebook-page i {
  color: #1877f2;
}

.social-card.facebook-group i {
  color: #1877f2;
}

.social-card.telegram i {
  color: #0088cc;
}

.social-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.social-card p {
  color: #666;
  margin-bottom: 20px;
}

.social-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #00aeff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.social-button:hover {
  background-color: #0099e6;
}

h2 {
  padding: 70px 0px 50px;
  text-align: center;
  font-weight: 700;
  font-size: 44px;
  line-height: 53px;
}
</style>
