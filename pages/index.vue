<template>
  <div class="landing-page">
    <div class="flex-container landing-page-container">
      <!-- Main DataTable -->
      <div class="table-container table-services">
        <input
          v-model="searchCountry"
          placeholder="Search country"
          class="search-input"
        />
        <DataTable
          :value="filteredCountries"
          scrollable
          scrollHeight="400px"
          dataKey="code"
          :loading="loading"
        >
          <template #header>
            <div class="lbl_services">Select country</div>
          </template>
          <template #empty> No countries found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column style="min-width: 12rem">
            <template #body="{ data }">
              <div class="country-row">
                <div
                  :key="data.code"
                  class="country-item"
                  @click="onCountryClick(data)"
                >
                  <img
                    :src="data.flagImage"
                    :alt="data.name"
                    class="flag-image"
                  />
                  <span class="country-name">{{ data.name }}</span>
                </div>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Sub DataTable for services -->
      <div class="table-container table-services">
        <input
          v-model="searchService"
          placeholder="Search service"
          class="search-input"
        />
        <DataTable
          :value="filteredServices"
          scrollable
          scrollHeight="400px"
          dataKey="id"
          :loading="loading"
        >
          <template #header>
            <div class="lbl_services">Select service</div>
          </template>
          <template #empty> No data found. </template>
          <template #loading> Loading services data. Please wait. </template>

          <Column style="min-width: 12rem">
            <template #body="{data}">
              <div class="service-row">
                <div
                  :key="data.id"
                  class="service-item"
                  @click="onServiceClick(data)"
                >
                  <img
                    :src="data.image"
                    :alt="data.text"
                    class="flag-image"
                  />
                  <span class="service-name">{{ data.text }}</span>
                  <span class="service-price"
                    >from {{ data.price }} USDT</span
                  >
                </div>
              </div>
            </template>
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
import { useWindowSize } from "@vueuse/core";
import axios from "axios";
import { GetAllCountries } from "@/services/country.js";

const customers = ref([]);
const loading = ref(false);
const selectedCustomer = ref(null);

// Theo dõi kích thước màn hình
const { width } = useWindowSize();

// Tìm kiếm
const searchCountry = ref("");
const searchService = ref("");

// Lọc danh sách quốc gia theo tìm kiếm
const filteredCountries = computed(() => {
  if (!searchCountry.value.trim()) return customers.value;
  return customers.value.map((group) =>
    group.filter((country) =>
      country.name.toLowerCase().includes(searchCountry.value.toLowerCase())
    )
  );
});

// Lọc danh sách dịch vụ theo tìm kiếm
const filteredServices = computed(() => {
  if (!searchService.value.trim())
    return selectedCustomer.value?.services || [];
  return selectedCustomer.value?.services.filter((service) =>
    service.text.toLowerCase().includes(searchService.value.toLowerCase())
  );
});

const onCountryClick = (country) => {
  selectedCustomer.value = country;

  if (country?.code) {
    axios
      .get(
        `https://verifysms.org/api/services?platform=web&countryCode=${country.code}`
      )
      .then((response) => {
        if (response?.data?.success) {
          selectedCustomer.value.services = response?.data?.data;
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }
};

const initializeData = async () => {
  loading.value = true;
  const countries = await GetAllCountries();
  customers.value = countries;
  loading.value = false;
};

onMounted(() => {
  initializeData();
});
</script>

<style>
.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
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

.landing-page .p-datatable .p-datatable-tbody > tr > td {
  border: none;
  padding: 5px 5px;
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
  min-width: 300px;
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
  margin-bottom: 14px;
  font-weight: normal;
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
  flex-wrap: wrap;
  gap: 10px;
}

.country-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* Tạo khoảng cách giữa tên và giá */
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.3s;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
}

.country-item:hover {
  background-color: rgb(201, 200, 200);
}

.flag-image {
  width: 24px;
  height: auto;
}

.p-datatable .p-datatable-tbody > tr {
  display: inline-block;
  width: 50%;
}

.landing-page .p-datatable .p-datatable-tbody > tr > td {
  display: block !important;
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

.service-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px; /* Khoảng cách giữa các item */
}

.service-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* Tạo khoảng cách giữa tên và giá */
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.3s;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
}

.service-item:hover {
  background-color: rgb(201, 200, 200);
}

.service-name {
  font-size: 14px;
  font-weight: bold;
  flex: 1; /* Chiếm tối đa không gian còn lại */
  text-align: left; /* Đảm bảo căn trái */
}

.service-price {
  font-size: 12px;
  color: gray;
  text-align: right; /* Căn phải */
  white-space: nowrap; /* Tránh xuống dòng */
}
</style>
