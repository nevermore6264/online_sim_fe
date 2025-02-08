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
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const faqItems = ref([
  {
    question: t("rent_number.api.general"),
    answer: `
      <pre>
Only GET requests are accepted.
The server always responds in JSON format. If the request was successful, the status field will be 1; otherwise, 0. If status = 0, the error cause will be indicated in the msg field.
Most requests require the user's API key to be specified.
      </pre>
    `,
    open: false,
  },
  {
    question: "List of available countries",
    answer: `
      <h4>Request</h4>
      <pre>https://smspva.com/api/rent.php?method=getcountries</pre>
      <h4>Response</h4>
      <pre>{
  "status": 1,
  "data": [
    {
      "name": "Россия", // country name
      "code": "RU"      // country code
    }
  ]
}</pre>
    `,
    open: false,
  },
  {
    question: "List of available services: count, price, etc.",
    answer: `
      <h4>Request</h4>
      <pre>https://smspva.com/api/rent.php?method=getdata&country=RU</pre>
      <h4>Response</h4>
      <pre>{
  "status": 1,
  "data": [
    {
      "name": "Airbnb",   // service name
      "service": "opt46", // service code
      "price_day": 6,     // price per day
      "count": 359        // available count
    }
  ]
}</pre>
    `,
    open: false,
  },
  {
    question: "Rent number",
    answer: `
      <h4>Request</h4>
      <pre>https://smspva.com/api/rent.php?method=create&apikey=yourapikeyhere&dtype=week&dcount=1&country=RU&service=opt6</pre>
      <h4>Response</h4>
      <pre>{
  "status": 1,
  "data": {
    "id": 40370,             // ID of order
    "pnumber": "9096037108", // phone number without country code
    "ccode": "+7",           // digital country code
    "service": "opt6",       // service code
    "until": 1587633960      // UNIX timestamp of expire date
  }
}</pre>
    `,
    open: false,
  },
  {
    question: "Add another service to order",
    answer: `
      <h4>Request</h4>
      <pre>https://smspva.com/api/rent.php?method=orders&apikey=yourapikeyhere</pre>
      <h4>Response</h4>
      <pre>{
  "status": 1,
  "data": [
    {
      "id": 40300,              // ID of order
      "scode": "opt16",         // service code
      "sname": "Instagram",     // service name
      "state": 0,               // state of number
      "pnumber": "9096068511",  // phone number without country code
      "ccode": "+7",            // digital country code
      "cname": "RU",            // country code
      "hasnewsms": false,       // flag of new SMS
      "until": 1587552240,      // UNIX timestamp of expire date
      "canprolong": true,       // flag of availability of prolongation
      "canprolongmax": 162,     // max days for prolongation
      "canprolonguntil": 1634883780 // Unix timestamp for max prolongation
    }
  ]
}</pre>
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
  margin-top: 1rem;
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

.faq-content {
  padding: 1rem;
  background-color: rgb(245, 245, 245);
  border-top: 1px solid #ddd;
  font-size: 0.95rem;
  color: #555;
}

.faq-content pre {
  background-color: #f5f5f5;
  padding: 10px;
  overflow-x: auto;
  border-radius: 5px;
}
</style>
