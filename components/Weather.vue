<template>
  <div class="weather-container">
    <div v-if="weather" class="weather-info">
      <span class="temperature">{{ Math.round(weather.temp) }}°C</span>
      <span class="description">{{ weather.description }}</span>
    </div>
    <!-- Rain effect container -->
    <div v-if="isRaining" class="rain-container">
      <div v-for="n in 50" :key="n" class="rain-drop"></div>
    </div>
    <!-- Sun effect container -->
    <div v-if="isSunny" class="sun-container">
      <div class="sun"></div>
      <div v-for="n in 8" :key="n" class="sun-ray"></div>
    </div>
    <!-- Cloud effect container -->
    <div v-if="isCloudy" class="cloud-container">
      <div class="cloud cloud1"></div>
      <div class="cloud cloud2"></div>
      <div class="cloud cloud3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const weather = ref(null);
const API_KEY = "fd3ef1dfb38b4a1da7a104858252805";
const CITY = "Tokyo";

const isRaining = computed(() => {
  if (!weather.value) return false;
  const rainKeywords = ["rain", "drizzle", "shower", "thunder"];
  return rainKeywords.some((keyword) =>
    weather.value.description.toLowerCase().includes(keyword)
  );
});

const isSunny = computed(() => {
  if (!weather.value) return false;
  const sunKeywords = ["clear", "sunny", "sun"];
  return sunKeywords.some((keyword) =>
    weather.value.description.toLowerCase().includes(keyword)
  );
});

const isCloudy = computed(() => {
  if (!weather.value) return false;
  const cloudKeywords = ["cloud", "overcast", "partly cloudy"];
  return cloudKeywords.some((keyword) =>
    weather.value.description.toLowerCase().includes(keyword)
  );
});

const fetchWeather = async () => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Weather API Error: ${data.error?.message || response.statusText}`
      );
    }

    weather.value = {
      temp: data.current.temp_c,
      description: data.current.condition.text,
    };
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    weather.value = {
      temp: null,
      description: "Weather data unavailable",
    };
  }
};

onMounted(() => {
  fetchWeather();
  // Update weather every 30 minutes
  setInterval(fetchWeather, 30 * 60 * 1000);
});
</script>

<style scoped>
.weather-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.weather-info {
  position: fixed;
  bottom: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 8px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}

.temperature {
  font-size: 16px;
  font-weight: bold;
}

.description {
  font-size: 12px;
  text-transform: capitalize;
}

/* Rain effect styles */
.rain-container {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.rain-drop {
  position: absolute;
  width: 2px;
  height: 100px;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.8));
  animation: rain linear infinite;
}

.rain-drop:nth-child(odd) {
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.6));
}

@keyframes rain {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(100vh);
  }
}

/* Sun effect styles */
.sun-container {
  position: fixed;
  bottom: 50px;
  left: 50px;
}

.sun {
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #ffd700, #ff8c00);
  border-radius: 50%;
  box-shadow: 0 0 40px #ffd700;
  animation: pulse 2s infinite;
}

.sun-ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  transform-origin: left center;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 40px #ffd700;
  }
  50% {
    box-shadow: 0 0 60px #ffd700;
  }
  100% {
    box-shadow: 0 0 40px #ffd700;
  }
}

/* Position rain drops randomly */
.rain-drop:nth-child(1) {
  left: 5%;
  animation-duration: 1s;
}
.rain-drop:nth-child(2) {
  left: 15%;
  animation-duration: 1.2s;
}
.rain-drop:nth-child(3) {
  left: 25%;
  animation-duration: 0.9s;
}
.rain-drop:nth-child(4) {
  left: 35%;
  animation-duration: 1.1s;
}
.rain-drop:nth-child(5) {
  left: 45%;
  animation-duration: 1.3s;
}

/* Position sun rays */
.sun-ray:nth-child(1) {
  transform: rotate(0deg);
}
.sun-ray:nth-child(2) {
  transform: rotate(45deg);
}
.sun-ray:nth-child(3) {
  transform: rotate(90deg);
}
.sun-ray:nth-child(4) {
  transform: rotate(135deg);
}
.sun-ray:nth-child(5) {
  transform: rotate(180deg);
}
.sun-ray:nth-child(6) {
  transform: rotate(225deg);
}
.sun-ray:nth-child(7) {
  transform: rotate(270deg);
}
.sun-ray:nth-child(8) {
  transform: rotate(315deg);
}

/* Cloud effect styles */
.cloud-container {
  position: fixed;
  bottom: 50px;
  left: 50px;
  width: 200px;
  height: 100px;
}

.cloud {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: float 8s infinite ease-in-out;
}

.cloud:before,
.cloud:after {
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

.cloud1 {
  width: 60px;
  height: 20px;
  left: 0;
  bottom: 0;
  animation-delay: 0s;
}

.cloud1:before {
  width: 30px;
  height: 30px;
  top: -15px;
  left: 10px;
}

.cloud1:after {
  width: 20px;
  height: 20px;
  top: -10px;
  left: 30px;
}

.cloud2 {
  width: 80px;
  height: 25px;
  left: 40px;
  bottom: 20px;
  animation-delay: 2s;
}

.cloud2:before {
  width: 35px;
  height: 35px;
  top: -17px;
  left: 15px;
}

.cloud2:after {
  width: 25px;
  height: 25px;
  top: -12px;
  left: 40px;
}

.cloud3 {
  width: 70px;
  height: 22px;
  left: 100px;
  bottom: 10px;
  animation-delay: 4s;
}

.cloud3:before {
  width: 32px;
  height: 32px;
  top: -16px;
  left: 12px;
}

.cloud3:after {
  width: 22px;
  height: 22px;
  top: -11px;
  left: 35px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
