<template>
  <div class="proxy-containter">
    <Breadcrumb :home="home" :model="items" />

    <h4 class="grey-doc-text-red-bg">
      ⚠ Proxies are not allowed to be used in illegal activities. Responsibility
      when using a proxy lies with the buyer. Our proxies are suitable only for
      white purposes.
    </h4>

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
                ({{ data.country.dialCode }})
              </span>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Proxy" }]);
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

<style scoped>
.flex-container {
  display: flex;
  gap: 2rem;
}

.table-container {
  flex: 1;
  min-width: 300px;
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

.search-container {
  margin-bottom: 1rem;
}

.search-input {
  width: 50%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.grey-doc-text-red-bg {
  background: rgb(255, 68, 0);
  color: #ffffff;
  font-weight: normal;
  margin: 10px 0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
</style>
