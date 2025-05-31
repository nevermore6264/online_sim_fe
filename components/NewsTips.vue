<template>
  <div class="news_tips_block ml-40-d">
    <div class="hNews-card__container">
      <div class="hNews-card_left">
        <h3>{{ $t("landing.tips_heading") }}</h3>
        <p>{{ $t("landing.tips_paragraph") }}</p>
        <div class="hNews-card__img">
          <i class="pi pi-file-text" style="font-size: 120px"></i>
        </div>
        <div class="hNews-card__btnWrap">
          <img src="/layout/images/blog.svg" alt="Logo" class="logo-image" />
          <nuxt-link class="hNews-card__btnImg" to="/news">
            <i class="pi pi-arrow-right"></i>
          </nuxt-link>
        </div>
      </div>
      <div class="hNews-card__right">
        <div class="lastnews_box">
          <h4>{{ $t("landing.news_heading") }}</h4>
          <div class="hNews-card__img-btnWrap">
            <div class="hNews-card__img-btn">
              <img
                src="/layout/images/news.svg"
                alt="Logo"
                class="logo-image"
              />
              <nuxt-link class="hNews-card__btnImg" to="/news">
                <i class="pi pi-arrow-right"></i>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="telegram_box">
          <h4>{{ $t("landing.telegram_channel") }}</h4>
          <div class="telegram_box__img-btn">
            <img src="/layout/images/tele.svg" alt="Logo" class="logo-image" />
            <nuxt-link class="hNews-card__btnImg" to="/news">
              <i class="pi pi-arrow-right"></i>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="info_block">
      <div class="row">
        {{ $t("landing.terms_agreement") }}
        <a href="/img/pdf/terms.pdf">{{ $t("landing.terms") }}</a>
        {{ $t("landing.and") }}
        <a href="/img/pdf/privacy_policy.pdf">{{
          $t("landing.privacy_policy")
        }}</a
        >.
      </div>
      <div class="row">
        {{ $t("landing.number_storage") }}
        <a href="/arenda.html">{{ $t("landing.rent_numbers") }}</a
        >.
      </div>
      <div class="row">
        {{ $t("landing.telegram_info") }}
        <a href="https://t.me/smspva_news_official">
          {{ $t("landing.telegram_channel") }} </a
        >.
      </div>
    </div>
  </div>
</template>

<style scoped>
.news_tips_block {
  margin: 0 auto;
  width: 95%;
  border: none;
  border-radius: 20px;
  padding: 2rem;
  margin-top: 20px;
  background: rgb(255, 255, 255);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.news_tips_block:hover {
  transform: translateY(-5px);
}

.hNews-card__container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.hNews-card_left {
  width: 65%;
  min-height: 100%;
  position: relative;
  border-radius: 15px;
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
  padding: 2rem;
}

.hNews-card__right {
  width: 33%;
  min-height: 100%;
  position: relative;
  background: linear-gradient(145deg, #2aabee, #1e88c3);
  border-radius: 15px;
  padding: 1.5rem;
}

.hNews-card__btnWrap,
.telegram_box__btnWrap {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
}

.hNews-card__btnWrap img {
  margin-left: 35px;
  transition: transform 0.3s ease;
}

.hNews-card__btnWrap img:hover {
  transform: scale(1.05);
}

.hNews-card__btnImg,
.telegram_box__btnWrap a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #2aabee;
  color: #ffffff;
  text-decoration: none;
  margin-right: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(42, 171, 238, 0.3);
}

.hNews-card__btnImg:hover,
.telegram_box__btnWrap a:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(42, 171, 238, 0.4);
}

.hNews-card__right .hNews-card__btnImg,
.telegram_box__btnWrap a {
  background-color: #ffffff;
  color: #2aabee;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.info_block {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.info_block .row {
  color: rgb(56, 56, 56);
  padding: 12px 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.info_block .row a {
  color: #2aabee;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.info_block .row a:hover {
  color: #1e88c3;
  text-decoration: underline;
}

.hNews-card_left p {
  max-width: 90%;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgb(110, 120, 130);
  margin-left: 35px;
  margin-top: 20px;
}

.hNews-card_left h3 {
  max-width: 90%;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.4;
  margin-left: 35px;
  margin-top: 37px;
  color: #2c3e50;
}

.hNews-card__right h4 {
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.4;
  color: #ffffff;
  margin: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hNews-card__img-btn,
.telegram_box__img-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 15px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.hNews-card__img {
  margin-right: 15px;
  transition: transform 0.3s ease;
}

.hNews-card__img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .hNews-card__container {
    flex-direction: column;
  }

  .hNews-card_left,
  .hNews-card__right {
    width: 100%;
  }

  .hNews-card_left h3,
  .hNews-card_left p {
    margin-left: 0;
  }
}
</style>
