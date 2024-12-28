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

    <h2>Buy OTP Service</h2>

    <!-- Search Input for countries -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a country..."
        class="search-input"
      />
    </div>

    <!-- Flex container to hold two tables on the same row -->
    <div class="flex-container">
      <!-- Main DataTable -->
      <div class="table-container">
        <DataTable
          :value="filteredCustomers"
          scrollable
          scrollHeight="400px"
          dataKey="id"
          :loading="loading"
          @row-click="onRowClick"
        >
          <template #header>
            <div class="flex justify-content-end">
              <!-- Không cần thêm ô tìm kiếm tại header nữa -->
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>

          <Column
            header="Country"
            filterField="country.name"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              <div class="flex align-items-center row-content">
                <img
                  alt="flag"
                  :src="`https://flagsapi.com/${data.country.code}/flat/64.png`"
                  :class="`flag flag-${data.country.code}`"
                  style="width: 24px"
                />
                <span class="country">{{ data.country.name }}</span>
                <span class="dialCode" v-if="data.country.dialCode">
                  ({{ data.country.dialCode }})
                </span>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Sub DataTable for services -->
      <div class="table-container">
        <DataTable
          :value="selectedCustomer?.services"
          scrollable
          scrollHeight="200px"
          dataKey="id"
          :loading="loading"
        >
          <template #header>
            <h4 class="lbl_services">
              Services for {{ selectedCustomer?.country?.name }}
            </h4>
          </template>
          <template #empty> No services found. </template>
          <template #loading> Loading services data. Please wait. </template>

          <Column header="Service" field="text" style="min-width: 12rem" />
          <Column header="Code" field="code" style="min-width: 12rem" />
          <Column header="Price" style="min-width: 12rem">
            <template #body="{ data }"> {{ data?.price }} USD </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <h2 class="timeline-title">How It All Works</h2>
    <p class="timeline-subtitle">Three easy steps to receive SMS messages</p>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-content">
          <h3>01</h3>
          <h4>Order a phone number in your personal account</h4>
          <p>
            For example, if you want to create a second mail on Gmail, then go
            to the cabinet, select the country, and then the Google site.
          </p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <h3>02</h3>
          <h4>Use it to receive SMS</h4>
          <p>
            Copy the issued number and paste it into the Google registration
            form to receive SMS with the registration code.
          </p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <h3>03</h3>
          <h4>Receive SMS from sites</h4>
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

        <article class="faq-item" @click="toggle(3)">
          <header>
            <span
              >Will I be given a SIM card with a virtual number linked to
              it?</span
            >
            <i class="icon"></i>
          </header>
          <div class="body" :class="{ active: activeIndex === 3 }">
            <div class="content">
              <p>
                Our service is designed so that you do not have to use a SIM
                card yourself. You just use the mobile number that you have
                acquired online without a SIM card.
              </p>
            </div>
          </div>
        </article>

        <article class="faq-item" @click="toggle(4)">
          <header>
            <span>Will someone access my number when I stop renting it?</span>
            <i class="icon"></i>
          </header>
          <div class="body" :class="{ active: activeIndex === 4 }">
            <div class="content">
              <p>
                The numbers that are purchased through our service are
                disposable and cannot be reused by our clients after the order
                time has expired.
              </p>
            </div>
          </div>
        </article>

        <article class="faq-item" @click="toggle(5)">
          <header>
            <span
              >What is a short-rent mobile number (to receive messages from one
              website)?</span
            >
            <i class="icon"></i>
          </header>
          <div class="body" :class="{ active: activeIndex === 5 }">
            <div class="content">
              <p>
                If you select this tariff, you get a virtual number for a short
                time from 10 minutes to 1 hour. The exact time depends on the
                selected country.
              </p>
            </div>
          </div>
        </article>

        <article class="faq-item" @click="toggle(6)">
          <header>
            <span>What happens if I cannot receive SMS?</span>
            <i class="icon"></i>
          </header>
          <div class="body" :class="{ active: activeIndex === 6 }">
            <div class="content">
              <p>
                If a message does not arrive at the temporary number you
                ordered, you can close the phone number and order another; money
                from your balance will not be debited.
              </p>
            </div>
          </div>
        </article>

        <article class="faq-item" @click="toggle(7)">
          <header>
            <span
              >Can I test your service for receiving messages for online
              activation?</span
            >
            <i class="icon"></i>
          </header>
          <div class="body" :class="{ active: activeIndex === 7 }">
            <div class="content">
              <p>
                Sure. We have a special module with temporary free numbers for
                one-time text message reception available on this webpage.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "landing",
});

import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const customers = ref([]);
const loading = ref(false);
const selectedCustomer = ref(null);
const searchQuery = ref("");

// Function to filter customers by search query
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value;
  return customers.value.filter((customer) =>
    customer.country.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});

// Fetch countries function
const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data?.map((country) => ({
      id: country.cca2,
      country: {
        name: country.name.common,
        code: country.cca2,
        cca3: country.cca3,
        dialCode:
          country.idd && country.idd.root
            ? country.idd.root +
              (country.idd?.suffixes?.length ? country.idd?.suffixes[0] : "")
            : "N/A",
      },
      services: [],
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

// Initialize data function
const initializeData = async () => {
  loading.value = true;
  const countries = await fetchCountries();
  customers.value = countries;
  loading.value = false;
};

// Row click handler
const onRowClick = async (event) => {
  selectedCustomer.value = event.data;

  if (selectedCustomer.value?.country?.cca3) {
    try {
      const countryCode = selectedCustomer.value.country.cca3;
      const response = await axios.get(
        `https://japansim.net/api/services?platform=web&countryCode=${countryCode}`
      );

      if (response?.data?.success) {
        selectedCustomer.value.services = response.data.data;
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }
};

onMounted(() => {
  initializeData();
});

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
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.body.active {
  max-height: 200px; /* Adjust based on your content size */
  padding: 15px;
}

.content {
  display: block;
}

.content p {
  text-align: left;
  color: dimgrey;
}

.table-container {
  flex: 1; /* Make tables take equal width */
  min-width: 300px; /* Optional: Ensure tables don't get too narrow */
}

.row-content {
  display: flex;
  align-items: center;
  margin: auto 0;
}

.row-content .country {
  margin-left: 15px;
}

.row-content .dialCode {
  margin-left: 15px;
  color: #859398;
}

/* Style for search input */
.search-container {
  margin: auto;
}

.search-input {
  width: 500px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.lbl_services {
  margin-top: 20px !important;
}
</style>
