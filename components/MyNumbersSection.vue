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

    <!-- 🖥 Hiển thị dạng bảng trên màn hình lớn -->
    <div class="purchased-sim-container desktop-view">
      <DataTable
        :value="filteredOrderList"
        scrollable
        dataKey="id"
        :loading="loading"
      >
        <template #empty>{{ $t("order.empty") }}</template>
        <template #loading>{{ $t("order.loading") }}</template>

        <!-- Cột STT -->
        <Column :header="$t('order.column.stt')" style="min-width: 1rem">
          <template #body="{ index }">
            <span>{{ calculateSTT(index) }}</span>
          </template>
        </Column>
        <Column
          :header="$t('order.column.phone')"
          field="stock.phone"
          style="min-width: 8rem"
        />
        <Column
          :header="$t('order.column.service')"
          field="stock.serviceCode"
          style="min-width: 8rem"
        />
        <Column
          :header="$t('order.column.status')"
          field="statusCode"
          style="min-width: 4rem"
        />
        <Column :header="$t('order.column.price')" style="min-width: 1rem">
          <template #body="{ data }">
            <span>{{ data.cost }} USDT</span>
          </template>
        </Column>
        <Column :header="$t('order.column.otp')" style="min-width: 14rem">
          <template #body="{ data }">
            <span>{{ data }}</span>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- 📱 Hiển thị dạng card trên mobile -->
    <div class="mobile-view">
      <div
        v-for="(order, index) in filteredOrderList"
        :key="order.id"
        class="order-card"
      >
        <div class="order-header">
          <span class="order-id">#{{ calculateSTT(index) }}</span>
          <span class="order-status" :class="order.statusCode">
            {{ order.statusCode }}
          </span>
        </div>
        <div class="order-body">
          <p>
            <strong>{{ $t("order.column.country") }}:</strong>
            {{ order.countryCode }}
          </p>
          <p>
            <strong>{{ $t("order.column.phone") }}:</strong>
            {{ order.stock.phone }}
          </p>
          <p>
            <strong>{{ $t("order.column.service") }}:</strong>
            {{ order.stock.serviceCode }}
          </p>
          <p>
            <strong>{{ $t("order.column.price") }}:</strong> {{ order.cost }}
          </p>
          <p>
            <strong>{{ $t("order.column.otp") }}:</strong>
            {{ smsList.find((e) => e.orderId == order.id)?.messageText }}
          </p>
        </div>
      </div>
    </div>

    <!-- 🛠 Paginator -->
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
import SmsService from "@/services/sms";

const orderList = ref([]); // Danh sách từ API
const filteredOrderList = ref([]); // Danh sách sau khi lọc
const selectedStatus = ref("all"); // Trạng thái lọc
const loading = ref(false);
const smsList = ref([]); // Danh sách sau khi lọc

const rowsPerPage = ref(10); // Số dòng trên mỗi trang
const currentPage = ref(1); // Trang hiện tại
const totalDocs = ref(0); // Tổng số đơn hàng từ API
const totalPages = ref(1); // Tổng số trang
const firstRowIndex = ref(0); // Chỉ mục của dòng đầu tiên trên trang hiện tại

// Hàm tính STT
const calculateSTT = (index) => {
  return (currentPage.value - 1) * rowsPerPage.value + index + 1;
};

const fetchSmsList = async () => {
  loading.value = true;
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is not found in localStorage");
    loading.value = false;
    return;
  }

  try {
    const response = await SmsService.GetAllSmsList(token);

    if (response?.success) {
      smsList.value = response.data.docs;
    } else {
      console.error("No data received from API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
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
  if (selectedStatus.value === "all") {
    filteredOrderList.value = orderList.value;
    return;
  }

  const isExpired = (date) => new Date(date) <= new Date();
  filteredOrderList.value = orderList.value.filter((item) =>
    selectedStatus.value === "expired"
      ? isExpired(item.stock.expiredAt)
      : !isExpired(item.stock.expiredAt)
  );
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
  fetchSmsList();
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

  .desktop-view {
    display: none;
  }
  .mobile-view {
    display: block;
  }
}

/* Hiển thị bảng trên desktop */
@media (min-width: 769px) {
  .desktop-view {
    display: block;
  }
  .mobile-view {
    display: none;
  }
}

/* Style cho order card */
.order-card {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.order-status {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-transform: capitalize;
}

.order-status.active {
  color: #2ecc71;
}

.order-status.expired {
  color: #e74c3c;
}

.order-body p {
  margin: 0.3rem 0;
}
</style>
