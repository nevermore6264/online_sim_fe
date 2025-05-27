<template>
  <div class="proxy-containter">
    <div class="tab-container">
      <TabMenu
        :model="
          tabs.map((tab) => ({ label: $t(tab.labelKey), icon: tab.icon }))
        "
        v-model="activeTab"
        class="custom-tab-menu"
        @update:activeIndex="activeTab = $event"
      />

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
import { ref } from "vue";
import UserService from "@/services/user";

const tabs = [
  { labelKey: "buy_otp.order", icon: "pi pi-shopping-cart" },
  { labelKey: "buy_otp.my_otp", icon: "pi pi-server" },
];

const activeTab = ref(0);
const myOTPSection = ref(null);

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

.custom-tab-menu {
  margin-bottom: 1rem;
}
</style>
