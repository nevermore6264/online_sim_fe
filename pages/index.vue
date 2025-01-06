<template>
  <div class="landing-page">
    <div class="flex-container landing-page-container">
      <!-- Main DataTable -->
      <div class="table-container table-services">
        <DataTable
          :value="groupedCustomers"
          scrollable
          scrollHeight="400px"
          dataKey="code"
          :loading="loading"
        >
          <template #header>
            <div class="lbl_services">Select countries</div>
          </template>
          <template #empty> No countries found. </template>
          <!-- <template #loading> Loading customers data. Please wait. </template> -->

          <Column
            header="Country"
            filterField="country.name"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              <div class="country-row">
                <div
                  v-for="country in data"
                  :key="country.code"
                  class="country-item"
                  @click="onCountryClick(country)"
                >
                  <img
                    :src="country.flagImage"
                    :alt="country.name"
                    class="flag-image"
                  />
                  <span class="country-name">{{ country.name }}</span>
                </div>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Sub DataTable for services -->
      <div class="table-container table-services">
        <DataTable
          :value="selectedCustomer?.services"
          scrollable
          scrollHeight="200px"
          dataKey="id"
          :loading="loading"
        >
          <template #header>
            <div class="lbl_services">Select Services</div>
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
import { GetAllCountries } from "@/services/country.js"; // Adjust the path as necessary

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

// Fetch countries function using GetAllCountries
const fetchCountries = async () => {
  try {
    const countries = await GetAllCountries(); // Call your service function
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

const groupedCustomers = computed(() => {
  const groups = [];
  for (let i = 0; i < filteredCustomers.value.length; i += 2) {
    groups.push(filteredCustomers.value.slice(i, i + 2));
  }
  return groups;
});

const onCountryClick = (country) => {
  console.log(country);
  selectedCustomer.value = country;

  if (country?.code) {
    try {
      const countryCode = country.code;
      axios
        .get(
          `https://verifysms.org/api/services?platform=web&countryCode=${countryCode}`
        )
        .then((response) => {
          if (response?.data?.success) {
            selectedCustomer.value.services = response.data.data;
          } else {
            console.error("Failed to fetch services");
          }
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
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

<style>
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

.table-container {
  flex: 1;
  /* Make tables take equal width */
  min-width: 300px;
  /* Optional: Ensure tables don't get too narrow */
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
  text-align: left;
  font-size: 14px;
  margin-bottom: 10px;
}

.table-services {
  margin-top: 20px;
}

.table-services .p-datatable-header {
  margin-bottom: -15px !important;
  min-width: 135px !important;
  width: max-content !important;
  max-width: 60% !important;
  padding: 0px 15px !important;
  height: 45px !important;
  border-radius: 15px 15px 0 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: rgb(0, 174, 255);
  color: #ffffff;
}

.country-row {
  display: flex;
  justify-content: space-between;
}

.country-item {
  display: flex;
  align-items: center;
  cursor: pointer; /* Thêm hiệu ứng trỏ chuột */
  padding: 8px;
  transition: background-color 0.3s;
  width: 49%;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
}

.country-item:hover {
  background-color: rgb(201, 200, 200);
}

.flag-image {
  width: 24px;
  height: auto;
  margin-right: 8px;
}

.country-name {
  font-size: 14px;
}

.landing-page .p-datatable-thead {
  display: none;
}
</style>
