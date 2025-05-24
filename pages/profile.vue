<template>
  <div class="profile-page">
    <div class="profile-header">
      <h2>User Profile</h2>
    </div>

    <div class="profile-content">
      <!-- Left Column - User Info -->
      <div class="profile-info">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" class="form-control" :value="userInfo?.firstName" disabled />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" class="form-control" :value="userInfo?.lastName" disabled />
        </div>

        <div class="form-group">
          <label for="id">User ID</label>
          <input type="text" id="id" class="form-control" :value="userInfo?.id" disabled />
        </div>

        <div class="form-group">
          <label for="balanceAmount">Balance</label>
          <input type="text" id="balanceAmount" class="form-control" :value="`${userInfo?.balanceAmount} USD`"
            disabled />
        </div>

        <div class="form-group">
          <label for="depositAddress">Deposit Address</label>
          <input type="text" id="depositAddress" class="form-control"
            :value="userInfo?.depositAddress || 'Not provided.'" disabled />
        </div>
      </div>

      <!-- Right Column - Payment QR Code -->
      <div class="payment-section">
        <h3>Payment QR Code</h3>
        <div class="qr-container">
          <div v-if="qrCodeUrl" class="qr-code">
            <img :src="qrCodeUrl" alt="Payment QR Code" />
          </div>
          <div v-else class="qr-placeholder">
            <i class="fas fa-qrcode"></i>
            <p>Click the button below to generate QR code</p>
          </div>
        </div>
        <button class="generate-qr-btn" @click="generateQRCode" :disabled="isLoading">
          {{ isLoading ? 'Generating...' : 'Generate QR Code' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const userInfo = ref(null);
const qrCodeUrl = ref(null);
const isLoading = ref(false);

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

const generateQRCode = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('{{japansim-sandbox}}/api/web/payment/qrcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userInfo.value?.id
      })
    });

    const data = await response.json();
    if (data.success) {
      qrCodeUrl.value = data.data.qrCodeUrl;
    } else {
      console.error('Failed to generate QR code:', data.message);
    }
  } catch (error) {
    console.error('Error generating QR code:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchUserInfoFromLocalStorage);
</script>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  margin-bottom: 30px;
  text-align: center;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: start;
}

.profile-info {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.payment-section {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.payment-section h3 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.qr-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.qr-code img {
  max-width: 250px;
  height: auto;
}

.qr-placeholder {
  text-align: center;
  color: #666;
}

.qr-placeholder i {
  font-size: 64px;
  margin-bottom: 15px;
  color: #ccc;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #666;
}

input:disabled {
  background-color: #f1f1f1;
  cursor: not-allowed;
}

.generate-qr-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.generate-qr-btn:hover {
  background-color: #45a049;
}

.generate-qr-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
}
</style>
