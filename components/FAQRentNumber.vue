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
    question: "Why do not receive SMS?",
    answer: `
        First, check that you activated the phone number before sending SMS. We recommend using a private proxy, clearing the cache, and cookies of the browser when creating accounts using numbers.
      `,
    open: false,
  },
  {
    question: "Why is the button for prolongation disabled?",
    answer:
      "You can prolong a number only if there are less than 7 days remaining before the expiration date.",
    open: false,
  },
  {
    question: "What is max period for rent number? ?",
    answer: "Max guarantee period for the rent - 90 days.",
    open: false,
  },
  {
    question: "What to do if I did not manage to renew the number manually?",
    answer: `
        If the rental period has expired and you have not had time to renew the rental, you can restore the rental in the Archive section on the Rental page yourself. Please note that it is not always possible to restore the number, but only if it is technically possible.
      `,
    open: false,
  },
  {
    question: "Why is the number not activated for a long time?",
    answer: `
       After the activation request, your number appears in a certain queue for activation, where there are numbers and other users, so activation of the number may take some time. On average, a phone number is activated in 10-15 minutes, but it can take longer. If the number is not activated for a very long period of time, then you can contact the support team and we will try to resolve the issue.
PHONE NUMBER STAYS ACTIVE FOR 10-30 MINUTES, THEN IS DEACTIVATED
      `,
    open: false,
  },
  {
    question: "Will there be a refund for unused days upon removal",
    answer: `
        We do not refund if you used the number, i.e. received SMS and you had no problems with the number. Refunds are made only when there are unsolvable problems with the number. In most cases, the issue of return is decided individually.
      `,
    open: false,
  },
  {
    question: "Rental reinstatement cost",
    answer: `
        The cost of restoring the rental = the cost of overdue days (without discount) + prepayment from 30 days of rent
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

.faq-content ul li {
  margin-bottom: 0.5rem;
  line-height: 20px;
  font-size: 14px;
  padding: 10px;
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
