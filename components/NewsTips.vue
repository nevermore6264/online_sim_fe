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
          <nuxt-link class="hNews-card__btnImg" to="/blog">
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
              <nuxt-link class="hNews-card__btnImg">
                <i class="pi pi-arrow-right"></i>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="telegram_box">
          <h4>{{ $t("landing.telegram_channel") }}</h4>
          <div class="telegram_box__img-btn">
            <img src="/layout/images/tele.svg" alt="Logo" class="logo-image" />
            <nuxt-link class="hNews-card__btnImg">
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
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 1rem;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 8px rgb(227, 227, 227);
}

.hNews-card__container {
  display: flex;
  justify-content: space-between;
}

.hNews-card_left {
  width: 65%;
  min-height: 100%;
  position: relative;
  border-radius: 15px;
}

.hNews-card__right {
  width: 33%;
  min-height: 100%;
  position: relative;
  background-color: #2aabee;
  border-radius: 5px;
}

.hNews-card__btnWrap,
.telegram_box__btnWrap {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.hNews-card__btnWrap img {
  margin-left: 35px;
}

.hNews-card__btnWrap a {
  margin-right: 35px;
}

.hNews-card__btnImg,
.telegram_box__btnWrap a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2aabee;
  color: #ffffff;
  text-decoration: none;
  margin-right: 30px;
}

.hNews-card__right .hNews-card__btnImg,
.telegram_box__btnWrap a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #2aabee;
  text-decoration: none;
  margin-right: 30px;
}

.info_block {
  margin-top: 1rem;
}

.info_block .row {
  color: rgb(56, 56, 56);
  padding: 15px 0;
}

.hNews-card_left p {
  max-width: 80%;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: rgb(110, 120, 130);
  margin-left: 35px;
  margin-top: 15px;
}

.hNews-card_left h3 {
  max-width: 80%;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  margin-left: 35px;
  margin-top: 37px;
}

.hNews-card__right h4 {
  font-weight: 700;
  font-size: 16px;
  line-height: 31px;
  color: #ffffff;
  margin: 20px;
}

.telegram_box__img {
  width: 30%;
  height: 90px;
  color: #ffffff;
}

.hNews-card__img-btn {
  display: flex; /* Dùng Flexbox để sắp xếp hàng ngang */
  justify-content: space-between; /* Đẩy các phần tử ra hai đầu */
  width: 100%; /* Đảm bảo chiếm toàn bộ chiều rộng */
  margin-left: 15px;
}

.hNews-card__img {
  flex-shrink: 0; /* Ngăn không để ảnh bị co lại */
}

.hNews-card__btnImg {
  flex-shrink: 0; /* Ngăn không để icon bị co lại */
}

.telegram_box__img-btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 15px;
}

.hNews-card__img {
  margin-right: 10px; /* Khoảng cách giữa biểu tượng và nút */
}
</style>
