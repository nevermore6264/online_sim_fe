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

const customers = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const rentalDays = ref(5); // Giá trị ban đầu
const quantity = ref(1);
const totalPrice = ref(1.92); // Giá mặc định (có thể thay đổi)

const maxDays = 100;
const step = 5;

const labels = Array.from({ length: maxDays / step + 1 }, (_, i) => i * step);

const quantityLabels = Array.from({ length: 11 }, (_, i) => i * 100);

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

// `You have bought items for ${totalPrice.value} USD!`;
const onBuy = () => {
  push.warning("Feature in development");
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
  padding: 0.75rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.75rem;
}
</style>
