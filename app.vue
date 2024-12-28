<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup></script>

<style>
/* Thêm các style toàn cục cho ứng dụng ở đây nếu cần */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px #929292;
  background-color: rgba(172, 164, 164, 0.65);
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
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth zoom and shadow transition */
}

button:hover {
  transform: scale(1.05); /* Slight zoom in */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15); /* Add a subtle shadow for emphasis */
}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
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
  background: #3a7bd5; /* fallback for old browsers */
  color: white;
  text-transform: uppercase;
  font-weight: 600;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

table tr {
  border-bottom: 1px solid #ddd;
}

table tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

table td {
  border-bottom: 1px solid #ddd;
}

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

.app-content {
  margin-left: 250px;
  padding: 1rem;
  margin-bottom: 60px;
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
}

@media (max-width: 768px) {
  .auth-dialog {
    width: 90% !important;
    margin: 0 auto !important;
  }

  .flex-container {
    flex-direction: column;
  }
}
</style>
