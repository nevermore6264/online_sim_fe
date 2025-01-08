<template>
  <div class="language-switcher">
    <button
      v-for="locale in locales"
      :key="locale"
      @click="switchLocale(locale)"
      :class="{ active: locale === currentLocale }"
    >
      {{ locale.toUpperCase() }}
    </button>
  </div>
  <p>{{ $t("welcome") }}</p>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale, availableLocales } = useI18n();
const locales = availableLocales;
const currentLocale = locale;

const switchLocale = (newLocale) => {
  locale.value = newLocale;
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

button {
  padding: 5px 10px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background: #ddd;
}

button.active {
  background: #007bff;
  color: #fff;
}
</style>
