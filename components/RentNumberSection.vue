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
        <label for="country-select">Select Country:</label>
        <Dropdown
          id="country-select"
          :options="dropdownOptions"
          optionLabel="name"
          optionValue="value"
          v-model="selectedCustomer.value"
          placeholder="Choose a country"
          class="w-full"
          @change="onCountrySelect"
        >
          <template #option="slotProps">
            <div class="flex align-items-center">
              <img
                :alt="slotProps.option?.name"
                :src="slotProps.option?.flagImage"
                class="mr-2 flag"
                style="width: 18px"
              />
              <div>{{ slotProps.option?.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>

      <div class="dropdown-item">
        <label for="rental-quantity-select">Select Rental Period:</label>
        <div class="rental-selection">
          <Dropdown
            id="rental-quantity-select"
            :options="rentalQuantityOptions"
            optionLabel="label"
            optionValue="value"
            v-model="selectedRentalQuantity"
            placeholder="Choose number"
            class="w-full"
          />
          <Dropdown
            id="rental-unit-select"
            :options="rentalUnitOptions"
            optionLabel="label"
            optionValue="value"
            v-model="selectedRentalUnit"
            placeholder="Choose a period"
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
              <span class="service-name">Service: </span>
              <img
                :src="service?.image"
                alt="Service Image"
                class="w-24 rounded"
                width="24px"
              />
              <span class="service-name">{{ service.text }}</span>
              <span class="service-name">
                Country: {{ selectedCustomer.value }}
              </span>
              <span class="service-name"
                >For: {{ selectedRentalQuantity }} {{ selectedRentalUnit }}
              </span>
              <span class="service-price">
                Total amount:
                {{
                  getPriceByLabel(
                    service?.rentDurationPrices,
                    selectedRentalQuantity + " " + selectedRentalUnit
                  )
                }}
                USDT
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Rent Button -->
      <div class="rent-section" v-if="selectedServices.length > 0">
        <button class="rent-button" @click="rentSelectedServices">
          Rent Service
        </button>
        <p class="total-amount">Total Amount: {{ totalAmount }} USDT</p>
      </div>
    </div>

    <!-- Search Bar for Services -->
    <div class="search-container" v-if="filteredServices.length > 0">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search services..."
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
          <img :src="item?.image" alt="Service Image" class="service-image" />
          <div class="service-details">
            <h3>{{ item?.text }}</h3>
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

const dropdownOptions = ref([]);
const selectedCustomer = ref({
  value: null,
  services: [],
});
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

const selectedRentalQuantity = ref(null);
const selectedRentalUnit = ref(null);

const selectedRentalPeriod = ref("1 days"); // Giá trị mặc định

const getPriceByLabel = (rentDurationPrices, label) => {
  const found = rentDurationPrices.find((item) => item.label === label);
  return found ? found.price : "N/A"; // Nếu không tìm thấy, trả về 0
};

const fetchCountries = async () => {
  try {
    const response = await GetAllCountries();
    dropdownOptions.value = response.map((customer) => ({
      name: `${customer?.name} (${customer?.code})`,
      value: customer?.code,
      flagImage: customer?.flagImage,
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

const onCountrySelect = async () => {
  selectedServices.value = [];
  if (selectedCustomer.value) {
    try {
      const countryCode = selectedCustomer.value;
      const response = await serviceService.GetServicesByCountryCode(
        countryCode?.value
      );

      selectedCustomer.value.services = response?.success ? response.data : [];
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
  const token = localStorage.getItem("token");
  if (selectedServices.value.length === 0) return;

  const customer = toRaw(selectedCustomer.value);
  if (!customer || !customer.value) return;

  const servicesData = selectedServices.value.map((service) => ({
    serviceCode: service.code.toUpperCase(),
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
      push.success(`Successfully rent ${successCount} service(s)!`);
      window.location.reload();
    }
    if (failedServices.length > 0) {
      push.warning(`Failed to rent Service for: ${failedServices.join(", ")}`);
    }
  } catch (err) {
    push.error("Error during rent service!");
  }
};

// State của ô tìm kiếm
const searchQuery = ref("");

const filteredServices = computed(() => {
  if (!searchQuery.value) {
    return selectedCustomer.value.services;
  }
  return selectedCustomer.value.services
    .map((service) => ({
      ...service,
      price: getPriceByLabel(
        selectedCustomer.rentDurationPrices,
        selectedRentalPeriod.value
      ), // Gán giá từ danh sách
    }))
    .filter((service) =>
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

onMounted(() => {
  fetchCountries();
});
</script>

<style scoped>
.search-input {
  width: 250px !important;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.flex-container {
  display: flex;
  gap: 2rem;
}

.table-container {
  flex: 1;
  min-width: 300px;
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
  grid-template-columns: repeat(4, 1fr);
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

.service-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 2px solid transparent;
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

/* Image inside service card */
.service-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 8px;
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
  gap: 12px; /* Tạo khoảng cách giữa các phần tử */
  background: #f0f8ff;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  flex-wrap: wrap; /* Đảm bảo hiển thị đẹp nếu không đủ không gian */
}

.service-info span {
  margin-right: 10px; /* Khoảng cách giữa các span */
  white-space: nowrap; /* Giữ nội dung không bị xuống dòng */
}

.service-info img {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: cover;
}
</style>
