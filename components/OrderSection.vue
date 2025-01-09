<template>
  <div class="search-container">
    <h4>1. Select proxy country</h4>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a country..."
      class="search-input"
    />
  </div>

  <div class="dataview-container">
    <DataTable
      :value="filteredCountries"
      scrollable
      scrollHeight="400px"
      dataKey="code"
      :loading="loading"
    >
      <template #empty> No countries found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column style="min-width: 12rem">
        <template #body="{ data }">
          <div class="country-row">
            <div
              v-for="country in data"
              :key="country.code"
              class="country-item"
              @click="onCountryClick(country)"
              :class="{
                'selected-country':
                  selectedCountry && selectedCountry.code === country.code,
              }"
            >
              <img
                :src="country.flagImage"
                :alt="country.name"
                class="flag-image"
              />
              <span class="country-name">{{ country.name }}</span>
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- Other components here -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { GetAllCountries } from "@/services/country.js";
import { push } from "notivue";
import { useWindowSize } from "@vueuse/core";

const customers = ref([]);
const loading = ref(false);
const selectedCountry = ref(null); // Track the selected country

// Theo dõi kích thước màn hình
const { width } = useWindowSize();

// Tìm kiếm
const searchCountry = ref("");

// Phân nhóm dựa trên kích thước màn hình
const groupedCustomers = computed(() => {
  const itemsPerRow = width.value < 600 ? 1 : width.value < 1024 ? 2 : 3; // 1: Mobile, 2: Tablet, 3: Desktop
  const groups = [];
  for (let i = 0; i < customers.value.length; i += itemsPerRow) {
    groups.push(customers.value.slice(i, i + itemsPerRow));
  }
  return groups;
});

// Lọc danh sách quốc gia theo tìm kiếm
const filteredCountries = computed(() => {
  if (!searchCountry.value.trim()) return groupedCustomers.value;
  return groupedCustomers.value.map((group) =>
    group.filter((country) =>
      country.name.toLowerCase().includes(searchCountry.value.toLowerCase())
    )
  );
});

const initializeData = async () => {
  loading.value = true;
  const countries = await GetAllCountries();
  customers.value = countries;
  loading.value = false;
};

onMounted(() => {
  initializeData();
});

// Handle country click
const onCountryClick = (country) => {
  selectedCountry.value = country; // Update selected country
  console.log("Selected Country: ", selectedCountry.value);
};

// `You have bought items for ${totalPrice.value} USD!`;
const onBuy = () => {
  push.warning("Feature in development");
};
</script>

<style scoped>
.selected-country {
  background-color: #56ccf2; /* Highlight color */
  color: white;
  border-radius: 5px;
}

.country-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.country-item:hover {
  background-color: #f1f1f1;
}

.flag-image {
  width: 30px;
  height: auto;
  margin-right: 10px;
}

.country-name {
  font-size: 1rem;
}
</style>
