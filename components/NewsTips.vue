<template>
  <div class="news_tips_block ml-40-d">
    <div class="hNews-card__container">
      <div class="hNews-card_left">
        <h3>Tips VerifySMS.com</h3>
        <p>
          We write about account registration, the intricacies of working with
          proxies, and other important topics.
        </p>
        <div class="hNews-card__img">
          <i class="pi pi-file-text" style="font-size: 120px"></i>
          <!-- Prime Icon for Blog -->
        </div>
        <nuxt-link class="hNews-card__btnImg" to="/blog">
          <i class="pi pi-arrow-right" style="font-size: 24px"></i>
        </nuxt-link>
      </div>
      <div class="hNews-card__right">
        <div class="lastnews_box">
          <h4>News</h4>
          <div class="hNews-card__img">
            <i class="pi pi-newspaper" style="font-size: 100px"></i>
            <!-- Prime Icon for News -->
          </div>
          <nuxt-link class="hNews-card__btnImg">
            <i class="pi pi-arrow-right" style="font-size: 24px"></i>
          </nuxt-link>
        </div>
        <div class="telegram_box">
          <h4>@smspva_news_official</h4>
          <div class="telegram_box__img">
            <i class="pi pi-telegram" style="font-size: 90px"></i>
            <!-- Prime Icon for Telegram -->
          </div>
          <a href="https://t.me/smspva_news_official">
            <i class="pi pi-arrow-right" style="font-size: 24px"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="info_block">
      <div class="row">
        By logging in to the service, you agree with the
        <a href="/img/pdf/terms.pdf">Terms</a> and the
        <a href="/img/pdf/privacy_policy.pdf">Privacy Policy</a>.
      </div>
      <div class="row">
        We do not store numbers longer than 24 hours. If you need to receive SMS
        for a long time, use <a href="/arenda.html">Rent numbers</a>.
      </div>
      <div class="row">
        Our official telegram channel
        <a href="https://t.me/smspva_news_official">@smspva_news_official</a>
        where you will be the first to know about price changes and news.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsTips",
};
</script>

<style scoped>
.news_tips_block {
  margin: 0 auto;
  width: 95%;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  background-color: #ffffff;
}

.hNews-card__container {
  display: flex;
  justify-content: space-between;
}

.hNews-card_left{
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

.info_block {
  margin-top: 1rem;
  /* Space above info block */
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
</style>
