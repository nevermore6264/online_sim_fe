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
        <option value="success">{{ $t("order.success") }}</option>
        <option value="pending">{{ $t("order.pending") }}</option>
        <option value="refunded">{{ $t("order.refunded") }}</option>
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
        >
          <template #body="{ data }">
            <span class="status-tag" :class="data.statusCode.toLowerCase()">
              {{ data.statusCode }}
            </span>
          </template>
        </Column>
        <Column :header="$t('order.column.price')" style="min-width: 1rem">
          <template #body="{ data }">
            <span>{{ data.cost }} USD</span>
          </template>
        </Column>
        <Column :header="$t('order.column.countdown')" style="min-width: 8rem">
          <template #body="{ data }">
            <span class="countdown">{{
              formatCountdown(data.stock.expiredAt)
            }}</span>
          </template>
        </Column>
        <Column :header="$t('order.column.otp')" style="min-width: 14rem">
          <template #body="{ data }">
            <div
              class="truncate-text"
              :title="smsList.find((e) => e.orderId == data.id)?.messageText"
            >
              {{ smsList.find((e) => e.orderId == data.id)?.messageText }}
            </div>
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
            <strong>{{ $t("order.column.countdown") }}:</strong>
            <span class="countdown">{{
              formatCountdown(order.stock.expiredAt)
            }}</span>
          </p>
          <p>
            <strong>{{ $t("order.column.otp") }}:</strong>
            {{ getMessageText(order.id) }}
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
import { ref, onMounted, onUnmounted } from "vue";
import UserService from "@/services/user";
import SmsService from "@/services/sms";
import { socket } from "@/utils/socket";

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

const countdownInterval = ref(null);
const currentTime = ref(new Date());

// Hàm tính STT
const calculateSTT = (index) => {
  return (currentPage.value - 1) * rowsPerPage.value + index + 1;
};

const getMessageText = (orderId) => {
  const sms = smsList.value.find((e) => e.orderId == orderId);
  return sms == undefined ? "-" : sms?.messageText;
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
      totalDocs.value = response.data.docs.length * response.data.totalPages; // Calculate total docs
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

  filteredOrderList.value = orderList.value.filter((item) => {
    return item.statusCode.toLowerCase() === selectedStatus.value.toLowerCase();
  });
};

// Hàm xử lý khi chuyển trang
const onPageChange = (event) => {
  const newPage = event.page + 1; // PrimeVue sử dụng index từ 0
  currentPage.value = newPage;
  firstRowIndex.value = event.first;
  fetchOrderList(newPage);
};

// Format countdown time
const formatCountdown = (expiredAt) => {
  const now = currentTime.value;
  const expired = new Date(expiredAt);
  const diff = expired - now;

  if (diff <= 0) {
    return "Expired";
  }

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Update countdown every second
const startCountdown = () => {
  countdownInterval.value = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
};

onMounted(() => {
  fetchOrderList();
  fetchSmsList();

  // Thêm xử lý socket event
  socket.on("NewSMSReceived", (newSms) => {
    // Chuyển đổi dữ liệu về đúng định dạng smsList đang dùng
    const smsItem = {
      orderId: newSms.order.id,
      messageText: newSms.data.message,
      // Thêm các trường khác nếu cần
    };
    console.log("[MyNumbersSection] NewSMSReceived:", smsItem);
    smsList.value = [newSms, ...smsList.value];
  });
});

// Cleanup socket listener khi component unmount
onUnmounted(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
  }
  socket.off("NewSMSReceived");
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

.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 14rem;
  cursor: help;
}

#status-filter {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Xử lý layout trên mobile */
@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    /* Chuyển filter thành cột */
    align-items: flex-start;
    gap: 5px;
  }

  #status-filter {
    width: 100%;
    /* Để dropdown full width */
  }

  .purchased-sim-container {
    overflow-x: auto;
    /* Cho phép cuộn ngang nếu bảng quá lớn */
  }

  table {
    font-size: 14px;
    /* Giảm kích thước chữ */
  }

  th,
  td {
    padding: 8px;
    /* Giảm padding để bảng nhỏ gọn hơn */
    white-space: nowrap;
    /* Tránh bị xuống dòng */
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
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
}

.order-status.refunded {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.order-status.success {
  background-color: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.order-status.pending {
  background-color: #fefce8;
  color: #ca8a04;
  border: 1px solid #fef08a;
}

.order-body p {
  margin: 0.3rem 0;
}

.status-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-tag.refunded {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.status-tag.success {
  background-color: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.status-tag.pending {
  background-color: #fefce8;
  color: #ca8a04;
  border: 1px solid #fef08a;
}

.countdown {
  font-family: monospace;
  font-weight: bold;
  color: #dc2626;
}
</style>
