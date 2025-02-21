<template>
  <ul>
    <li>{{ $t("rent_number.always_active") }}</li>
    <li>{{ $t("rent_number.activation_by_order") }}</li>
    <li>{{ $t("rent_number.priority_numbers") }}</li>
  </ul>
  <div class="main-container">
    <!-- Country Selection & Selected Services -->
    <div class="top-section">
      <div class="dropdown-item">
        <label for="country-select">{{
          $t("rent_number.select_country")
        }}</label>
        <Dropdown
          id="country-select"
          :options="dropdownOptions"
          optionLabel="name"
          v-model="selectedCustomer"
          placeholder="Choose a country"
          class="w-full"
          @change="onCountrySelect"
        >
          <!-- Hiển thị trong danh sách dropdown -->
          <template #option="slotProps">
            <div class="flex align-items-center">
              <img
                :alt="slotProps.option.name"
                :src="slotProps.option.flagImage"
                class="mr-2 flag"
                style="width: 18px"
              />
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>

          <!-- Hiển thị khi đã chọn -->
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <img
                :alt="slotProps.value.name"
                :src="slotProps.value.flagImage"
                class="mr-2 flag"
                style="width: 18px"
              />
              <div>{{ slotProps.value.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>

      <div class="dropdown-item">
        <label class="rental-quantity-label" for="rental-quantity-select">
          {{ $t("rent_number.select_rental_period") }}
        </label>
        <div class="rental-selection">
          <Dropdown
            id="rental-quantity-select"
            size="small"
            :options="rentalQuantityOptions"
            optionLabel="label"
            optionValue="value"
            v-model="selectedRentalQuantity"
            :placeholder="$t('rent_number.choose_number')"
            class="w-full"
          />
          <Dropdown
            id="rental-unit-select"
            size="small"
            :options="rentalUnitOptions"
            optionLabel="label"
            optionValue="value"
            v-model="selectedRentalUnit"
            :placeholder="$t('rent_number.choose_period')"
            class="w-full"
          />
        </div>
      </div>

      <!-- Selected Services List -->
      <div class="selected-services" v-if="selectedServices.length > 0">
        <div class="selected-services-list">
          <div
            v-for="(service, index) in selectedServices"
            :key="index"
            class="selected-item"
          >
            <div class="service-info">
              <span class="service-name"
                >{{ $t("rent_number.service") }}:
              </span>
              <img
                :src="service?.image"
                :alt="$t('rent_number.service_image')"
                class="w-24 rounded"
                width="12px"
              />
              <span class="service-name">{{ service.text }}</span>
              <span class="service-name">
                {{ $t("rent_number.for") }}: {{ selectedRentalQuantity }}
                {{ selectedRentalUnit }}
              </span>
              <span class="service-price">
                {{ $t("rent_number.total_amount") }}:
                {{
                  getPriceByLabel(
                    service?.rentDurationPrices,
                    selectedRentalQuantity + " " + selectedRentalUnit
                  )
                }}
                USDT
              </span>
              <Button
                class="remove-icon"
                icon="pi pi-times"
                severity="danger"
                variant="text"
                rounded
                plain
                @click="removeService(index)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Rent Button -->
      <div class="rent-section" v-if="selectedServices.length > 0">
        <button class="rent-button" @click="rentSelectedServices">
          {{ $t("rent_number.rent_service") }}
        </button>
        <p class="total-amount">
          {{ $t("rent_number.total_amount") }}: {{ totalAmount }} USDT
        </p>
      </div>
    </div>

    <!-- Search Bar for Services -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="$t('rent_number.search_services')"
        class="search-input"
      />
    </div>

    <!-- Services Grid -->
    <div class="services-grid">
      <div
        v-for="(item, index) in filteredServices"
        :key="index"
        class="service-card"
        :class="{ selected: selectedServices.includes(item) }"
        @click="toggleServiceSelection(item)"
      >
        <div class="service-content">
          <img
            :src="item?.image"
            :alt="$t('rent_number.service_image')"
            class="service-image"
          />
          <div class="service-details">
            <h5>{{ item?.text }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, toRaw } from "vue";
import orderService from "../services/order";
import serviceService from "@/services/service";
import { GetAllCountries } from "@/services/country.js";
import { push } from "notivue";

const customers = ref([]);
const loading = ref(false);

const selectedCustomer = ref(null);
const selectedServices = ref([]);
const rentalQuantityOptions = ref([
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
]);

const rentalUnitOptions = ref([
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
  { label: "Months", value: "months" },
]);

const selectedRentalQuantity = ref(1);
const selectedRentalUnit = ref("days");
const dropdownOptions = ref([]);

const getPriceByLabel = (rentDurationPrices, label) => {
  const found = rentDurationPrices.find((item) => item.label === label);
  return found ? found.price : "N/A"; // Nếu không tìm thấy, trả về 0
};

const onCountrySelect = async () => {
  selectedServices.value = []; // Reset danh sách dịch vụ đã chọn
  if (selectedCustomer.value?.value) {
    try {
      const response = await serviceService.GetServicesByCountryCode(
        selectedCustomer.value.value
      );
      if (selectedCustomer.value) {
        selectedCustomer.value.services = response.success ? response.data : [];
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      selectedCustomer.value.services = [];
    }
  }
};

const toggleServiceSelection = (service) => {
  const index = selectedServices.value.findIndex(
    (s) => s.code === service.code
  );
  index === -1
    ? selectedServices.value.push(service)
    : selectedServices.value.splice(index, 1);
};

const rentSelectedServices = async () => {
  // Kiểm tra rằng các dropdown rental period có dữ liệu
  if (!selectedRentalQuantity.value || !selectedRentalUnit.value) {
    push.error("Please select rental period (quantity and unit).");
    return;
  }
  // Tính toán tổng số ngày thuê
  let rentDays = 0;
  if (selectedRentalUnit.value === "days") {
    rentDays = selectedRentalQuantity.value;
  } else if (selectedRentalUnit.value === "weeks") {
    rentDays = selectedRentalQuantity.value * 7;
  } else if (selectedRentalUnit.value === "months") {
    rentDays = selectedRentalQuantity.value * 30;
  }
  // Kiểm tra rentDays nằm trong khoảng [7, 180]
  // if (rentDays < 7 || rentDays > 180) {
  //   push.error("Rental period must be between 7 and 180 days.");
  //   return;
  // }

  const token = localStorage.getItem("token");
  if (selectedServices.value.length === 0) return;

  const customer = toRaw(selectedCustomer.value);
  if (!customer || !customer.value) return;

  const servicesData = selectedServices.value.map((service) => ({
    serviceCode: service.code.toUpperCase(),
    rentDays: rentDays,
  }));

  let successCount = 0;
  let failedServices = [];

  try {
    for (const data of servicesData) {
      const response = await orderService.RentOTP(token, data);
      if (response.success) {
        successCount++;
      } else {
        failedServices.push(data.serviceCode);
      }
    }
    if (successCount > 0) {
      push.success(`Successfully rented ${successCount} service(s)!`);
      window.location.reload();
    }
    if (failedServices.length > 0) {
      push.warning(`Failed to rent service for: ${failedServices.join(", ")}`);
    }
  } catch (err) {
    push.error("Error during service rental!");
  }
};

// State của ô tìm kiếm
const searchQuery = ref("");

// Lọc danh sách dịch vụ hiển thị
const filteredServices = computed(() => {
  if (!selectedCustomer.value || !selectedCustomer.value.services) {
    return [];
  }
  if (!searchQuery.value) {
    return selectedCustomer.value.services;
  }
  return selectedCustomer.value.services.filter((service) =>
    service.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalAmount = computed(() => {
  return selectedServices.value.reduce((sum, service) => {
    const price = getPriceByLabel(
      service?.rentDurationPrices,
      selectedRentalQuantity.value + " " + selectedRentalUnit.value
    );
    return sum + (price === "N/A" ? 0 : Number(price));
  }, 0);
});

const removeService = (index) => {
  selectedServices.value.splice(index, 1);
};

const initializeData = async () => {
  loading.value = true;
  const countries = await GetAllCountries();
  customers.value = countries;
  loading.value = false;
};

const fetchCountries = async () => {
  try {
    const response = await GetAllCountries();
    dropdownOptions.value = response.map((customer) => ({
      name: `${customer?.name}`,
      value: customer?.code,
      flagImage: customer?.flagImage,
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

onMounted(async () => {
  await fetchCountries();

  // Chờ đến khi danh sách quốc gia được load xong rồi mới gán selectedCustomer
  if (dropdownOptions.value.length > 0) {
    selectedCustomer.value =
      dropdownOptions.value.find((country) => country.value === "JPN") ||
      dropdownOptions.value[0]; // Nếu không có Japan, chọn quốc gia đầu tiên

    await onCountrySelect();
  }
});
</script>

<style scoped>
.search-input {
  width: 250px !important;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}

.flex-container {
  display: flex;
  gap: 2rem;
}

.table-container {
  min-width: 30%;
  flex: 0;
}

.dropdown-item {
  margin-right: 10px;
}

.rental-selection {
  display: flex;
  gap: 10px;
}

img {
  display: inline-block;
  vertical-align: middle;
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

.recharge-button {
  background: linear-gradient(to left, #56ccf2, #2f80ed);
  color: #f5f7fa;
  border: none;
  padding: 1rem 3rem;
  border-radius: 5px;
  cursor: pointer;
}

.recharge-button:hover {
  background-color: #0056b3;
}

li {
  margin-bottom: 10px;
}

/* Dropdown */
.dropdown-container {
  margin-bottom: 1rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.top-section {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

@media (max-width: 1366px) {
  .top-section {
    flex-direction: column !important;
    width: 100% !important;
    display: block !important;
  }

  .rental-quantity-label {
    margin-top: 20px !important;
  }

  .rental-selection {
    margin-bottom: 20px !important;
  }

  .service-info {
    flex-direction: column !important;
  }
}

@media (max-width: 768px) {
  .top-section {
    flex-direction: column !important;
    width: 100% !important;
    display: block !important;
  }

  .rental-quantity-label {
    margin-top: 20px !important;
  }

  .search-input {
    width: 100% !important;
  }

  .rental-selection {
    margin-bottom: 20px !important;
  }

  .service-info {
    flex-direction: column !important;
  }
}

.selected-services {
  border: 1px solid rgb(0, 174, 255);
  border-radius: 8px;
  background: #f9f9f9;
  min-width: 50%;
}

.selected-item {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

.selected-item:last-child {
  border-bottom: none;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-top: 1rem;
}

@media (max-width: 1366px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.service-card h5 {
  margin-block-start: 10px;
  margin-block-end: 10px;
}

.service-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 0px 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 2px solid transparent;
  height: fit-content;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Highlight selected service */
.service-card.selected {
  border-color: #2f80ed;
  box-shadow: 0 0 10px rgba(47, 128, 237, 0.5);
}

.service-content {
  display: flex;
  align-items: center;
  gap: 12px;
  /* Khoảng cách giữa ảnh và chữ */
}

/* Image inside service card */
.service-image {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.service-details {
  flex: 1;
  /* Giúp chữ mở rộng hết phần còn lại */
  text-align: left;
  /* Căn chữ về bên trái */
}

/* Rent button */
.rent-button {
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

.rent-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.recharge-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.recharge-button:hover {
  background-color: #0056b3;
}

.service-info {
  display: flex;
  align-items: center;
  gap: 12px;
  /* Tạo khoảng cách giữa các phần tử */
  background: #f0f8ff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  flex-wrap: wrap;
  /* Đảm bảo hiển thị đẹp nếu không đủ không gian */
}

.service-info span {
  margin-right: 10px;
  /* Khoảng cách giữa các span */
  white-space: nowrap;
  /* Giữ nội dung không bị xuống dòng */
}

.service-info img {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  object-fit: cover;
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
  display: none !important;
}

.table-services table th {
  display: none !important;
}

.country-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* Tạo khoảng cách giữa tên và giá */
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

.country-item-row {
  gap: 10px;
}

.remove-icon {
  background: none;
  border: none;
  color: red;
  width: 12px;
  height: 12px;
}
</style>
