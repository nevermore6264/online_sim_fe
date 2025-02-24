<template>
  <div class="landing-page">
    <div class="top-section">
      <!-- Selected Services List -->
      <div class="selected-services" v-if="selectedServices.length > 0">
        <div class="selected-services-list">
          <div
            v-for="(service, index) in selectedServices"
            :key="index"
            class="selected-item"
          >
            <div class="service-info">
              <span class="service-name">{{ $t("landing.service") }}: </span>
              <img
                :src="service?.image"
                alt="Service Image"
                class="w-24 rounded"
                width="24px"
              />
              <span class="service-name">{{ service.text }}</span>
              <span class="service-name">
                {{ $t("landing.country") }}: {{ selectedCustomer.name }}
              </span>
              <span class="service-name"
                >{{ $t("landing.duration") }}: 10 {{ $t("landing.minutes") }}
              </span>
              <span class="service-price">
                {{ $t("landing.total_amount") }}: {{ service.price }} USDT
              </span>
              <Button
                class="remove-icon"
                icon="pi pi-times"
                severity="danger"
                variant="text"
                size="small"
                label=""
                @click="removeService(index)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Buy Button -->
      <div class="buy-section" v-if="selectedServices.length > 0">
        <Button class="buy-button" @click="buySelectedServices">
          {{ $t("landing.buy_otp") }}
        </Button>
        <p class="total-amount">
          {{ $t("landing.total_amount") }}: {{ totalAmount }} USDT
        </p>
      </div>
    </div>

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
                  @click.stop="onCountryClick(country)"
                >
                  <img
                    :src="country.flagImage"
                    :alt="country.name"
                    class="flag-image"
                  />
                  <span class="country-name">{{ country.name }}</span>
                  <button
                    class="select-button"
                    :class="{
                      selected: country.code === selectedCustomer?.code,
                    }"
                  >
                    {{
                      country.code === selectedCustomer?.code
                        ? $t("landing.selected")
                        : $t("landing.select")
                    }}
                  </button>
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
                  :class="{
                    selected: selectedServices.some((s) => s.id === service.id),
                  }"
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
import orderService from "../services/order";

const customers = ref([]);
const loading = ref(false);
const selectedCustomer = ref(null);
const selectedServices = ref([]);

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
  return groupedServices.value.map((group) =>
    group.filter((service) =>
      service.text.toLowerCase().includes(searchService.value.toLowerCase())
    )
  );
});

const removeService = (index) => {
  selectedServices.value.splice(index, 1);
};

// Nhóm các dịch vụ thành các nhóm 3 services mỗi nhóm
const groupedServices = computed(() => {
  const itemsPerRow = width.value < 480 ? 1 : width.value < 768 ? 2 : 3;
  const services = selectedCustomer.value?.services || []; // Fallback to empty array
  const groups = [];
  for (let i = 0; i < services.length; i += itemsPerRow) {
    groups.push(services.slice(i, i + itemsPerRow));
  }
  return groups;
});

const onCountryClick = async (country) => {
  // Xóa danh sách dịch vụ đã chọn
  selectedServices.value = [];

  // Cập nhật quốc gia được chọn
  selectedCustomer.value = {
    ...country,
    services: [], // Khởi tạo danh sách dịch vụ trống
  };

  // Nếu quốc gia có mã code, tải danh sách dịch vụ
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

const loadJapanServices = async () => {
  const japan = {
    name: "Japan",
    code: "JPN",
    icon: "🇯🇵",
    flagImage: "https://flagsapi.com/JP/flat/64.png",
    services: [],
  };

  if (japan.code) {
    try {
      const response = await serviceService.GetServicesByCountryCode(
        japan.code
      );
      if (response?.success) {
        japan.services = response?.data;
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      japan.services = [];
    }
  }

  // Gán dịch vụ của Japan vào selectedCustomer.value
  selectedCustomer.value = japan;
};

const initializeData = async () => {
  loading.value = true;
  const countries = await GetAllCountries();
  customers.value = countries;
  loading.value = false;
};

const onServiceClick = (service) => {
  const index = selectedServices.value.findIndex((s) => s.id === service.id);
  if (index === -1) {
    // Nếu dịch vụ chưa có trong danh sách, thêm vào
    selectedServices.value.push(service);
  } else {
    // Nếu dịch vụ đã có trong danh sách, loại bỏ
    selectedServices.value.splice(index, 1);
  }
};

const totalAmount = computed(() => {
  return selectedServices.value.reduce(
    (total, service) => total + service.price,
    0
  );
});

const buySelectedServices = async () => {
  const token = localStorage.getItem("token");
  if (selectedServices.value.length === 0) return;

  const customer = toRaw(selectedCustomer.value);
  console.log(customer.value);
  if (!customer) return;
  const servicesData = selectedServices.value.map((service) => ({
    serviceCode: service.code.toUpperCase(),
  }));
  console.log(servicesData);

  let successCount = 0;
  let failedServices = [];

  try {
    for (const data of servicesData) {
      const response = await orderService.BuyOTP(token, data);
      if (response.success) {
        successCount++;
      } else {
        failedServices.push(data.serviceCode);
      }
    }

    if (successCount > 0) {
      push.success(`Successfully bought ${successCount} OTP(s)!`);
      window.location.reload();
    }
    if (failedServices.length > 0) {
      push.warning(`Failed to activations for: ${failedServices.join(", ")}`);
    }
  } catch (err) {
    push.error("Error during service purchase!");
  }
};

onMounted(() => {
  initializeData();
  loadJapanServices(); // Load dịch vụ của Japan khi component được mount
});
</script>

<style scoped>
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
  width: 32px;
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
}

@media (max-width: 768px) {
  .b-service-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .landing-page-container {
    flex-direction: column;
  }

  .table-container:first-child,
  .table-container:last-child {
    flex: 1;
  }

  .service-group {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .b-service-row {
    grid-template-columns: 1fr;
  }

  .service-group {
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
}

.select-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto; /* Đẩy nút về phía bên phải */
}

.select-button:hover {
  background-color: #0056b3;
}

.select-button.selected {
  background-color: #ffc107; /* Màu vàng */
  color: #000; /* Màu chữ đen để dễ đọc */
  border: 1px solid #ffc107; /* Viền màu vàng */
}

.top-section {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
}

.service-info {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 2fr 1.5fr 2fr 1fr auto;
  gap: 10px;
  align-items: center;
}

.service-info img {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: fill;
}

.selected-services {
  flex: 7; /* Chiếm 70% */
  border: 1px solid rgb(0, 174, 255);
  border-radius: 8px;
  background: #f9f9f9;
  min-width: 70%;
}

.selected-item {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

.selected-item:last-child {
  border-bottom: none;
}

.selected-item:hover {
  background-color: #e0e0e0;
}

/* Rent button */
.buy-button {
  flex: 3; /* Chiếm 30% */
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  width: 100%;
  min-width: 200px;
}

.buy-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.service-item.selected {
  border: 2px solid #007bff; /* Viền màu xanh */
  background-color: #e6f3ff; /* Màu nền nhạt */
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2); /* Đổ bóng */
}

.remove-icon {
  background: none;
  border: none;
  color: red;
  padding: 0 !important;
  margin: 0 !important;
  min-width: auto !important; /* Đảm bảo nút không có chiều rộng tối thiểu */
}

.remove-icon .p-button-label {
  display: none;
}

@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
  }

  .selected-services,
  .buy-section {
    flex: 1; /* Chiếm toàn bộ chiều rộng trên mobile */
  }

  .buy-section {
    align-items: center;
  }

  .buy-button {
    max-width: 100%;
  }

  .service-info {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 5px !important;
  }
}
</style>
