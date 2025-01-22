<template>
  <!-- Dropdown for filtering by status -->
  <div class="filter-container">
    <label for="status-filter">Filter by Status:</label>
    <select id="status-filter" v-model="selectedStatus" @change="filterOrderList">
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="expired">Expired</option>
    </select>
  </div>

  <!-- Table for purchased SIMs -->
  <div class="purchased-sim-container">
    <DataTable :value="filteredOrderList" scrollable scrollHeight="300px" min-height="300px" dataKey="id"
      :loading="loading" paginator :rows="rowsPerPage" :total-records="totalDocs"
      :first="(currentPage - 1) * rowsPerPage" @page="onPageChange">
      <template #empty> No SIMs match the selected status. </template>
      <template #loading> Loading SIM data. Please wait. </template>
      <Column header="ID" field="id" style="min-width: 1rem" />
      <Column header="Country" field="countryCode" style="min-width: 12rem" />
      <Column header="Proxy" field="stock.phone" style="min-width: 12rem" />
      <Column header="Service" field="stock.serviceCode" style="min-width: 12rem" />
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
import UserService from "@/services/user";

const orderList = ref([]); // Danh sách đầy đủ từ API
const filteredOrderList = ref([]); // Danh sách đã lọc và hiển thị
const selectedStatus = ref("all"); // Bộ lọc trạng thái
const loading = ref(false);

const rowsPerPage = ref(10); // Số dòng mỗi trang
const currentPage = ref(1); // Trang hiện tại
const totalDocs = ref(0); // Tổng số tài liệu (docs)

const currentTime = ref(new Date());

// Hàm tính thời gian hết hạn
const trackingExpiredTime = (value) => {
  const diff = new Date(value) - currentTime.value;

  if (diff <= 0) return "Expired";

  const totalSeconds = Math.floor(diff / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

// Hàm lấy dữ liệu từ API
const fetchOrderList = async (page = 1) => {
  loading.value = true;
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is not found in localStorage");
    loading.value = false;
    return;
  }

  try {
    const response = await UserService.OrderList(token, { page, limit: rowsPerPage.value });

    if (response?.success) {
      orderList.value = response.data.docs;
      totalDocs.value = response.data.totalDocs;
      currentPage.value = response.data.page;

      filterOrderList(); // Lọc danh sách sau khi lấy dữ liệu
    } else {
      console.error("Failed to fetch data from API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

// Hàm lọc danh sách
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

// Hàm xử lý khi thay đổi trang
const onPageChange = (event) => {
  fetchOrderList(event.page + 1); // `event.page` là chỉ mục (index) trang bắt đầu từ 0
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
