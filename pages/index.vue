<template>
  <div class="landing-page">
    <div class="flex-container landing-page-container">
      <!-- Main DataTable -->
      <div class="table-container table-services">
        <input
          v-model="searchCountry"
          :placeholder="$t('landing.search_country')"
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
            <div class="lbl_services">{{ $t("landing.select_country") }}</div>
          </template>
          <template #empty>{{ $t("landing.no_countries_found") }}</template>
          <template #loading>{{ $t("landing.loading_countries") }}</template>
          <Column style="min-width: 12rem">
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
        <input
          v-model="searchService"
          :placeholder="$t('landing.search_service')"
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
            <div class="lbl_services">{{ $t("landing.select_service") }}</div>
          </template>
          <template #empty>{{ $t("landing.no_services_found") }}</template>
          <template #loading>{{ $t("landing.loading_services") }}</template>

          <Column style="min-width: 12rem">
            <template #body="{ data }">
              <div class="service-row">
                <div
                  :key="data.id"
                  class="service-item"
                  @click="onServiceClick(data)"
                >
                  <img :src="data.image" :alt="data.text" class="flag-image" />
                  <span class="service-name">{{ data.text }}</span>
                  <span class="service-price">
                    {{ $t("landing.service_price", { price: data.price }) }}
                  </span>
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

// Phân nhóm dựa trên kích thước màn hình
const groupedCustomers = computed(() => {
  const itemsPerRow = width.value < 600 ? 1 : 2;
  const groups = [];
  for (let i = 0; i < customers.value.length; i += itemsPerRow) {
    groups.push(customers.value.slice(i, i + itemsPerRow));
  }
  return groups;
});

// Lọc danh sách quốc gia theo tìm kiếm
const filteredCountries = computed(() => {
  if (!searchCountry.value.trim()) return groupedCustomers.value;
  return groupedCustomers.value.map((group) =>
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

.country-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Chia mỗi row thành 2 cột */
  gap: 10px; /* Khoảng cách giữa các ô */
  grid-auto-flow: dense; /* Lấp đầy khoảng trống nếu có */
}

.service-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Chia mỗi row thành 2 cột */
  gap: 10px;
  grid-auto-flow: dense; /* Lấp đầy khoảng trống nếu có */
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

@media (max-width: 599px) {
  .country-row {
    grid-template-columns: 1fr; /* 1 cột trên mobile */
  }
}
</style>
