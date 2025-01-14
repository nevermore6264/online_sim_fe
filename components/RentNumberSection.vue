<template>
  <div>
    <Breadcrumb :home="home" :model="items" />

    <ul>
      <li>Always active numbers</li>
      <li>Activation of numbers on by order, from 10 minutes</li>
      <li>Both types of numbers, priority for always active numbers</li>
    </ul>

    <!-- Dropdown for country selection -->
    <div class="dropdown-container">
      <label for="country-select">Select Country:</label>
      <Dropdown
        id="country-select"
        :options="dropdownOptions"
        optionLabel="label"
        optionValue="value"
        v-model="selectedCustomer"
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

    <!-- Sub DataTable for services -->
    <div class="table-container">
      <DataTable
        :value="selectedCustomer?.services"
        scrollable
        scrollHeight="400px"
        dataKey="id"
        :loading="loading"
      >
        <template #empty> No services found. </template>
        <template #loading> Loading services data. Please wait. </template>

        <Column>
          <template #body="{ data }">
            <img
              :src="data?.image.replace('/japan-sim/images/', '/')"
              width="24px"
              class="w-24 rounded"
            />
          </template>
        </Column>

        <Column header="Service" field="text" style="min-width: 12rem" />
        <Column header="Price" style="min-width: 12rem">
          <template #body="{ data }"> {{ data?.price }} USDT </template>
        </Column>
        <Column header="Action" style="min-width: 12rem">
          <template #body="{ data }">
            <button class="recharge-button" @click="buyService(data)">
              Buy
            </button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import orderService from "../services/order";

const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Receive SMS" }]);
const dropdownOptions = ref([]);
const selectedCustomer = ref(null);
const loading = ref(false);
import { GetAllCountries } from "@/services/country.js";

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
      const countryCode = selectedCustomer.value; // Dùng giá trị được chọn từ dropdown
      loading.value = true;

      const response = await axios.get(
        `https://verifysms.org/api/services?platform=web&countryCode=${countryCode}`
      );

      if (response?.data?.success) {
        // Gán lại toàn bộ selectedCustomer, bao gồm cả services
        selectedCustomer.value = {
          code: countryCode,
          services: response.data.data,
        };
      } else {
        console.error("Failed to fetch services");
        selectedCustomer.value = {
          code: countryCode,
          services: [], // Không có dữ liệu
        };
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      selectedCustomer.value = {
        code: countryCode,
        services: [], // Lỗi, không có dữ liệu
      };
    } finally {
      loading.value = false;
    }
  }
};

// Buy service handler
const buyService = (service) => {
  orderService
    .BuyOTP(service.code)
    .then((res) => {
      if (res.success) {
        push.success("Buy service successfully");
      } else {
        push.error("Buy service failed");
      }
    })
    .catch((err) => {
      push.error("Buy service failed");
    });
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
