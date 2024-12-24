<template>
  <div>
    <h1>Numbers Rental</h1>

    <h4>Buy a number</h4>

    <!-- Flex container to hold two tables on the same row -->
    <div class="flex-container">
      <!-- Main DataTable -->
      <div class="table-container">
        <DataTable
          :value="customers"
          paginator
          :rows="10"
          dataKey="id"
          :loading="loading"
          :globalFilter="globalFilter"
          :globalFilterFields="['country.name']"
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
              <div class="flex align-items-center gap-2 row-content">
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
      <div class="table-container" v-if="selectedCustomer">
        <DataTable
          :value="selectedCustomer.services"
          paginator
          :rows="5"
          dataKey="id"
          :loading="loading"
        >
          <template #header>
            <h5>Services for {{ selectedCustomer.country.name }}</h5>
          </template>
          <template #empty> No services found. </template>
          <template #loading> Loading services data. Please wait. </template>

          <Column header="Service" field="name" style="min-width: 12rem" />
          <Column header="Price" field="price" style="min-width: 12rem" />
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";

// Dữ liệu khách hàng với thông tin quốc gia, mã vùng và lá cờ
const customers = ref([
  {
    id: 1,
    country: { name: "USA", code: "US", dialCode: "1" },
    services: [
      { id: 1, name: "Service A", price: "$10" },
      { id: 2, name: "Service B", price: "$15" },
    ],
  },
  {
    id: 2,
    country: { name: "Canada", code: "CA", dialCode: "1" },
    services: [
      { id: 3, name: "Service C", price: "$20" },
      { id: 4, name: "Service D", price: "$25" },
    ],
  },
  {
    id: 3,
    country: { name: "Mexico", code: "MX", dialCode: "52" },
    services: [
      { id: 5, name: "Service E", price: "$30" },
      { id: 6, name: "Service F", price: "$35" },
    ],
  },
  {
    id: 4,
    country: { name: "Spain", code: "ES", dialCode: "34" },
    services: [
      { id: 7, name: "Service G", price: "$40" },
      { id: 8, name: "Service H", price: "$45" },
    ],
  },
  {
    id: 5,
    country: { name: "Germany", code: "DE", dialCode: "49" },
    services: [
      { id: 9, name: "Service I", price: "$50" },
      { id: 10, name: "Service J", price: "$55" },
    ],
  },
  {
    id: 6,
    country: { name: "France", code: "FR", dialCode: "33" },
    services: [
      { id: 11, name: "Service K", price: "$60" },
      { id: 12, name: "Service L", price: "$65" },
    ],
  },
  {
    id: 7,
    country: { name: "Italy", code: "IT", dialCode: "39" },
    services: [
      { id: 13, name: "Service M", price: "$70" },
      { id: 14, name: "Service N", price: "$75" },
    ],
  },
  {
    id: 8,
    country: { name: "Brazil", code: "BR", dialCode: "55" },
    services: [
      { id: 15, name: "Service O", price: "$80" },
      { id: 16, name: "Service P", price: "$85" },
    ],
  },
  {
    id: 9,
    country: { name: "Australia", code: "AU", dialCode: "61" },
    services: [
      { id: 17, name: "Service Q", price: "$90" },
      { id: 18, name: "Service R", price: "$95" },
    ],
  },
  {
    id: 10,
    country: { name: "United Kingdom", code: "GB", dialCode: "44" },
    services: [
      { id: 19, name: "Service S", price: "$100" },
      { id: 20, name: "Service T", price: "$105" },
    ],
  },
  {
    id: 11,
    country: { name: "Japan", code: "JP", dialCode: "81" },
    services: [
      { id: 21, name: "Service U", price: "$110" },
      { id: 22, name: "Service V", price: "$115" },
    ],
  },
  {
    id: 12,
    country: { name: "South Korea", code: "KR", dialCode: "82" },
    services: [
      { id: 23, name: "Service W", price: "$120" },
      { id: 24, name: "Service X", price: "$125" },
    ],
  },
  {
    id: 13,
    country: { name: "India", code: "IN", dialCode: "91" },
    services: [
      { id: 25, name: "Service Y", price: "$130" },
      { id: 26, name: "Service Z", price: "$135" },
    ],
  },
  {
    id: 14,
    country: { name: "Russia", code: "RU", dialCode: "7" },
    services: [
      { id: 27, name: "Service AA", price: "$140" },
      { id: 28, name: "Service AB", price: "$145" },
    ],
  },
  {
    id: 15,
    country: { name: "China", code: "CN", dialCode: "86" },
    services: [
      { id: 29, name: "Service AC", price: "$150" },
      { id: 30, name: "Service AD", price: "$155" },
    ],
  },
  {
    id: 16,
    country: { name: "Argentina", code: "AR", dialCode: "54" },
    services: [
      { id: 31, name: "Service AE", price: "$160" },
      { id: 32, name: "Service AF", price: "$165" },
    ],
  },
]);

// Khởi tạo bộ lọc cho cột quốc gia
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const loading = ref(false);

// Biến cho tìm kiếm toàn cục
const globalFilter = ref(null);

// Biến lưu trữ khách hàng được chọn để hiển thị dịch vụ
const selectedCustomer = ref(null);

// Hàm xử lý khi click vào row
const onRowClick = (event) => {
  // Lưu trữ thông tin dịch vụ của khách hàng được chọn
  selectedCustomer.value = event.data;
};
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
</style>
