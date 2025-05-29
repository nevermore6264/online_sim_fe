<template>
  <div class="deposit-page">
    <div class="deposit-header">
      <h2>{{ t("deposit.title") }}</h2>
    </div>

    <div class="deposit-content">
      <!-- VietQR Payment Section -->
      <div class="payment-section">
        <h3>{{ t("deposit.vietqrTitle") }}</h3>
        <div class="form-group">
          <label for="amount">{{ t("deposit.amountLabel") }}</label>
          <input
            type="number"
            id="amount"
            class="form-control"
            v-model="amount"
            min="1000"
            :placeholder="t('deposit.amountPlaceholder')"
            :disabled="isLoading"
          />
        </div>
        <div v-if="amountError" class="amount-error">{{ amountError }}</div>
        <div class="vietqr-container">
          <div class="vietqr-header">
            <img
              src="https://i.gyazo.com/566d62fd25cf0867e0033fb1b9b47927.png"
              alt="VietQR PRO"
              class="vietqr-pro-logo"
            />
          </div>
          <div class="qr-wrapper">
            <qrcode-vue
              v-if="qrData"
              :value="qrData"
              :size="250"
              level="H"
              render-as="svg"
            />
            <div v-else class="qr-placeholder">
              <i class="fas fa-qrcode"></i>
              <p>{{ t("deposit.qrPlaceholder") }}</p>
            </div>
          </div>
          <div class="vietqr-footer">
            <img
              src="https://napas.qltns.mediacdn.vn/479491956813160448/2023/7/21/logo-napas-16899065047812042806293.png"
              class="footer-logo"
            />
            <img
              src="https://finance.vietstock.vn/image/BID"
              class="footer-logo"
            />
          </div>
        </div>
        <button
          class="generate-qr-btn"
          @click="generateQRCode"
          :disabled="isLoading"
        >
          {{
            isLoading ? t("deposit.generatingBtn") : t("deposit.generateBtn")
          }}
        </button>
      </div>

      <!-- Other Payment Methods Section -->
      <div class="other-payment-section">
        <h3>{{ t("deposit.otherMethodsTitle") }}</h3>
        <div class="payment-methods">
          <div class="payment-method-card">
            <i class="fas fa-credit-card"></i>
            <h4>{{ t("deposit.creditCard") }}</h4>
            <p>{{ t("deposit.comingSoon") }}</p>
          </div>
          <div class="payment-method-card">
            <i class="fas fa-wallet"></i>
            <h4>{{ t("deposit.eWallet") }}</h4>
            <p>{{ t("deposit.comingSoon") }}</p>
          </div>
          <div class="payment-method-card">
            <i class="fas fa-money-bill-wave"></i>
            <h4>{{ t("deposit.cashPayment") }}</h4>
            <p>{{ t("deposit.comingSoon") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import QrcodeVue from "qrcode.vue";
import paymentService from "../services/payment";

const { t } = useI18n();
const qrData = ref(null);
const isLoading = ref(false);
const amount = ref("");
const amountError = ref("");

const generateQRCode = async () => {
  amountError.value = "";
  const value = parseInt(amount.value, 10);
  try {
    isLoading.value = true;
    qrData.value = null;
    const data = await paymentService.createPaymentQRCode(value);
    if (data.success && data.data) {
      qrData.value = data.data;
    } else {
      amountError.value = t("deposit.qrError");
    }
  } catch (error) {
    amountError.value = t("deposit.qrApiError");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.deposit-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.deposit-header {
  margin-bottom: 30px;
  text-align: center;
}

.deposit-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: start;
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

.other-payment-section {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.payment-section h3,
.other-payment-section h3 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.vietqr-container {
  text-align: center;
}

.vietqr-header {
  margin-bottom: 8px;
}

.vietqr-pro-logo {
  height: 40px;
}

.qr-wrapper {
  position: relative;
  display: inline-block;
}

.vietqr-footer {
  margin-top: 8px;
}

.footer-logo {
  height: 24px;
  margin: 0 8px;
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
  background-color: #2aabee;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.generate-qr-btn:hover {
  background-color: #2196f3;
}

.generate-qr-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.amount-error {
  color: #e74c3c;
  margin-bottom: 10px;
  text-align: left;
  font-size: 14px;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.payment-method-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s;
}

.payment-method-card:hover {
  transform: translateY(-5px);
}

.payment-method-card i {
  font-size: 2em;
  color: #2aabee;
  margin-bottom: 10px;
}

.payment-method-card h4 {
  margin: 10px 0;
  color: #333;
}

.payment-method-card p {
  color: #666;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .deposit-content {
    grid-template-columns: 1fr;
  }
}
</style>
