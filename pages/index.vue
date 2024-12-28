<template>
  <div class="landing-page">
    <h1 class="title">Receive SMS Online to Virtual Phone Number</h1>
    <p class="subtitle">
      For private registration on various sites, services, and apps
    </p>
    <ul class="unordered-list">
      <li>90 countries and more than 1 million numbers</li>
      <li>Short and long-term number rental</li>
      <li>New phone numbers added daily</li>
    </ul>
    <div class="actions">
      <a href="/auth/register?redirect=/v2/numbers/" class="btn primary"
        >Get Access</a
      >
      <a href="/#try" class="btn ghost">Try it for Free</a>
    </div>

    <h2 class="timeline-title">How It All Works</h2>
    <p class="timeline-subtitle">Three easy steps to receive SMS messages</p>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-content">
          <h3>01</h3>
          <p>Order a phone number in your personal account</p>
          <p>
            For example, if you want to create a second mail on Gmail, then go
            to the cabinet, select the country, and then the Google site.
          </p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <h3>02</h3>
          <p>Use it to receive SMS</p>
          <p>
            Copy the issued number and paste it into the Google registration
            form to receive SMS with the registration code.
          </p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <h3>03</h3>
          <p>Receive SMS from sites</p>
          <p>
            After receiving an SMS message, you just need to copy the
            confirmation code and use it to complete the activation of your
            account.
          </p>
        </div>
      </div>
    </div>

    <div class="index-faq g-container">
      <h2 id="faq" class="title">Frequently Asked Questions</h2>
      <div class="faq-list">
        <article class="faq-item" @click="toggle(0)">
          <header>
            <span
              >How does the service for receiving SMS messages to virtual
              numbers operate?</span
            >
            <i class="icon"></i>
          </header>
          <div class="body" :class="{ active: activeIndex === 0 }">
            <div class="content">
              <p>
                We have our own equipment that holds the SIM cards and our own
                software that we use to provide mobile numbers to customers to
                receive messages. When a customer sends a message to an acquired
                mobile number, it comes to the SIM card. Our software transmits
                it in the interface of our service.
              </p>
            </div>
          </div>
        </article>

        <article class="faq-item" @click="toggle(1)">
          <header>
            <span>What is a virtual number?</span>
            <i class="icon"></i>
          </header>
          <div class="body" :class="{ active: activeIndex === 1 }">
            <div class="content">
              <p>
                This is an online mobile number that can be used without a SIM
                card. In our case, it is a mobile number that only belongs to
                our service for activation using text messages and can only
                accept incoming messages.
              </p>
            </div>
          </div>
        </article>

        <article class="faq-item" @click="toggle(2)">
          <header>
            <span>Where can I use my virtual mobile numbers?</span>
            <i class="icon"></i>
          </header>
          <div class="body" :class="{ active: activeIndex === 2 }">
            <div class="content">
              <p>
                Normally, using such mobile numbers for receiving text messages
                is used to register in social networks (VK, OK, Facebook,
                Instagram), confirm messengers (Telegram, WhatsApp, Viber,
                WeChat), and emails (Yandex, Mail.ru, Gmail, Yahoo).
              </p>
            </div>
          </div>
        </article>

        <!-- Add more FAQ items here following the same structure -->
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "landing",
});

import { ref } from "vue";

const activeIndex = ref(-1);

function toggle(index) {
  activeIndex.value = activeIndex.value === index ? -1 : index;
}
</script>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: auto;
  color: #333;
  margin-bottom: 60px;
}

.title {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.5em;
  margin: 20px 0;
}

.unordered-list {
  list-style-type: none;
  padding: 0;
}

.unordered-list li {
  margin: 5px 0;
}

.actions {
  margin-top: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  text-decoration: none;
  border-radius: 5px;
  color: #fff;
}

.primary {
  background-color: #007bff;
}

.ghost {
  background-color: transparent;
  border: 2px solid #007bff;
  color: #007bff;
}

.timeline-title {
  margin-top: 40px;
  font-size: 2em;
}

.timeline-subtitle {
  margin: 10px 0 20px;
  font-size: 1.2em;
}

.timeline {
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 95%;
}

.timeline-item {
  padding: 20px;
  border-left: 4px solid #007bff;
  margin-bottom: 20px;
  position: relative;
}

.timeline-content {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  text-align: left;
}

.timeline-item h3 {
  margin: 0;
  font-size: 1.5em;
}

.timeline-item p {
  margin: 5px 0;
}

.index-faq {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 2em;
  text-align: center;
  margin-bottom: 20px;
}

.faq-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.faq-item {
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid #e5eaf4;
  border-radius: 8px;
  box-shadow: 0 6px 10px #00000008;
  cursor: pointer;
  transition: 0.3s;
}

header {
  padding: 15px;
  background: #f7f7f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header span {
  font-weight: bold;
}

.body {
  display: none;
  padding: 15px;
}

.body.active {
  display: block;
}

.content {
  display: block;
}

.content p {
  text-align: left;
  color: dimgrey;
}
</style>
