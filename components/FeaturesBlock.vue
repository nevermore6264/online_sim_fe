<template>
  <div class="features-block">
    <h2>VerifySMS is one of the first websites for selling phone numbers</h2>
    <span style="margin-left: 2px; margin-top: 5px">
      VerifySMS provides the opportunity to use short-term temp phone numbers
      from different countries at fair and affordable prices for receiving SMS
      messages.
    </span>
    <div class="cards-block w-100">
      <div class="card" v-for="(feature, index) in features" :key="index">
        <div class="image">
          <i :class="`pi ${feature.icon}`"></i>
        </div>
        <div class="card-header">{{ feature.header }}</div>
        <div class="card-body">{{ feature.body }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          icon: "pi-verified",
          header: "Account verification",
          body: "Simplify online account verification by getting instant confirmation codes on popular apps or services. Set up SMS gateway QA tests effortlessly.",
        },
        {
          icon: "pi-flag-fill",
          header: "Over 60 countries",
          body: "Get 2nd number from a wide range of countries such as USA, UK, China, Australia, India, Germany, Netherlands, Poland, Spain and many more.",
        },
        {
          icon: "pi-clock",
          header: "Instant number selection",
          body: "In just a few clicks you can get a second number on any popular service and receive an SMS with a verification code almost instantly.",
        },
        {
          icon: "pi-shield",
          header: "Privacy protection",
          body: "To protect your privacy, use our disposable phone numbers instead of your real phone number when registering on websites or in apps.",
        },
        {
          icon: "pi-whatsapp",
          header: "Virtual and Real numbers",
          body: "Our service offers a diverse selection of VOIP numbers and real SIM cards from providers all over the world.",
        },
        {
          icon: "pi-qrcode",
          header: "Compatible API",
          body: "VerifySMS API provides the ability to easily automate your workflow, whether you need one verification or thousands.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.features-block {
  margin: 0 auto;
  width: 95%;
}

.cards-block {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 calc(50% - 20px);
  padding: 20px 20px 30px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 15px;
  margin-bottom: 10px;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 8px rgb(227, 227, 227);
  margin-right: 20px;
  margin-top: 10px;
}

.card i {
  color: rgb(0, 174, 255);
  font-size: 2rem;
}

.card-header {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  padding: 0 10px 0 10px;
  color: rgb(56, 56, 56);
}

.card-body {
  padding: 0 10px 0 10px;
  margin-top: 20px;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  color: rgb(56, 56, 56);
}

.card .image {
  margin-bottom: 30px;
  margin-left: 10px;
}
</style>
