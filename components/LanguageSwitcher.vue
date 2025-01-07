<template>
  <div class="language-switcher">
    <Dropdown
      v-model="selectedLocale"
      :options="locales"
      option-label="label"
      option-value="value"
      @change="switchLocale"
      placeholder="Select Language"
      class="language-dropdown"
    >
      <template #item="slotProps">
        <div class="language-item">
          <span :class="`flag-icon ${slotProps.option.icon}`"></span>
          <!-- Biểu tượng lá cờ -->
          {{ slotProps.option.label }}
          <!-- Tên ngôn ngữ -->
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

// Lưu trữ thông tin ngôn ngữ cùng với biểu tượng lá cờ
const { locale, availableLocales } = useI18n();

const locales = [
  { label: "English", value: "en", icon: "flag-icon-us" },
  { label: "Tiếng Việt", value: "vi", icon: "flag-icon-vn" },
  // Thêm các ngôn ngữ và biểu tượng lá cờ tương ứng tại đây
];

const selectedLocale = locale;

const switchLocale = (event) => {
  locale.value = event.value;
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  justify-content: flex-end; /* Đặt ngôn ngữ ở bên phải */
  margin: 10px 0;
}

.language-dropdown {
  width: 150px;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 8px; /* Khoảng cách giữa biểu tượng và tên ngôn ngữ */
}

.language-item .flag-icon {
  width: 20px; /* Điều chỉnh kích thước lá cờ */
  height: 15px;
}
</style>
