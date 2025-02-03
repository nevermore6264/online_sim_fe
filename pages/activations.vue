<template>
  <div class="proxy-containter">
    <Breadcrumb :home="home" :model="items" />

    <h4 class="grey-doc-text-red-bg">⚠ {{ t("rent_number.notify") }}</h4>
    <div class="tab-container">
      <TabMenu
        :model="computedTabs"
        v-model="activeTab"
        class="custom-tab-menu"
        @update:activeIndex="activeTab = $event"
      />

      <div class="tab-content">
        <div v-if="activeTab === 0">
          <RentNumberSection />
        </div>
        <div v-if="activeTab === 1">
          <MyNumbersSection />
        </div>
        <div v-if="activeTab === 2">
          <FAQRentNumber />
        </div>
        <div v-if="activeTab === 3">
          <API />
        </div>
        <div v-if="activeTab === 4">
          <ArchieSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: t("tabs.rent_number") }]); // Sử dụng i18n cho label

const activeTab = ref(0);

// Tạo computed property cho các tab
const computedTabs = computed(() => [
  { label: t("tabs.rent_number"), icon: "pi pi-shopping-cart" },
  { label: t("tabs.my_number"), icon: "pi pi-phone" },
  { label: t("tabs.faq"), icon: "pi pi-info-circle" },
  { label: t("tabs.api"), icon: "pi pi-code" },
  { label: t("tabs.archie"), icon: "pi pi-users" },
]);
</script>

<style scoped>
/* Giữ nguyên phần style */
</style>