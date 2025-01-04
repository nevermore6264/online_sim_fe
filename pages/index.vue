<template>
  <div class="landing-page">
    <h3 class="title">Receive SMS Online to Virtual Phone Number</h3>
    <p class="subtitle">
      For private registration on various sites, services, and apps
    </p>

    <!-- Flex container to hold two tables on the same row -->
    <div class="flex-container landing-page-container">
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
  </div>
</template>

<script setup>
definePageMeta({
  layout: "landing",
});

import { ref, onMounted, computed } from "vue";
import axios from "axios";
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
        `https://verifysms.org/api/services?platform=web&countryCode=${countryCode}`
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
.landing-page-container {
  
}

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

.lbl_services {
  margin-top: 20px !important;
}
</style>
