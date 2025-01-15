<template>
  <!-- Dropdown for filtering by status -->
  <div class="filter-container">
    <label for="status-filter">Filter by Status:</label>
    <select
      id="status-filter"
      v-model="selectedStatus"
      @change="filterOrderList"
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="expired">Expired</option>
    </select>
  </div>

  <!-- Table for purchased SIMs -->
  <div class="purchased-sim-container">
    <DataTable
      :value="filteredOrderList"
      scrollable
      scrollHeight="300px"
      min-height="300px"
      dataKey="id"
      :loading="loading"
    >
      <template #empty> No SIMs match the selected status. </template>
      <template #loading> Loading SIM data. Please wait. </template>
      <Column header="ID" field="id" style="min-width: 1rem" />
      <Column header="Country" field="countryCode" style="min-width: 12rem" />
      <Column header="Proxy" field="stock.phone" style="min-width: 12rem" />
      <Column
        header="Service"
        field="stock.serviceCode"
        style="min-width: 12rem"
      />
      <Column header="Price" field="cost" style="min-width: 12rem" />
      <Column header="Expire Time" style="min-width: 12rem">
        <template #body="{ data }">
          <span>
            {{ trackingExpiredTime(data.stock.expiredAt) }}
          </span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orderList = ref([]);
const filteredOrderList = ref([]);
const selectedStatus = ref("all"); // Default to "all"
const loading = ref(false);

const currentTime = ref(new Date());

// Function to calculate expired time
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

// Function to fetch purchased SIMs
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
      filterOrderList(); // Apply filtering after fetching data
    } else {
      console.error("Failed to fetch data from API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

// Function to filter order list based on selected status
const filterOrderList = () => {
  if (selectedStatus.value === "all") {
    filteredOrderList.value = orderList.value;
  } else if (selectedStatus.value === "active") {
    filteredOrderList.value = orderList.value.filter(
      (item) => new Date(item.stock.expiredAt) > currentTime.value
    );
  } else if (selectedStatus.value === "expired") {
    filteredOrderList.value = orderList.value.filter(
      (item) => new Date(item.stock.expiredAt) <= currentTime.value
    );
  }
};

onMounted(() => {
  fetchOrderList();
});
</script>

<style>
.filter-container {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

#status-filter {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
