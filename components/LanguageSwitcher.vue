<template>
  <div class="language-switcher">
    <Button
      v-for="locale in locales"
      :key="locale"
      @click="switchLocale(locale)"
      :class="{ active: locale === currentLocale }"
    >
      <img
        alt="flag"
        :src="getFlagUrl(locale)"
        class="flag"
        style="width: 24px; height: 24px"
      />
    </Button>
  </div>
  <!-- <p>{{ $t("welcome") }}</p> -->
</template>

<script setup>
import { useI18n } from "vue-i18n";

// Lấy đối tượng i18n
const { locale, availableLocales } = useI18n();
const locales = availableLocales; // Danh sách ngôn ngữ có sẵn
const currentLocale = locale; // Ngôn ngữ hiện tại

// Chuyển đổi ngôn ngữ
const switchLocale = (newLocale) => {
  locale.value = newLocale;
};

// Hàm để lấy URL của biểu tượng lá cờ
const getFlagUrl = (locale) => {
  const flagMap = {
    en: "https://flagsapi.com/GB/flat/64.png",
    vi: "https://flagsapi.com/VN/flat/64.png",
  };
  return flagMap[locale] || "";
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 10px;
  margin: 10px 20px;
  justify-content: flex-end;
}

button {
  padding: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3b82f6;
}

button.active {
  background-color: #2aabee;
}
</style>
