<template>
  <div class="faq-container">
    <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
      <h5 @click="toggleItem(index)">
        {{ item.question }}
      </h5>
      <div v-if="item.open" class="faq-content">
        <div v-html="item.answer"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const faqItems = ref([
  {
    question: "For what purposes is it forbidden to use our proxies?",
    answer: `
      <ul>
        <li>Fraud, burglaries, insults, threats, and slander;</li>
        <li>Password selection (brute force), scanning, and port vulnerability checks;</li>
        <li>Creating phishing sites;</li>
        <li>Spam (including on forums, websites, and blogs), or any activity leading to IP blacklists;</li>
        <li>Email spamming;</li>
        <li>Spreading malware (viruses, trojans, etc.);</li>
        <li>Hacking websites or searching for vulnerabilities (e.g., SQL injection);</li>
        <li>Distributing copyrighted materials without permission (e.g., videos, music, software);</li>
        <li>Violating laws of the server's hosting country.</li>
      </ul>
    `,
    open: false,
  },
  {
    question: "What protocols do your proxies support?",
    answer:
      "Our proxies support HTTP, HTTPS, and SOCKS5 protocols. Full details are provided after purchase.",
    open: false,
  },
  {
    question: "Can I get a refund for a proxy?",
    answer:
      "A refund can only be provided if the proxy is not working. If the proxies are technically functional, refunds will not be issued.",
    open: false,
  },
  {
    question: "How to set up a proxy in an Android device?",
    answer: `
      <ol>
        <li>Open your Android's Settings.</li>
        <li>Tap Wi-Fi.</li>
        <li>Tap and hold the Wi-Fi network name.</li>
        <li>Select Modify Network.</li>
        <li>Click Advanced Options.</li>
        <li>Tap Manual.</li>
        <li>Enter the proxy's hostname and port (e.g., 127.0.0.1:10101).</li>
        <li>Tap Save.</li>
      </ol>
    `,
    open: false,
  },
  {
    question: "How to set up a proxy on an iPhone?",
    answer: `
      <ol>
        <li>Open your iPhone settings.</li>
        <li>Tap Wi-Fi.</li>
        <li>Select the info icon next to the Wi-Fi network.</li>
        <li>Scroll to HTTP Proxy and select Configure Proxy.</li>
        <li>Tap Manual and enter the server and port (e.g., us.smartproxy.com:10101).</li>
        <li>Turn on authentication (if needed) and add your username and password.</li>
        <li>Tap back to save your settings.</li>
      </ol>
    `,
    open: false,
  },
  {
    question: "How to set up a proxy in Windows 10?",
    answer: `
      <ol>
        <li>Click the Windows logo and search for "Change proxy settings".</li>
        <li>In the Proxy settings window, scroll to "Manual proxy setup".</li>
        <li>Turn on "Use a proxy server".</li>
        <li>Enter the address and port, then click Save.</li>
      </ol>
    `,
    open: false,
  },
]);

const toggleItem = (index) => {
  faqItems.value[index].open = !faqItems.value[index].open;
};
</script>

<style scoped>
.faq-container {
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  background-color: rgb(0, 174, 255);
  color: #f9f9f9;
}

.faq-item h5 {
  cursor: pointer;
  margin: 10px;
}

.faq-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.faq-title {
  padding: 1rem;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
}

.faq-toggle {
  font-size: 1.5rem;
  color: #888;
  transition: transform 0.3s ease;
}

.faq-content {
  padding: 1rem;
  background-color: rgb(245, 245, 245);
  border-top: 1px solid #ddd;
  font-size: 0.95rem;
  color: #555;
}

.faq-content ul {
  list-style-type: disc;
}

.faq-content ol {
  list-style-type: decimal;
}

.faq-content li {
  margin-bottom: 0.5rem;
  line-height: 20px;
  font-size: 14px;
}

.faq-content p {
  margin: 0;
}

.faq-content a {
  color: #007bff;
  text-decoration: none;
}

.faq-content a:hover {
  text-decoration: underline;
}
</style>
