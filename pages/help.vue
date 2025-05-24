<template>
  <div class="help-container">
    <!-- Social Media Section -->
    <div class="social-section">
      <h2>{{ t('social.connect_title') }}</h2>
      <div class="social-cards">
        <div class="social-card facebook-page">
          <i class="pi pi-facebook"></i>
          <h3>{{ t('social.facebook_page') }}</h3>
          <p>{{ t('social.facebook_page_desc') }}</p>
          <a href="https://www.facebook.com/profile.php?id=61576830833933" target="_blank" class="social-button">
            {{ t('social.visit_now') }}
          </a>
        </div>

        <div class="social-card facebook-group">
          <i class="pi pi-facebook"></i>
          <h3>{{ t('social.facebook_group') }}</h3>
          <p>{{ t('social.facebook_group_desc') }}</p>
          <a href="https://www.facebook.com/groups/1097334865571536" target="_blank" class="social-button">
            {{ t('social.join_now') }}
          </a>
        </div>

        <div class="social-card telegram">
          <i class="pi pi-telegram"></i>
          <h3>{{ t('social.telegram_channel') }}</h3>
          <p>{{ t('social.telegram_channel_desc') }}</p>
          <a href="https://t.me/JPtelecom1" target="_blank" class="social-button">
            {{ t('social.join_channel') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 30px;
}

.social-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 36px 28px 32px 28px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 80, 180, 0.10), 0 1.5px 6px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s cubic-bezier(.4, 2, .6, 1), box-shadow 0.25s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 16px 40px rgba(0, 80, 180, 0.13), 0 2px 8px rgba(0, 0, 0, 0.06);
}

.social-card i {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.7rem;
  width: 64px;
  height: 64px;
  margin: 0 auto 22px auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #e3f0ff 0%, #f0f7ff 100%);
  box-shadow: 0 2px 8px rgba(0, 80, 180, 0.08);
}

.social-card.facebook-page i,
.social-card.facebook-group i {
  color: #1877f2;
  background: linear-gradient(135deg, #e3f0ff 0%, #dbeafe 100%);
}

.social-card.telegram i {
  color: #0088cc;
  background: linear-gradient(135deg, #e0f7fa 0%, #e3f0ff 100%);
}

.social-card h3 {
  font-size: 1.45rem;
  margin-bottom: 13px;
  color: #222;
  font-weight: 700;
}

.social-card p {
  color: #5a6a85;
  margin-bottom: 22px;
  font-size: 1.08rem;
}

.social-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: linear-gradient(90deg, #00aeff 0%, #1877f2 100%);
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(0, 174, 255, 0.10);
  border: none;
  transition: background 0.25s, box-shadow 0.25s, transform 0.18s;
  max-width: 150px;
  min-width: 90px;
  justify-content: center;
}

.social-button:hover {
  background: linear-gradient(90deg, #1877f2 0%, #00aeff 100%);
  box-shadow: 0 4px 16px rgba(0, 174, 255, 0.18);
  transform: scale(1.04);
}

.social-button i {
  font-size: 1.05rem;
}

h2 {
  padding: 70px 0px 50px;
  text-align: center;
  font-weight: 700;
  font-size: 44px;
  line-height: 53px;
}

@media (max-width: 700px) {
  .social-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .help-container {
    padding: 8px;
  }

  h2 {
    font-size: 2rem;
    padding: 40px 0 30px;
  }

  .social-card {
    padding: 22px 10px 20px 10px;
  }
}
</style>
