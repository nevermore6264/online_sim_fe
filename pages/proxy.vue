<template>
  <div class="proxy-containter">
    <Breadcrumb :home="home" :model="items" />

    <h4 class="grey-doc-text-red-bg">
      ⚠ Proxies are not allowed to be used in illegal activities. Responsibility
      when using a proxy lies with the buyer. Our proxies are suitable only for
      white purposes.
    </h4>

    <!-- Search Input for countries -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a country..."
        class="search-input"
      />
    </div>

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

    <!-- Table for purchased SIMs -->
    <div class="purchased-sim-container">
      <h2>Purchased SIMs</h2>
      <DataTable
        :value="orderList"
        scrollable
        scrollHeight="300px"
        dataKey="id"
        :loading="loading"
      >
        <template #empty> No SIMs purchased yet. </template>
        <template #loading> Loading SIM data. Please wait. </template>

        <Column header="Country" field="countryCode" style="min-width: 12rem" />
        <Column
          header="Phone Number"
          field="stock.phone"
          style="min-width: 12rem"
        />
        <Column
          header="Service"
          field="stock.serviceCode"
          style="min-width: 12rem"
        />
        <Column header="Price" field="cost" style="min-width: 12rem" />
        <Column header="SMS Status" style="min-width: 12rem">
          <template #body="{ data }">
            <span>
              <Tag
                v-if="data.statusCode == 'PENDING'"
                severity="warning"
                value="PENDING"
              ></Tag>
              <Tag
                v-else-if="data.statusCode == 'SUCCESS'"
                severity="success"
                value="SUCCESS"
              ></Tag>
              <Tag
                v-else-if="data.statusCode == 'REFUNDED'"
                severity="danger"
                value="REFUNDED"
              ></Tag>
              <Tag v-else severity="info" :value="data.statusCode"></Tag>
            </span>
          </template>
        </Column>

        <Column header="Expire Time" style="min-width: 12rem">
          <template #body="{ data }">
            <span>
              {{ trackingExpiredTime(data.stock.expiredAt) }}
            </span>
          </template>
        </Column>

        <Column header="Message Content" style="min-width: 12rem">
          <template #body="{ data }">
            <span>
              {{
                data.stock?.messages.length == 0
                  ? "No content"
                  : data.stock.messages[0].content
              }}
            </span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import orderService from "../services/order";

const router = useRouter();
const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Proxy" }]);
const customers = ref([]);
const orderList = ref([]);
const loading = ref(false);
const selectedCustomer = ref(null);
const searchQuery = ref("");

const currentTime = ref(new Date());

// Function to filter customers by search query
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value;
  return customers.value.filter((customer) =>
    customer.country.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});

const trackingExpiredTime = (value) => {
  const diff = new Date(value) - currentTime.value;

  if (diff <= 0) return "Expired";

  const totalSeconds = Math.floor(diff / 1000); // Total seconds remaining
  const minutes = Math.floor(totalSeconds / 60); // Total minutes
  const seconds = totalSeconds % 60; // Remaining seconds

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

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

// Fetch purchased SIMs function
const fetchOrderList = async () => {
  loading.value = true;
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token is not found in localStorage");
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(
      `https://verifysms.org/api/account/order-list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.data?.success) {
      orderList.value = response?.data?.data?.docs;
    } else {
      console.error("Failed to fetch data from API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

// Initialize data function
const initializeData = async () => {
  loading.value = true;
  const countries = await fetchCountries();
  customers.value = countries;
  loading.value = false;
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
  fetchOrderList();
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
}

.p-datatable-scrollable-view {
  max-height: 400px;
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

.grey-doc-text-red-bg {
  background: rgb(255, 68, 0);
  color: #ffffff;
  font-weight: normal;
  margin: 10px 0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
</style>
