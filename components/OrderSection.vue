<template>
  <!-- Search Input for countries -->
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a country..."
      class="search-input"
    />
  </div>

  <!-- Flex container to hold table -->
  <div class="table-container">
    <DataTable
      :value="filteredCustomers"
      scrollable
      scrollHeight="400px"
      dataKey="id"
      :loading="loading"
    >
      <template #header>
        <div class="flex justify-content-end"></div>
      </template>
      <template #empty> No countries found. </template>
      <template #loading> Loading countries data. Please wait. </template>

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
              ({{ data.country.dialCode }})
            </span>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const customers = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value;
  return customers.value.filter((customer) =>
    customer.country.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});

const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data?.map((country) => ({
      id: country.cca2,
      country: {
        name: country.name.common,
        code: country.cca2,
        dialCode:
          country.idd && country.idd.root
            ? country.idd.root +
              (country.idd?.suffixes?.length ? country.idd?.suffixes[0] : "")
            : "N/A",
      },
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

const initializeData = async () => {
  loading.value = true;
  const countries = await fetchCountries();
  customers.value = countries;
  loading.value = false;
};

onMounted(() => {
  initializeData();
});
</script>

<style></style>
