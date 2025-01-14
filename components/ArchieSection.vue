<template>
  <!-- Filter container -->
  <div class="filter-container">
    <label for="phone-search">Find number:</label>
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
      <Column header="Begin" field="begin" style="min-width: 1rem" />
      <Column header="Closed" style="min-width: 12rem">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.stock.expiredAt) }}
        </template>
      </Column>
      <Column
        header="Service"
        field="stock.serviceCode"
        style="min-width: 12rem"
      />
      <Column
        header="Phone number"
        field="stock.phone"
        style="min-width: 12rem"
      />

      <Column header="Action" style="min-width: 12rem"> </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserService from "@/services/user";

const orderList = ref([]);
const filteredOrderList = ref([]);
const searchPhone = ref("");
const loading = ref(false);

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
    if (response?.success) {
      orderList.value = response?.data?.docs;
      filterOrderList();
    } else {
      console.error("Failed to fetch data from API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A"; // Xử lý nếu ngày không tồn tại
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Hiển thị giờ 24h
  }).format(date);
};

// Filter order list based on phone number
const filterOrderList = () => {
  let tempList = orderList.value;

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

#phone-search {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
