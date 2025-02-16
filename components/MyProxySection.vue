<template>
  <div>
    <!-- Dropdown filter -->
    <div class="filter-container">
      <label for="status-filter">{{ $t("order.filter_status") }}</label>
      <select
        id="status-filter"
        v-model="selectedStatus"
        @change="filterOrderList"
      >
        <option value="all">{{ $t("order.all") }}</option>
        <option value="active">{{ $t("order.active") }}</option>
        <option value="expired">{{ $t("order.expired") }}</option>
      </select>
    </div>

    <!-- Table for purchased SIMs -->
    <div class="purchased-sim-container">
      <DataTable
        :value="filteredOrderList"
        scrollable
        dataKey="id"
        :loading="loading"
      >
        <template #empty>{{ $t("order.empty") }}</template>
        <template #loading>{{ $t("order.loading") }}</template>

        <Column
          :header="$t('order.column.id')"
          field="id"
          style="min-width: 12rem"
        />
        <Column
          :header="$t('order.column.country')"
          field="countryCode"
          style="min-width: 12rem"
        />
        <Column
          :header="$t('order.column.phone')"
          field="stock.phone"
          style="min-width: 12rem"
        />
        <Column
          :header="$t('order.column.service')"
          field="stock.serviceCode"
          style="min-width: 12rem"
        />
        <Column
          :header="$t('order.column.status')"
          field="statusCode"
          style="min-width: 12rem"
        />
        <Column
          :header="$t('order.column.price')"
          field="cost"
          style="min-width: 8rem"
        />

        <Column
          :header="$t('order.column.expire_time')"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <span>{{ trackingExpiredTime(data.stock.expiredAt) }}</span>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- 🛠 Dùng Paginator riêng -->
    <Paginator
      :rows="rowsPerPage"
      :totalRecords="totalDocs"
      v-model:first="firstRowIndex"
      @page="onPageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserService from "@/services/user";

const orderList = ref([]); // Danh sách từ API
const filteredOrderList = ref([]); // Danh sách sau khi lọc
const selectedStatus = ref("all"); // Trạng thái lọc
const loading = ref(false);

const rowsPerPage = ref(10); // Số dòng trên mỗi trang
const currentPage = ref(1); // Trang hiện tại
const totalDocs = ref(0); // Tổng số đơn hàng từ API
const totalPages = ref(1); // Tổng số trang
const firstRowIndex = ref(0); // Chỉ mục của dòng đầu tiên trên trang hiện tại

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

// Hàm lấy danh sách từ API
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
      totalPages.value = response.data.totalPages;
      currentPage.value = response.data.page;
      filterOrderList();
    } else {
      console.error("No data received from API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

// Hàm lọc danh sách theo trạng thái
const filterOrderList = () => {
  let filteredData = [...orderList.value];

  if (selectedStatus.value === "active") {
    filteredData = filteredData.filter(
      (item) => new Date(item.stock.expiredAt) > currentTime.value
    );
  } else if (selectedStatus.value === "expired") {
    filteredData = filteredData.filter(
      (item) => new Date(item.stock.expiredAt) <= currentTime.value
    );
  }

  filteredOrderList.value = filteredData;
};

// Hàm xử lý khi chuyển trang
const onPageChange = (event) => {
  const newPage = event.page + 1; // PrimeVue sử dụng index từ 0
  currentPage.value = newPage;
  firstRowIndex.value = event.first;
  fetchOrderList(newPage);
};

onMounted(() => {
  fetchOrderList();
});
</script>

<style>
.filter-container {
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

#status-filter {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Xử lý layout trên mobile */
@media (max-width: 768px) {
  .filter-container {
    flex-direction: column; /* Chuyển filter thành cột */
    align-items: flex-start;
    gap: 5px;
  }

  #status-filter {
    width: 100%; /* Để dropdown full width */
  }

  .purchased-sim-container {
    overflow-x: auto; /* Cho phép cuộn ngang nếu bảng quá lớn */
  }

  table {
    font-size: 14px; /* Giảm kích thước chữ */
  }

  th,
  td {
    padding: 8px; /* Giảm padding để bảng nhỏ gọn hơn */
    white-space: nowrap; /* Tránh bị xuống dòng */
  }
}
</style>
