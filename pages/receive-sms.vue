<template>
  <div>
    <h1>Numbers Rental</h1>

    <h4>Buy a number</h4>
    <!-- DataTable Component -->
    <DataTable
      v-model:filters="filters"
      :value="customers"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['country.name']"
    >
      <template #header>
        <div class="flex justify-content-end">
          <!-- Removed Keyword Search Input -->
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
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Search by country"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";

// Cố định dữ liệu khách hàng với thông tin quốc gia, mã vùng, và lá cờ
const customers = ref([
  {
    id: 1,
    country: { name: "USA", code: "US", dialCode: "1" },
  },
  {
    id: 2,
    country: { name: "Canada", code: "CA", dialCode: "1" },
  },
  {
    id: 3,
    country: { name: "Mexico", code: "MX", dialCode: "52" },
  },
  {
    id: 4,
    country: { name: "Spain", code: "ES", dialCode: "34" },
  },
]);

// Khởi tạo bộ lọc cho cột quốc gia
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const loading = ref(false);
</script>

<style>
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
