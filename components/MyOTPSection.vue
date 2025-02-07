<template>
  <div>
    <!-- Dropdown filter -->
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
        dataKey="id"
        :loading="loading"
        paginator
        :rows="rowsPerPage"
        :totalRecords="totalDocs"
        :first="(currentPage - 1) * rowsPerPage"
        @page="onPageChange"
      >
        <template #empty> No SIMs match the selected status. </template>
        <template #loading> Loading SIM data. Please wait. </template>

        <Column header="ID" field="id" style="min-width: 12rem" />
        <Column header="Country" field="countryCode" style="min-width: 12rem" />
        <Column header="Phone" field="stock.phone" style="min-width: 12rem" />
        <Column
          header="Service"
          field="stock.serviceCode"
          style="min-width: 12rem"
        />
        <Column header="Price" field="cost" style="min-width: 8rem" />

        <Column header="Expire Time" style="min-width: 14rem">
          <template #body="{ data }">
            <span>{{ trackingExpiredTime(data.stock.expiredAt) }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserService from "@/services/user";

const orderList = ref([]); // Danh sách đầy đủ từ API
const filteredOrderList = ref([]); // Danh sách sau khi lọc
const selectedStatus = ref("all"); // Trạng thái lọc
const loading = ref(false);

const rowsPerPage = ref(10); // Số dòng trên mỗi trang
const currentPage = ref(1); // Trang hiện tại
const totalDocs = ref(0); // Tổng số đơn hàng từ API

const currentTime = ref(new Date());

// Hàm tính thời gian hết hạn
const trackingExpiredTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
};

// Hàm lấy danh sách đơn hàng từ API
const fetchOrderList = async (page = 1) => {
  loading.value = true;
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is not found in localStorage");
    loading.value = false;
    return;
  }

  try {
    const response = await UserService.OrderList(token, {
      page,
      limit: rowsPerPage.value,
    });

    if (response?.success) {
      orderList.value = response.data.docs;
      totalDocs.value = response.data.totalDocs;
      currentPage.value = response.data.page;
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

// Hàm lọc danh sách theo trạng thái
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

// Xử lý khi chuyển trang
const onPageChange = (event) => {
  currentPage.value = event.page + 1;
  fetchOrderList(currentPage.value);
};

// Gọi API khi component được mount
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
