<template>
  <div>
    <ul>
      <li>{{ $t("rent_number.always_active") }}</li>
      <li>{{ $t("rent_number.activation_by_order") }}</li>
      <li>{{ $t("rent_number.priority_numbers") }}</li>
    </ul>

    <!-- Dropdown for country selection -->
    <div class="dropdown-container flex">
      <!-- Dropdown for country selection -->
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
                :class="`mr-2 flag flag-${slotProps.option?.code?.toLowerCase()}`"
                style="width: 18px"
              />
              <div>{{ slotProps.option?.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>

    <!-- Sub DataTable for services -->
    <div class="data-view-container">
      <DataView
        :value="selectedCustomer?.services"
        :layout="'grid'"
        :rows="6"
        :loading="loading"
      >
        <!-- <template #empty> No services found. </template>
        <template #loading> Loading services data. Please wait. </template> -->

        <!-- Template hiển thị mỗi service -->
        <template #grid="{ data }">
          <div class="service-card">
            <input type="checkbox" :value="data" v-model="selectedServices" />
            <img :src="data?.image" alt="Service Image" class="service-image" />
            <h3>{{ data?.text }}</h3>
            <p>{{ data?.price }} USDT</p>
          </div>
        </template>
      </DataView>
      <button
        class="buy-button"
        :disabled="selectedServices.length === 0"
        @click="buySelectedServices"
      >
        Buy Selected Services
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import orderService from "../services/order";
import serviceService from "@/services/service";
import { GetAllCountries } from "@/services/country.js";

const dropdownOptions = ref([]);
const selectedCustomer = ref({
  value: null, // Mã quốc gia
  services: [], // Danh sách dịch vụ
});

const loading = ref(false);

// Fetch countries function
const fetchCountries = async () => {
  try {
    const response = await GetAllCountries();
    console.log(response);
    // Map dropdown options
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
  if (selectedCustomer.value) {
    try {
      const countryCode = selectedCustomer.value; // Chỉ lấy mã quốc gia đã chọn
      loading.value = true;

      const response = await serviceService.GetServicesByCountryCode(
        countryCode?.value
      );
      console.log(response);

      if (response?.success) {
        // Chỉ thêm hoặc cập nhật dịch vụ, không thay đổi giá trị quốc gia đã chọn
        selectedCustomer.value = {
          ...selectedCustomer.value,
          services: response.data,
        };
        console.log(selectedCustomer.value);
      } else {
        console.error("Failed to fetch services");
        selectedCustomer.value = {
          ...selectedCustomer.value,
          services: [], // Không có dữ liệu dịch vụ
        };
        console.log(selectedCustomer?.services);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      selectedCustomer.value = {
        ...selectedCustomer.value,
        services: [], // Lỗi khi gọi API, không có dịch vụ
      };
    } finally {
      loading.value = false;
    }
  }
};

import { toRaw } from "vue";

const selectedServices = ref([]); // Lưu danh sách dịch vụ đã chọn

// Hàm mua nhiều dịch vụ cùng lúc
const buySelectedServices = async () => {
  const token = localStorage.getItem("token");

  if (selectedServices.value.length === 0) {
    console.error("No services selected.");
    push.error("Please select at least one service to buy.");
    return;
  }

  const customer = toRaw(selectedCustomer.value);

  if (!customer || !customer.value) {
    console.error("Invalid customer data:", customer);
    return;
  }

  const servicesData = selectedServices.value.map((service) => ({
    serviceCode:
      service.code + "_" + String(customer.value || "").toUpperCase(),
  }));

  try {
    for (const data of servicesData) {
      const response = await orderService.RentOTP(token, data);
      if (response.success) {
        push.success(`Bought service: ${data.serviceCode} successfully`);
      } else {
        push.error(`Failed to buy service: ${data.serviceCode}`);
      }
    }
  } catch (err) {
    push.error("An error occurred while purchasing services.");
    console.error("Error during service purchase:", err);
  }
};

onMounted(() => {
  fetchCountries();
});
</script>

<style scoped>
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

.quantity {
  color: red !important;
}

.p-datatable-scrollable-wrapper {
  overflow-y: auto;
  /* Tùy chỉnh cuộn */
}

.p-datatable-scrollable-view {
  max-height: 400px;
  /* Đảm bảo đúng chiều cao */
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

/* Style for search input */
.search-container {
  margin-bottom: 1rem;
  /* Space below the search input */
  margin-right: 40px;
}

.search-input {
  width: 50%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.lbl_services {
  margin-top: 0px !important;
}

li {
  margin-bottom: 10px;
}

.dropdown-container {
  margin-bottom: 1rem;
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
</style>
