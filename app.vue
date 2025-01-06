<template>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup></script>

<style>
/* Thêm các style toàn cục cho ứng dụng ở đây nếu cần */
body {
  margin: 0;
  font-family: "MyriadSetPro", Arial, sans-serif !important;
}

::-webkit-scrollbar {
  width: 5px;
  height: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2aabee;
}

::-webkit-scrollbar-thumb {
  background: #2aabee;
  border-radius: 8px;
  cursor: pointer;
}

::-webkit-scrollbar-track {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 48%,
    rgba(174, 195, 249, 0.25) 0,
    rgba(174, 195, 249, 0.25) 52%,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0)
  );
  border-radius: 0;
}

.main {
  background: linear-gradient(
    to right,
    #d7f2fe,
    #ffffff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

h1 {
  color: #2c3e50;
}

input {
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* Smooth zoom and shadow transition */
}

button:hover {
  transform: scale(1.05);
  /* Slight zoom in */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  /* Add a subtle shadow for emphasis */
}

table {
  width: 100%;
  border-collapse: unset;
  font-size: 14px;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table th,
table td {
  padding: 12px 15px;
  text-align: left;
}

table th {
  background: #2f80ed;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
}

/* table tr:nth-child(even) {
  background-color: #f9f9f9;
} */

/* table tr {
  border-bottom: 1px solid #ddd;
} */

table tr:hover {
  /* background-color: #f1f1f1; */
  cursor: pointer;
}

/* table td {
  border-bottom: 1px solid #ddd;
} */

/* Optional: Add rounded corners to the table */
table {
  border-radius: 8px;
  overflow: hidden;
}

.p-datatable .p-datatable-header {
  border: 0px !important;
  padding: 0px !important;
}

.p-breadcrumb {
  padding: 0 !important;
}

.auth-dialog {
  width: 50% !important;
}

a:link {
  color: #2aabee;
}

#app-content {
  margin-left: 250px;
  padding: 25px 10px;
  margin-bottom: 60px;
  transition: margin-left 0.3s ease-in-out;
}

.logo-image {
  width: 75px;
}

.landing-page-container {
  width: 100%;
}

@media (max-width: 1366px) {
  .auth-dialog {
    width: 75% !important;
    margin: 0 auto !important;
  }

  .flex-container {
    flex-direction: column;
  }

  .search-input {
    width: 100% !important;
  }

  .search-container {
    margin-right: 0 !important;
  }

  #footer .p-grid {
    flex-direction: column !important;
    gap: 10px !important;
  }

  .bubbles {
    display: none !important;
  }

  #footer {
    padding-top: 0px !important;
  }

  .main-footer {
    grid-template-rows: 0fr 0rem auto !important;
  }

  .hNews-card__container {
    flex-direction: column !important;
  }

  .hNews-card__right {
    width: 100% !important;
  }

  .hNews-card_left {
    width: 100% !important;
    margin-bottom: 20px !important;
  }
}

@media (max-width: 768px) {
  .auth-dialog {
    width: 90% !important;
    margin: 0 auto !important;
  }

  .flex-container {
    flex-direction: column;
  }

  .cards-block,
  .cards {
    flex-direction: column !important;
  }

  #footer .p-grid {
    flex-direction: column !important;
    gap: 10px !important;
  }
}
</style>
