<template>
  <div class="proxy-containter">
    <div class="tab-container">
      <TabMenu
        :model="
          tabs.map((tab) => ({ label: $t(tab.labelKey), icon: tab.icon }))
        "
        v-model="activeTab"
        class="custom-tab-menu"
        @update:activeIndex="activeTab = $event"
      />

      <div class="tab-content">
        <div v-if="activeTab === 0">
          <OrderProxySection />
        </div>
        <div v-if="activeTab === 1">
          <MyProxySection />
        </div>
        <div v-if="activeTab === 2">
          <FAQSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tabs = [
  { labelKey: "proxy.tab_order", icon: "pi pi-shopping-cart" },
  { labelKey: "proxy.tab_my_proxy", icon: "pi pi-server" },
  { labelKey: "proxy.tab_faq", icon: "pi pi-info-circle" },
];

const activeTab = ref(0);
</script>

<style scoped>
.proxy-containter {
  margin-top: 20px;
}

.tab-container {
  min-height: 274px;
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

.custom-tab-menu {
  margin-bottom: 1rem;
}
</style>
