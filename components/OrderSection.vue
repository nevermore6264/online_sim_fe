<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a country..."
      class="search-input"
    />
  </div>

  <div class="dataview-container">
    <DataView
      :value="filteredCustomers"
      :layout="'grid'"
      :rows="4"
      :loading="loading"
      :emptyMessage="'No countries found.'"
    >
      <template #grid="{ data }">
        <!-- <div v-if="data.length" class="grid-container"> -->
        <div v-for="item in data" :key="item.id" class="grid-item">
          <img
            :src="`https://flagsapi.com/${item.code}/flat/64.png`"
            alt="flag"
            class="flag"
          />
          <div class="country-info">
            <h4>{{ item.text.name }}</h4>
            <p>Code: {{ item.code }}</p>
          </div>
        </div>
        <!-- <div v-else>No data to display.</div> -->
      </template>
    </DataView>

    <div class="slider-container">
      <h4>Select rental period days</h4>
      <Slider
        v-model="rentalDays"
        :min="5"
        :max="360"
        :step="5"
        :style="{ width: '80%' }"
        :range="false"
      />
      <div class="slider-labels">
        <span
          v-for="(label, index) in labels"
          :key="index"
          :style="{ left: `${(label / maxDays) * 100}%` }"
          class="slider-label"
        >
          {{ label }}
        </span>
      </div>
      <p class="selected-days">Selected Days: {{ rentalDays }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { GetAllCountries } from "@/services/country.js";

const customers = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const rentalDays = ref(5); // Giá trị ban đầu
const minDays = 5;
const maxDays = 360;
const step = 30;

// Sinh ra các nhãn (ví dụ: 5, 30, 60, 90, ...)
const labels = Array.from(
  { length: (maxDays - minDays) / step + 1 },
  (_, i) => minDays + i * step
);
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value;
  return customers.value.filter((customer) =>
    customer.country.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
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
</script>

<style scoped>
.search-container {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.dataview-container {
  margin-top: 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.grid-item {
  background: #f9f9f9;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.flag {
  width: 50px;
  height: auto;
  margin-bottom: 0.5rem;
}

.country-info h4 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

.country-info p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #555;
}

.slider-container {
  margin: 20px;
  text-align: center;
  position: relative;
}

.slider-labels {
  position: relative;
  height: 30px;
  width: 80%;
  margin: 0 auto;
}

.slider-label {
  position: absolute;
  top: 10px;
  transform: translateX(-50%);
  font-size: 0.9rem;
  color: #555;
}

.selected-days {
  margin-top: 10px;
  font-weight: bold;
}
</style>
