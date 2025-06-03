<template>
  <div class="proxy-containter">
    <div class="tab-container">
      <div class="tab-box">
        <div class="custom-tabs">
          <button
            v-for="(tab, idx) in tabs"
            :key="tab.labelKey"
            :class="['tab-btn', { active: activeTab === idx }]"
            @click="activeTab = idx"
          >
            <i :class="tab.icon"></i> {{ $t(tab.labelKey) }}
          </button>
        </div>
      </div>

      <div class="tab-content">
        <div v-if="activeTab === 0">
          <BuyOTPSectionNew @purchase-success="handlePurchaseSuccess" />
        </div>
        <div v-if="activeTab === 1">
          <MyOTPSection ref="myOTPSection" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import UserService from "@/services/user";

const tabs = [
  { labelKey: "buy_otp.order", icon: "pi pi-shopping-cart" },
  { labelKey: "buy_otp.my_otp", icon: "pi pi-server" },
];

const activeTab = ref(0);
const myOTPSection = ref(null);

// Load saved tab index from localStorage on component mount
onMounted(() => {
  const savedTab = localStorage.getItem("activationsActiveTab");
  if (savedTab !== null) {
    activeTab.value = Number(savedTab);
  }
  console.log("activeTab after mounted:", activeTab.value);
});

// Save tab index to localStorage when it changes
watch(activeTab, (newValue) => {
  localStorage.setItem("activationsActiveTab", newValue.toString());
});

const handlePurchaseSuccess = async () => {
  // Update user balance first
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await UserService.GetCurrentAccount(token);
      if (response.success) {
        localStorage.setItem("userInfo", JSON.stringify(response));
        // Dispatch event to notify about user info update
        window.dispatchEvent(
          new CustomEvent("userInfoUpdated", { detail: response })
        );
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  }

  // Switch to MyOTP tab
  activeTab.value = 1;

  // Refresh MyOTP data
  if (myOTPSection.value?.refreshData) {
    await myOTPSection.value.refreshData();
  }
};
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

.tab-box {
  display: flex;
  justify-content: flex-start;
  background: #f5faff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 2px 8px rgba(42, 171, 238, 0.08);
  width: max-content;
  min-width: 400px;
  margin-bottom: 1.2rem;
}

.custom-tabs {
  display: flex;
  gap: 0;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  padding-left: 0;
  margin-left: 0;
}

.tab-btn {
  background: none;
  border: none;
  padding: 14px 28px 10px 28px;
  cursor: pointer;
  font-weight: 500;
  color: #2196f3;
  font-size: 1.08rem;
  min-width: 200px;
  border-bottom: 3px solid transparent;
  border-radius: 12px 12px 0 0;
  transition: color 0.18s, background 0.18s, border-bottom 0.18s,
    box-shadow 0.18s;
  outline: none;
  position: relative;
  z-index: 1;
}

.tab-btn:not(.active):hover {
  background: #e3f2fd;
  color: #1565c0;
}

.tab-btn.active {
  color: #1565c0;
  background: #fff;
  border-bottom: 4px solid #1565c0;
  z-index: 2;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(42, 171, 238, 0.1);
}

.tab-btn i {
  margin-right: 8px;
  font-size: 1.1em;
  vertical-align: middle;
}
</style>
