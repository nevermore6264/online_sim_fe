<template>
  <div>
    <Breadcrumb :home="home" :model="items" />

    <ul>
      <li>Always active numbers</li>
      <li>Activation of numbers on by order, from 10 minutes</li>
      <li>Both types of numbers, priority for always active numbers</li>
    </ul>

    <!-- Flex container to hold two tables on the same row -->
    <div class="flex-container">
      <!-- Main DataTable -->
      <div class="table-container">
        <DataTable
          :value="filteredCustomers"
          scrollable
          scrollHeight="400px"
          dataKey="id"
          :loading="loading"
          @row-click="onRowClick"
        >
          <template #header>
            <div class="flex justify-content-end">
              <!-- Không cần thêm ô tìm kiếm tại header nữa -->
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>

          <Column
            header="Country"
            filterField="country.name"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              <div class="flex align-items-center row-content">
                <img
                  alt="flag"
                  :src="`https://flagsapi.com/${data.country.code}/flat/64.png`"
                  :class="`flag flag-${data.country.code}`"
                  style="width: 24px"
                />
                <span class="country">{{ data.country.name }}</span>
                <span class="dialCode" v-if="data.country.dialCode">
                  ({{ data.country.dialCode }})
                </span>
              </div>
            </template>
          </Column>
        </DataTable>
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import orderService from "../services/order";

const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Receive SMS" }]);
const customers = ref([]);
const loading = ref(false);
const selectedCustomer = ref(null);

const currentTime = ref(new Date());

const filteredCustomers = computed(() => customers.value);

// Fetch countries function
const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data?.map((country) => ({
      id: country.cca2,
      country: {
        name: country.name.common,
        code: country.cca2,
        cca3: country.cca3,
        dialCode:
          country.idd && country.idd.root
            ? country.idd.root +
              (country.idd?.suffixes?.length ? country.idd?.suffixes[0] : "")
            : "N/A",
      },
      services: [],
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

// Initialize data function
const initializeData = async () => {
  loading.value = true;
  const countries = await fetchCountries();
  customers.value = countries;
  loading.value = false;
};

// Row click handler
const onRowClick = async (event) => {
  selectedCustomer.value = event.data;

  if (selectedCustomer.value?.country?.cca3) {
    try {
      const countryCode = selectedCustomer.value.country.cca3;
      const response = await axios.get(
        `https://verifysms.org/api/services?platform=web&countryCode=${countryCode}`
      );

      if (response?.data?.success) {
        selectedCustomer.value.services = response.data.data;
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
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
  setInterval(() => {
    currentTime.value = new Date();
  }, 1e3);

  initializeData();
});
</script>

<style scoped>
/* Flex container to align two tables side by side */
.flex-container {
  display: flex;
  gap: 2rem;
  /* Add some space between the tables */
}

.table-container {
  flex: 1;
  /* Make tables take equal width */
  min-width: 300px;
  /* Optional: Ensure tables don't get too narrow */
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
</style>
