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
        <h3>TRC20 Network</h3>
        <div class="payment-methods">
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
            "
          >
            <div class="network-icon trc20-network-icon-outside">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsWaz0K2kxYpSFMhQ2pPdBcnOwpQHWYEyzw&s"
                alt="TRC20"
                class="network-logo"
              />
            </div>
            <div
              class="payment-method-card payment-method-card--trc20"
              @click="showTrc20Address"
              style="cursor: pointer"
            >
              <p>{{ t("deposit.clickToGetAddress") }}</p>
            </div>
          </div>
        </div>
        <div
          v-if="trc20Info.address || trc20Loading || trc20Error"
          class="trc20-address-box"
        >
          <div v-if="trc20Loading" class="trc20-loading">
            {{ t("deposit.loading") }}
          </div>
          <div v-else-if="trc20Error" class="trc20-error">{{ trc20Error }}</div>
          <div v-else>
            <div class="trc20-address-row">
              <input
                class="trc20-address-input"
                :value="trc20Info.address"
                readonly
              />
              <button class="trc20-copy-btn" @click="copyTrc20Address">
                <span class="copy-icon">📋</span> {{ t("deposit.copy") }}
              </button>
            </div>
            <div class="trc20-info">
              <div>
                <b>{{ t("deposit.minAmount") }}:</b> {{ trc20Info.min }} USDT
              </div>
              <div>
                <b>{{ t("deposit.validFor") }}:</b> 1 {{ t("deposit.hour") }}
              </div>
              <div>
                <b>{{ t("deposit.rate") }}:</b> 1 USDT = ₹1
                {{ t("deposit.inYourWallet") }}
              </div>
            </div>
            <div class="trc20-note">{{ t("deposit.erc20Note") }}</div>
          </div>
        </div>
      </div>
      <!-- ERC20 & BEP20 Coming Soon Section -->
      <div class="other-networks-section">
        <div class="payment-methods">
          <div class="payment-method-card">
            <div class="network-icon">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s"
                alt="ERC20"
                class="network-logo"
              />
            </div>
            <h4>{{ t("deposit.erc20") }}</h4>
            <p>{{ t("deposit.comingSoon") }}</p>
          </div>
          <div class="payment-method-card">
            <div class="network-icon">
              <img
                src="data:image/png;base64,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"
                alt="BEP20"
                class="network-logo"
              />
            </div>
            <h4>{{ t("deposit.bep20") }}</h4>
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

// TRC20 Address State
const trc20Info = ref({ address: "", type: "", min: 10, valid: 60, rate: 1 });
const trc20Loading = ref(false);
const trc20Error = ref("");

const showTrc20Address = async () => {
  trc20Error.value = "";
  trc20Loading.value = true;
  try {
    const token = localStorage.getItem("token");
    const data = await paymentService.createTrc20Address(token);
    if (data.success && data.data) {
      trc20Info.value.address = data.data.address;
      trc20Info.value.type = data.data.type;
    } else {
      trc20Error.value = t("deposit.qrError");
    }
  } catch (e) {
    trc20Error.value = t("deposit.qrApiError");
  } finally {
    trc20Loading.value = false;
  }
};

const copyTrc20Address = async () => {
  try {
    await navigator.clipboard.writeText(trc20Info.value.address);
    push.success(t("deposit.copied"));
  } catch {
    push.success("Copy failed!");
  }
};

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

.network-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.network-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.payment-method-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s;
  border: 1px solid #eee;
}

.payment-method-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.payment-method-card h4 {
  margin: 10px 0;
  color: #333;
  font-size: 1.1em;
}

.payment-method-card p {
  color: #666;
  font-size: 0.9em;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .deposit-content {
    grid-template-columns: 1fr;
  }
}

.trc20-address-box {
  background: linear-gradient(135deg, #23272e 60%, #2aabee 100%);
  border-radius: 18px;
  border: 1.5px solid #2aabee33;
  box-shadow: 0 4px 24px rgba(42, 171, 238, 0.1);
  color: #fff;
  padding: 28px 24px 18px 24px;
  margin: 24px auto 0 auto;
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.08em;
  position: relative;
  transition: box-shadow 0.2s, border 0.2s;
}
.trc20-address-box::before {
  content: "";
  display: block;
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, #2aabee 0%, #2196f3 100%);
  opacity: 0.7;
}
.trc20-address-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.trc20-address-input {
  color: #2aabee;
  font-family: monospace;
  font-size: 1.1em;
  flex: 1;
  word-break: break-all;
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px 10px;
  margin-right: 10px;
}
.trc20-address-input:read-only {
  background: #f9f9f9;
}
.trc20-copy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(90deg, #2aabee 0%, #2196f3 100%);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 8px 20px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(42, 171, 238, 0.1);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
}
.trc20-copy-btn:hover {
  background: linear-gradient(90deg, #2196f3 0%, #2aabee 100%);
  box-shadow: 0 4px 16px rgba(42, 171, 238, 0.18);
  transform: translateY(-2px) scale(1.04);
}
.copy-icon {
  font-size: 1.15em;
  margin-right: 2px;
}
.trc20-info {
  color: #fff;
  font-size: 1em;
  text-align: left;
  margin-top: 8px;
}
.trc20-info > div {
  margin-bottom: 4px;
}
.trc20-note {
  color: #b0b0b0;
  font-size: 0.95em;
  margin-top: 10px;
  text-align: left;
}
.trc20-loading {
  color: #2aabee;
  font-size: 1.1em;
  margin: 10px 0;
}
.trc20-error {
  color: #e74c3c;
  font-size: 1.1em;
  margin: 10px 0;
}

.payment-method-card--trc20 {
  background: linear-gradient(90deg, #2aabee 0%, #2196f3 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 18px 0;
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 8px rgba(42, 171, 238, 0.1);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  min-width: 220px;
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.payment-method-card--trc20:hover {
  background: linear-gradient(90deg, #2196f3 0%, #2aabee 100%);
  box-shadow: 0 4px 16px rgba(42, 171, 238, 0.18);
  transform: translateY(-2px) scale(1.03);
}
.payment-method-card--trc20 p {
  color: #fff;
  margin: 0;
  font-size: 1.15em;
  font-weight: 700;
}
.payment-method-card--trc20 p {
  color: #e0f2ff;
  font-size: 1em;
  margin: 0;
  font-weight: 400;
}

.trc20-network-icon-outside {
  width: 48px;
  height: 48px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(42, 171, 238, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
