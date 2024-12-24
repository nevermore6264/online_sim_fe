<template>
  <aside class="sidebar">
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <NuxtLink :to="item.to">
          <i :class="item.icon" class="menu-icon"></i>
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script setup>
const menuItems = [
  { label: "Receive SMS", icon: "pi pi-fw pi-home", to: "/" }, // Trang Home
  {
    label: "Mobile proxies",
    icon: "pi pi-fw pi-id-card",
    to: "/demo/formlayout",
  },
  { label: "Number rent", icon: "pi pi-fw pi-check-square", to: "/demo/input" },
  {
    label: "Referral program",
    icon: "pi pi-fw pi-bookmark",
    to: "/demo/floatlabel",
  },
  {
    label: "Refill balance",
    icon: "pi pi-fw pi-exclamation-circle",
    to: "/demo/invalidstate",
  },
  { label: "SMS history", icon: "pi pi-fw pi-mobile", to: "/demo/button" },
  { label: "Checkout", icon: "pi pi-fw pi-table", to: "/demo/table" },
  { label: "List", icon: "pi pi-fw pi-list", to: "/demo/list" },
  { label: "Tickets", icon: "pi pi-fw pi-share-alt", to: "/demo/tree" },
  { label: "Notifications", icon: "pi pi-fw pi-tablet", to: "/demo/panel" },
];
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 15px;
  border-right: 1px solid #ddd;
  height: calc(100vh - 100px);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar li a {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar li a:hover {
  color: #007bff;
}

.menu-icon {
  font-size: 16px;
}
</style>
