<template>
  <div class="profile-page">
    <div class="profile-header">
      <h2>User Profile</h2>
    </div>

    <div class="profile-body">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          class="form-control"
          :value="userInfo?.firstName"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          class="form-control"
          :value="userInfo?.lastName"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="id">User ID</label>
        <input
          type="text"
          id="id"
          class="form-control"
          :value="userInfo?.id"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="balanceAmount">Balance</label>
        <input
          type="text"
          id="balanceAmount"
          class="form-control"
          :value="`${userInfo?.balanceAmount} USDT`"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="depositAddress">Deposit Address</label>
        <input
          type="text"
          id="depositAddress"
          class="form-control"
          :value="userInfo?.depositAddress || 'Not provided.'"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const userInfo = ref(null);

// Fetch user information from localStorage
const fetchUserInfoFromLocalStorage = () => {
  const storedData = localStorage.getItem("userInfo");
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (parsedData.success) {
        userInfo.value = parsedData.data;
      } else {
        console.error("User data is not valid.");
      }
    } catch (error) {
      console.error("Error parsing user info from localStorage:", error);
    }
  } else {
    console.warn("No user info found in localStorage.");
  }
};

onMounted(fetchUserInfoFromLocalStorage);
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-body {
  text-align: left;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #666;
}

input:disabled {
  background-color: #f1f1f1;
  cursor: not-allowed;
}
</style>
