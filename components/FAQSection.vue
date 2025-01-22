<template>
  <div class="faq-container">
    <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
      <h5 @click="toggleItem(index)">
        {{ $t(item.question) }}
      </h5>
      <div v-if="item.open" class="faq-content">
        <div v-html="$t(item.answer)"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const faqItems = ref([
  {
    question: "faq.question1",
    answer: "faq.answer1",
    open: false,
  },
  {
    question: "faq.question2",
    answer: "faq.answer2",
    open: false,
  },
  {
    question: "faq.question3",
    answer: "faq.answer3",
    open: false,
  },
  {
    question: "faq.question4",
    answer: "faq.answer4",
    open: false,
  },
  {
    question: "faq.question5",
    answer: "faq.answer5",
    open: false,
  },
  {
    question: "faq.question6",
    answer: "faq.answer6",
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
