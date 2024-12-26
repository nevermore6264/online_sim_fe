<template>
  <div>
    <h2>Buy OTP Service</h2>

    <!-- Flex container to hold two tables on the same row -->
    <div class="flex-container">
      <!-- Main DataTable -->
      <div class="table-container">
        <DataTable
          :value="customers"
          scrollable
          scrollHeight="400px"
          dataKey="id"
          :loading="loading"
          @row-click="onRowClick"
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
                  (+{{ data.country.dialCode }})
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
          scrollHeight="200px"
          dataKey="id"
          :loading="loading"
        >
          <template #header>
            <h5>Services for {{ selectedCustomer?.country?.name }}</h5>
          </template>
          <template #empty> No services found. </template>
          <template #loading> Loading services data. Please wait. </template>

          <Column header="Service" field="name" style="min-width: 12rem" />
          <Column header="Quanlity" field="quantity" style="min-width: 12rem" />
          <Column field="price" header="Price" style="min-width: 12rem">
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- Table for purchased SIMs -->
    <div class="purchased-sim-container">
      <h2>Purchased SIMs</h2>
      <DataTable
        :value="purchasedSims"
        scrollable
        scrollHeight="300px"
        dataKey="id"
        :loading="loading"
      >
        <template #empty> No SIMs purchased yet. </template>
        <template #loading> Loading SIM data. Please wait. </template>

        <Column header="Country" field="country" style="min-width: 12rem" />
        <Column
          header="Phone Number"
          field="phoneNumber"
          style="min-width: 12rem"
        />
        <Column header="Service" field="service" style="min-width: 12rem" />
        <Column header="Price" field="price" style="min-width: 12rem" />
        <Column header="SMS Status" field="status" style="min-width: 12rem">
          <template #body="{ data }">
            <span>
              {{ data.status }}
            </span>
          </template>
        </Column>
      </DataTable>
      <div class="pagination">
        <button @click="currentPage > 1 && fetchPurchasedSims(currentPage - 1)">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="
            currentPage < totalPages && fetchPurchasedSims(currentPage + 1)
          "
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";
const currentPage = ref(1);
const totalPages = ref(0);
const limit = ref(10); //
const customers = ref([
  {
    id: 1,
    country: { name: "USA", code: "US", dialCode: "1" },
    services: [
      { id: 1, name: "Uber", price: "$0.09", quantity: 9999 },
      { id: 2, name: "Microsoft", price: "$0.12", quantity: 4960 },
      { id: 3, name: "Netflix", price: "$0.16", quantity: 9999 },
    ],
  },
  {
    id: 2,
    country: { name: "Canada", code: "CA", dialCode: "1" },
    services: [
      { id: 4, name: "eBay", price: "$0.15", quantity: 2071 },
      { id: 5, name: "Amazon", price: "$0.16", quantity: 9056 },
    ],
  },
  {
    id: 3,
    country: { name: "Mexico", code: "MX", dialCode: "52" },
    services: [
      { id: 6, name: "OLX", price: "$0.19", quantity: 2687 },
      { id: 7, name: "LiveScore", price: "$0.35", quantity: 2292 },
    ],
  },
  {
    id: 4,
    country: { name: "Spain", code: "ES", dialCode: "34" },
    services: [
      { id: 8, name: "BlaBlaCar", price: "$0.35", quantity: 1190 },
      { id: 9, name: "Glovo", price: "$0.35", quantity: 2440 },
      { id: 10, name: "LINE", price: "$0.14", quantity: 1757 },
    ],
  },
  {
    id: 5,
    country: { name: "Germany", code: "DE", dialCode: "49" },
    services: [
      { id: 11, name: "ProtonMail", price: "$0.35", quantity: 9999 },
      { id: 12, name: "Nike", price: "$0.20", quantity: 9999 },
    ],
  },
  {
    id: 6,
    country: { name: "France", code: "FR", dialCode: "33" },
    services: [
      { id: 13, name: "AOL", price: "$0.09", quantity: 9999 },
      { id: 14, name: "AppBonus", price: "$0.35", quantity: 2080 },
    ],
  },
  {
    id: 7,
    country: { name: "Italy", code: "IT", dialCode: "39" },
    services: [
      { id: 15, name: "Hinge", price: "$0.30", quantity: 1140 },
      { id: 16, name: "Tinder", price: "$0.16", quantity: 9999 },
    ],
  },
  {
    id: 8,
    country: { name: "Brazil", code: "BR", dialCode: "55" },
    services: [
      { id: 17, name: "WhatsAround", price: "$0.35", quantity: 1956 },
      { id: 18, name: "Badoo", price: "$0.30", quantity: 2538 },
    ],
  },
  {
    id: 9,
    country: { name: "Australia", code: "AU", dialCode: "61" },
    services: [
      { id: 19, name: "Battle.net Blizzard", price: "$0.01", quantity: 50 },
      { id: 20, name: "Kucoin", price: "$0.14", quantity: 1650 },
      { id: 21, name: "Coinbase", price: "$0.12", quantity: 1708 },
    ],
  },
  {
    id: 10,
    country: { name: "Japan", code: "JP", dialCode: "81" },
    services: [
      { id: 22, name: "LINE", price: "$0.14", quantity: 1757 },
      { id: 23, name: "Rakuten", price: "$0.19", quantity: 1900 },
    ],
  },
  {
    id: 11,
    country: { name: "India", code: "IN", dialCode: "91" },
    services: [
      { id: 24, name: "Flipkart", price: "$0.15", quantity: 1080 },
      { id: 25, name: "Paytm", price: "$0.12", quantity: 1900 },
      { id: 26, name: "Snapchat", price: "$0.31", quantity: 1636 },
    ],
  },
]);

// Khởi tạo bộ lọc cho cột quốc gia
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

// Danh sách SIM đã mua
const purchasedSims = ref([]);

const loading = ref(false);

// Biến lưu trữ khách hàng được chọn để hiển thị dịch vụ
const selectedCustomer = ref(null);

// Hàm xử lý khi click vào row
const onRowClick = (event) => {
  selectedCustomer.value = event.data;
};

const fetchPurchasedSims = async (page = 1) => {
  const apiKey = localStorage.getItem("api_key");
  if (!apiKey) {
    console.error("API key is not found in localStorage");
    loading.value = false;
    return;
  }

  try {
    const response = await fetch(
      `https://japansim.net/api/account/order-list?api_key=${apiKey}&page=${page}&limit=${limit.value}`
    );
    const result = await response.json();

    if (result.success) {
      purchasedSims.value = result.data.docs.map((doc) => ({
        id: doc.id,
        country: doc.countryCode,
        phoneNumber: doc.stock.phone,
        service: doc.stock.serviceCode,
        price: doc.cost,
        status: doc.isActive ? "Active" : "Inactive",
      }));
      totalPages.value = result.data.totalPages; // Cập nhật tổng số trang
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
  fetchPurchasedSims(currentPage.value);
});

watch(currentPage, (newPage) => {
  fetchPurchasedSims(newPage);
});
</script>

<style scoped>
/* Flex container to align two tables side by side */
.flex-container {
  display: flex;
  gap: 2rem; /* Add some space between the tables */
}

.table-container {
  flex: 1; /* Make tables take equal width */
  min-width: 300px; /* Optional: Ensure tables don't get too narrow */
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
  overflow-y: auto; /* Tùy chỉnh cuộn */
}

.p-datatable-scrollable-view {
  max-height: 400px; /* Đảm bảo đúng chiều cao */
}
</style>
