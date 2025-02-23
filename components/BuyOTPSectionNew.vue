<template>
  <div class="landing-page">
    <div class="flex-container landing-page-container">
      <!-- Bên trái: Danh sách quốc gia -->
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
              <div class="b-country-row">
                <div
                  v-for="country in data"
                  :key="country.code"
                  class="country-item"
                  :class="{
                    'selected-country': country.code === selectedCustomer?.code,
                  }"
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

      <!-- Bên phải: Danh sách dịch vụ -->
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
              <div class="b-service-row">
                <div
                  v-for="service in data"
                  :key="service.id"
                  class="service-item"
                  @click="onServiceClick(service)"
                >
                  <img
                    :src="service.image"
                    :alt="service.text"
                    class="flag-image"
                  />
                  <span class="service-name">{{ service.text }}</span>
                  <span class="service-price">
                    {{ $t("landing.service_price", { price: service.price }) }}
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
import serviceService from "@/services/service";
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
  const itemsPerRow = 1;
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
  if (!searchService.value.trim()) return groupedServices?.value || [];
  return groupedServices?.value.filter((service) =>
    service.text.toLowerCase().includes(searchService.value.toLowerCase())
  );
});

// Nhóm các dịch vụ thành các nhóm 3 services mỗi nhóm
const groupedServices = computed(() => {
  const itemsPerRow = width.value < 480 ? 1 : width.value < 768 ? 2 : 3;
  const groups = [];
  for (
    let i = 0;
    i < selectedCustomer.value?.services.length;
    i += itemsPerRow
  ) {
    groups.push(selectedCustomer.value?.services.slice(i, i + itemsPerRow));
  }
  return groups;
});

const onCountryClick = async (country) => {
  selectedCustomer.value = country;

  if (country?.code) {
    try {
      const response = await serviceService.GetServicesByCountryCode(
        country.code
      );
      if (response?.success) {
        selectedCustomer.value.services = response?.data;
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      selectedCustomer.value.services = [];
    }
  }
};

selectedCustomer.value = {
  name: "Japan",
  code: "JPN",
  icon: "🇯🇵",
  flagImage: "https://flagsapi.com/JP/flat/64.png",
  services: [],
};

// Gọi để load dịch vụ của Japan
onCountryClick(selectedCustomer.value);

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
.landing-page-container {
  display: flex;
  gap: 20px;
  width: 100%;
  margin: 0 auto;
}

.table-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Bên trái (30%) */
.table-container:first-child {
  flex: 3;
}

/* Bên phải (70%) */
.table-container:last-child {
  flex: 7;
}

@media (max-width: 768px) {
  .landing-page-container {
    flex-direction: column;
  }

  .table-container:first-child,
  .table-container:last-child {
    flex: 1;
  }
}

.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 20px;
}

.landing-page {
  margin-bottom: 0 !important;
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
  justify-content: space-between;
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

.b-country-row {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  grid-auto-flow: dense;
}

.b-service-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-flow: dense;
}

.service-price {
  font-size: 12px;
  color: gray;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .b-service-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .b-service-row {
    grid-template-columns: 1fr;
  }
}

.selected-country {
  background-color: rgb(0, 174, 255) !important;
  color: white;
  font-weight: bold;
}

.service-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.service-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  text-align: center;
}

.service-item:hover {
  background-color: rgb(201, 200, 200);
}

.service-name {
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
}

.service-price {
  font-size: 12px;
  color: gray;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .service-group {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .service-group {
    grid-template-columns: 1fr;
  }
}
</style>
