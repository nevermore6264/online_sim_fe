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
          class="w-full small-dropdown"
          @change="onCountrySelect"
        >
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
              <div class="rental-selection">
                <Dropdown
                  :options="rentalQuantityOptions"
                  optionLabel="label"
                  optionValue="value"
                  v-model="service.rentalQuantity"
                  :placeholder="$t('rent_number.choose_number')"
                  class="w-full small-dropdown"
                />
                <Dropdown
                  :options="rentalUnitOptions"
                  optionLabel="label"
                  optionValue="value"
                  v-model="service.rentalUnit"
                  :placeholder="$t('rent_number.choose_period')"
                  class="w-full small-dropdown"
                />
              </div>
              <span class="service-price">
                {{ $t("rent_number.total_amount") }}:
                {{
                  getPriceByLabel(
                    service?.rentDurationPrices,
                    service.rentalQuantity + " " + service.rentalUnit
                  )
                }}
                USD
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

      <!-- Rent Button -->
      <div class="rent-section" v-if="selectedServices.length > 0">
        <Button class="rent-button" @click="rentSelectedServices">
          {{ $t("rent_number.rent_service") }}
        </Button>
        <p class="total-amount">
          {{ $t("rent_number.total_amount") }}: {{ totalAmount }} USD
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
    <div class="services-grid scrollable-container">
      <div
        v-for="(item, index) in filteredServices"
        :key="index"
        class="service-card"
        :class="{
          selected: selectedServices.map((e) => e.code).includes(item.code),
        }"
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
            <template
              v-if="
                servicesAvaiable.data.find((e) => e.service == item.code) !=
                null
              "
            >
              <b>{{
                $t("landing.availability", {
                  count: servicesAvaiable.data.find(
                    (e) => e.service == item.code
                  )?.count,
                })
              }}</b>
            </template>
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

const selectedCustomer = ref(null);
const selectedServices = ref([]);
const servicesAvaiable = ref([]);
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

const dropdownOptions = ref([]);

const getPriceByLabel = (rentDurationPrices, label) => {
  const found = rentDurationPrices.find((item) => item.label === label);
  return found ? found.price : "N/A";
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
  if (index === -1) {
    // Thêm dịch vụ với thời gian thuê mặc định
    selectedServices.value.push({
      ...service,
      rentalQuantity: 1,
      rentalUnit: "days",
    });
  } else {
    selectedServices.value.splice(index, 1);
  }
};

const rentSelectedServices = async () => {
  const token = localStorage.getItem("token");
  if (selectedServices.value.length === 0) return;

  const customer = toRaw(selectedCustomer.value);
  if (!customer || !customer.value) return;

  let successCount = 0;
  let failedServices = [];

  try {
    for (const service of selectedServices.value) {
      const rentDays = calculateRentDays(
        service.rentalQuantity,
        service.rentalUnit
      );
      const data = {
        serviceCode: service.code.toUpperCase(),
        rentDays: rentDays,
      };
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

const calculateRentDays = (quantity, unit) => {
  if (unit === "days") {
    return quantity;
  } else if (unit === "weeks") {
    return quantity * 7;
  } else if (unit === "months") {
    return quantity * 30;
  }
  return 0;
};

const searchQuery = ref("");

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
      service.rentalQuantity + " " + service.rentalUnit
    );
    return sum + (price === "N/A" ? 0 : Number(price));
  }, 0);
});

const removeService = (index) => {
  selectedServices.value.splice(index, 1);
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

const getAllServicesAvaiable = async () => {
  try {
    const response = await serviceService.GetServicesAvailable();
    servicesAvaiable.value = response;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

onMounted(async () => {
  await fetchCountries();
  await getAllServicesAvaiable();

  if (dropdownOptions.value.length > 0) {
    selectedCustomer.value =
      dropdownOptions.value.find((country) => country.value === "JPN") ||
      dropdownOptions.value[0];

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

.scrollable-container {
  max-height: 355px; /* Chiều cao cố định */
  overflow-y: auto; /* Cho phép cuộn bên trong container */
  padding-right: 10px; /* Để tránh bị che bởi thanh cuộn */
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

  .top-section {
    flex-direction: column !important;
    width: 100% !important;
    display: block !important;
  }

  .dropdown-item {
    margin-right: 0 !important;
    margin-bottom: 20px !important;
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
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }

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
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 5px !important;
  }

  .rent-button {
    margin-top: 20px;
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.service-card h5 {
  margin-block-start: 0px;
  margin-block-end: 0px;
}

.service-card b {
  font-size: 11px;
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
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.service-details {
  overflow: hidden; /* Ẩn phần văn bản vượt quá kích thước */
}

.service-details h5 {
  overflow: hidden; /* Ẩn phần văn bản vượt quá kích thước */
  text-overflow: ellipsis; /* Hiển thị dấu "..." khi văn bản bị cắt */
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
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 2fr 1.5fr 2fr auto;
  gap: 10px;
  align-items: center;
}

.service-info img {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: fill;
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

.country-item-row {
  gap: 10px;
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
</style>
