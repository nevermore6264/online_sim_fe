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
import UserService from "../services/user";

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
      // Clear selected services
      selectedServices.value = [];
      // Update user balance
      const userResponse = await UserService.GetCurrentAccount(token);
      if (userResponse.success) {
        localStorage.setItem("userInfo", JSON.stringify(userResponse));
        // Dispatch event to notify about user info update
        window.dispatchEvent(
          new CustomEvent("userInfoUpdated", { detail: userResponse })
        );
      }
      // Click the My Numbers tab
      const tabMenu = document.querySelector(".p-tabmenu");
      if (tabMenu) {
        const tabButtons = tabMenu.querySelectorAll(".p-tabmenuitem");
        if (tabButtons && tabButtons[1]) {
          tabButtons[1].click();
        }
      }
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
  width: 180px !important;
  padding: 7px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 13px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.search-input:focus {
  outline: none;
  border-color: #2f80ed;
  box-shadow: 0 1px 4px rgba(47, 128, 237, 0.12);
}

.scrollable-container {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: #2f80ed #f0f0f0;
}

.scrollable-container::-webkit-scrollbar {
  width: 4px;
}

.scrollable-container::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 2px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: #2f80ed;
  border-radius: 2px;
}

.main-container {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 0.7rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.top-section {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #f8fafc;
  padding: 10px;
  border-radius: 8px;
}

.selected-services {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  min-width: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.selected-item {
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

.selected-item:hover {
  background-color: #f8fafc;
}

.selected-item:last-child {
  border-bottom: none;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.service-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid #e2e8f0;
  height: fit-content;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-color: #2f80ed;
}

.service-card.selected {
  border-color: #2f80ed;
  background-color: #f0f7ff;
  box-shadow: 0 2px 8px rgba(47, 128, 237, 0.1);
}

.service-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.service-image {
  width: 22px;
  height: 22px;
  object-fit: contain;
  border-radius: 5px;
  background: #f8fafc;
  padding: 2px;
}

.service-details {
  flex: 1;
  text-align: left;
}

.service-details h5 {
  margin: 0;
  font-size: 12px;
  color: #1e293b;
  font-weight: 500;
}

.service-details b {
  font-size: 11px;
  color: #64748b;
}

.rent-button {
  background: linear-gradient(135deg, #2f80ed, #56ccf2);
  color: #ffffff;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(47, 128, 237, 0.1);
}

.rent-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(47, 128, 237, 0.15);
}

.rent-button:disabled {
  background: #e2e8f0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.service-info {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 2fr 1.5fr 2fr auto;
  gap: 8px;
  align-items: center;
  padding: 6px;
}

.service-info img {
  width: 22px;
  height: 22px;
  border-radius: 5px;
  object-fit: cover;
  background: #f8fafc;
  padding: 2px;
}

.remove-icon {
  background: none;
  border: none;
  color: #ef4444;
  padding: 4px;
  margin: 0;
  min-width: auto;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.remove-icon:hover {
  background-color: #fee2e2;
}

.remove-icon .p-button-label {
  display: none;
}

.rental-selection {
  display: flex;
  gap: 6px;
}

.total-amount {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  margin-top: 6px;
}

@media (max-width: 1366px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .top-section {
    flex-direction: column;
    width: 100%;
  }
  .dropdown-item {
    margin-right: 0;
    margin-bottom: 10px;
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .service-info {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  .search-input {
    width: 100% !important;
  }
  .rental-selection {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
