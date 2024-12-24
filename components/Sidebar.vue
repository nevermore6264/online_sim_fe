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
  { label: "Receive SMS", icon: "pi pi-fw pi-home", to: "/receive-sms" },
  {
    label: "Mobile proxies",
    icon: "pi pi-fw pi-id-card",
    to: "/mobile-proxies",
  },
  {
    label: "Number rent",
    icon: "pi pi-fw pi-check-square",
    to: "/number-rent",
  },
  {
    label: "Referral program",
    icon: "pi pi-fw pi-bookmark",
    to: "/referral-program",
  },
  {
    label: "Refill balance",
    icon: "pi pi-fw pi-exclamation-circle",
    to: "/refill-balance",
  },
  { label: "SMS history", icon: "pi pi-fw pi-mobile", to: "/sms-history" },
  { label: "Checkout", icon: "pi pi-fw pi-table", to: "/checkout" },
  { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
  { label: "Tickets", icon: "pi pi-fw pi-share-alt", to: "/tickets" },
  { label: "Notifications", icon: "pi pi-fw pi-tablet", to: "/notifications" },
];
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
  height: calc(100vh - 100px);
  position: fixed;
  left: 0;
  top: 0;
  padding: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 10px 20px;
  font-size: 16px;
  display: block;
  width: 100%;
}

.sidebar li a {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar li:hover {
  width: 100%;
  background: #00d2ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #3a7bd5,
    #00d2ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #3a7bd5,
    #00d2ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.sidebar li a:hover {
  color: #ffffff;
}

.menu-icon {
  font-size: 16px;
}
</style>
