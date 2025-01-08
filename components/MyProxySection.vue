<template>
  <!-- Table for purchased SIMs -->
  <div class="purchased-sim-container">
    <DataTable
      :value="orderList"
      scrollable
      scrollHeight="300px"
      dataKey="id"
      :loading="loading"
    >
      <template #empty> No SIMs purchased yet. </template>
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
const loading = ref(false);

const currentTime = ref(new Date());

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

onMounted(() => {
  fetchOrderList();
});
</script>

<style></style>
