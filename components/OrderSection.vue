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

    <div class="slider-container rental-period-slider">
      <h4>2. Select rental period days</h4>
      <Slider
        v-model="rentalDays"
        :min="0"
        :max="100"
        :step="1"
        :range="false"
      />
      <div class="slider-labels rental-labels">
        <span
          v-for="(label, index) in labels"
          :key="index"
          :style="{ left: `${(label / maxDays) * 100}%` }"
          class="slider-label rental-label"
        >
          {{ label }}
        </span>
      </div>
      <p class="selected-days">Selected Days: {{ rentalDays }}</p>
    </div>

    <div class="row quantity-slider">
      <div class="col-xs-30">
        <h4>3. Select quantity</h4>
        <Slider
          v-model="quantity"
          :min="1"
          :max="1000"
          :step="1"
          class="w-full"
          :style="{ marginTop: '20px', marginBottom: '20px' }"
        />
        <div class="slider-labels quantity-labels">
          <span
            v-for="(label, index) in quantityLabels"
            :key="index"
            :style="{ left: `${(label / 1000) * 100}%` }"
            class="slider-label quantity-label"
          >
            {{ label }}
          </span>
        </div>
        <p class="quantity-display">Selected Quantity: {{ quantity }}</p>
      </div>
    </div>

    <div class="row">
      <!-- Total Price Section -->
      <div class="col-xs-30">
        <h4>Total</h4>
        <p>Price: {{ totalPrice }} USD</p>
        <Button label="Buy" class="p-button-success btn-buy" @click="onBuy" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { GetAllCountries } from "@/services/country.js";
import { push } from "notivue";
import { useWindowSize } from "@vueuse/core";

const customers = ref([]);
const loading = ref(false);
const selectedCountry = ref(null);
const rentalDays = ref(1); // Default rental days
const quantity = ref(1); // Default quantity
const pricePerDay = 10; // Example price per day
const searchCountry = ref("");

const { width } = useWindowSize();

const groupedCustomers = computed(() => {
  const itemsPerRow = width.value < 600 ? 1 : width.value < 1024 ? 2 : 3;
  const groups = [];
  for (let i = 0; i < customers.value.length; i += itemsPerRow) {
    groups.push(customers.value.slice(i, i + itemsPerRow));
  }
  return groups;
});

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

const totalPrice = computed(() => {
  return rentalDays.value * quantity.value * pricePerDay;
});

onMounted(() => {
  initializeData();
});

const onCountryClick = (country) => {
  selectedCountry.value = country;
};

const onBuy = () => {
  push.success(`You have bought items for ${totalPrice.value} USD!`);
};
</script>

<style scoped>
.search-container {
  margin-bottom: 1rem;
}

.proxy-containter .p-datatable-thead {
  display: none !important;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-container h4,
.slider-container h4,
.quantity-slider h4 {
  padding: 15px 25px;
  font-weight: 600;
  background: grey;
  border-radius: 5px;
  transition: background-color 0.2s;
  cursor: pointer;
  margin-bottom: 15px;
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

.rental-period-slider .slider-labels {
  height: 30px;
  width: 100%;
  position: relative;
}

.rental-period-slider .slider-label {
  position: absolute;
  top: 10px;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: #555;
}

/* Quantity slider styles */
.quantity-slider .slider-labels {
  height: 30px;
  width: 100%;
  position: relative;
  margin-top: -10px;
}

.quantity-slider .slider-label {
  position: absolute;
  top: 10px;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: #555;
}

.quantity-display {
  font-size: 16px;
  margin-top: 10px;
}

.w-full {
  width: 100%;
}

.btn-buy {
  background: linear-gradient(to left, #56ccf2, #2f80ed);
  color: #f5f7fa;
  border: none;
  padding: 1rem 5rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.75rem;
}

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
