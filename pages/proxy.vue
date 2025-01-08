<template>
  <div class="proxy-containter">
    <Breadcrumb :home="home" :model="items" />

    <h4 class="grey-doc-text-red-bg">
      ⚠ Proxies are not allowed to be used in illegal activities. Responsibility
      when using a proxy lies with the buyer. Our proxies are suitable only for
      white purposes.
    </h4>
    <div class="tab-container">
      <TabMenu :model="tabs" v-model="activeTab" class="custom-tab-menu" />

      <div class="tab-content">
        <div v-if="activeTab === 0">
          zzz
          <OrderSection />
        </div>
        <div v-if="activeTab === 1">
          yyy
          <MyProxySection />
        </div>
        <div v-if="activeTab === 2">
          xxx
          <FAQSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Proxy" }]);
const customers = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const tabs = [
  { label: "Order", icon: "pi pi-shopping-cart" },
  { label: "My Proxy", icon: "pi pi-server" },
  { label: "F.A.Q.", icon: "pi pi-question" },
];

const activeTab = ref(0);

</script>

<style scoped>
.flex-container {
  display: flex;
  gap: 2rem;
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

.grey-doc-text-red-bg {
  background: rgb(255, 68, 0);
  color: #ffffff;
  font-weight: normal;
  margin: 10px 0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}

.tab-container {
  padding: 1rem;
}

.custom-tab-menu {
  margin-bottom: 1rem;
}

.tab-content {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
