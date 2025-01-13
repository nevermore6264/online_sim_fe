<template>
  <!-- Filter container -->
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

    <label for="phone-search">Search by Phone Number:</label>
    <input
      id="phone-search"
      type="text"
      v-model="searchPhone"
      placeholder="Enter phone number"
      @input="filterOrderList"
    />
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
      <template #empty> No matching records found </template>
      <template #loading> Loading records. Please wait. </template>
      <Column header="Begin" field="id" style="min-width: 1rem" />
      <Column header="Closed" field="countryCode" style="min-width: 12rem" />
      <Column header="Service" field="stock.phone" style="min-width: 12rem" />
      <Column header="Phone number" field="cost" style="min-width: 12rem" />
      <Column header="Action" style="min-width: 12rem"> </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import UserService from "@/services/user";

const orderList = ref([]);
const filteredOrderList = ref([]);
const selectedStatus = ref("all");
const searchPhone = ref(""); // Thêm biến cho ô tìm kiếm
const loading = ref(false);

const currentTime = ref(new Date());

// Fetch purchased SIMs
const fetchOrderList = async () => {
  loading.value = true;
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token is not found in localStorage");
    loading.value = false;
    return;
  }

  try {
    const response = await UserService.OrderList(token);

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

// Filter order list based on status and phone number
const filterOrderList = () => {
  let tempList = orderList.value;

  // Filter by status
  if (selectedStatus.value === "active") {
    tempList = tempList.filter(
      (item) => new Date(item.stock.expiredAt) > currentTime.value
    );
  } else if (selectedStatus.value === "expired") {
    tempList = tempList.filter(
      (item) => new Date(item.stock.expiredAt) <= currentTime.value
    );
  }

  // Filter by phone number
  if (searchPhone.value) {
    const searchLower = searchPhone.value.toLowerCase();
    tempList = tempList.filter((item) =>
      item.stock.phone.toLowerCase().includes(searchLower)
    );
  }

  filteredOrderList.value = tempList;
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

#phone-search {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
