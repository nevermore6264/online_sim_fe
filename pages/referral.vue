<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
      {{ $t("referral.title") }}
    </h1>

    <div
      v-if="isLoggedIn"
      class="bg-white rounded-xl shadow-lg p-8 mb-8 transform transition-all duration-300 hover:shadow-xl"
    >
      <div v-if="loading" class="text-center py-8">
        <i
          class="pi pi-spin pi-spinner text-primary"
          style="font-size: 2.5rem"
        ></i>
        <p class="mt-4 text-gray-600 text-lg">Loading...</p>
      </div>

      <template v-else>
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">
          {{ $t("referral.yourCode") }}
        </h2>
        <div class="flex items-center gap-4 mb-8">
          <code
            class="bg-gray-50 px-6 py-3 rounded-lg text-lg font-mono border border-gray-200 shadow-sm"
            >{{ userReferralCode }}</code
          >
          <button
            @click="copyToClipboard"
            class="custom-button"
            :disabled="!userReferralCode"
          >
            <i class="pi pi-copy mr-2"></i>
            {{ $t("referral.copy") }}
          </button>
        </div>

        <div class="mt-8">
          <h3 class="font-medium mb-4 text-lg text-gray-700">
            {{ $t("referral.shareLink") }}
          </h3>
          <div class="flex items-center gap-4">
            <input
              type="text"
              :value="referralLink"
              readonly
              class="flex-1 bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 shadow-sm text-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
            <button
              @click="copyLinkToClipboard"
              class="custom-button"
              :disabled="!userReferralCode"
            >
              <i class="pi pi-link mr-2"></i>
              {{ $t("referral.copyLink") }}
            </button>
          </div>
        </div>

        <div class="mt-8 text-center">
          <a
            :href="partnerDashboardLink"
            target="_blank"
            rel="noopener noreferrer"
            class="partner-dashboard-button"
          >
            <i class="pi pi-briefcase mr-2"></i>
            {{ $t("referral.partnerDashboard") }}
          </a>
        </div>

        <!-- Become an Agent section -->
        <div v-if="!isAgent" class="mt-8 text-center">
          <div
            class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200"
          >
            <h3 class="text-lg font-semibold mb-4 text-gray-800">
              {{ $t("referral.becomeAgent.title") }}
            </h3>
            <p class="text-gray-600 mb-4">
              {{ $t("referral.becomeAgent.description") }}
            </p>
            <button
              @click="becomeAgent"
              :disabled="becomingAgent"
              class="become-agent-button"
            >
              <i v-if="becomingAgent" class="pi pi-spin pi-spinner mr-2"></i>
              <i v-else class="pi pi-star mr-2"></i>
              {{
                becomingAgent
                  ? $t("referral.becomeAgent.processing")
                  : $t("referral.becomeAgent.button")
              }}
            </button>
          </div>
        </div>
      </template>
    </div>

    <div v-else class="bg-white rounded-xl shadow-lg p-8 text-center">
      <p class="text-gray-600 text-lg mb-6">
        {{ $t("referral.loginRequired") }}
      </p>
      <div class="flex justify-center gap-4">
        <Button
          :label="$t('landing.login')"
          @click="() => $router.push('/login')"
          class="custom-button"
        />
        <Button
          :label="$t('landing.signup')"
          @click="() => $router.push('/signup')"
          class="custom-button"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import UserService from "@/services/user";
import { push } from "notivue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const isLoggedIn = ref(false);
const userReferralCode = ref("");
const loading = ref(false);
const userInfo = ref(null);
const isAgent = ref(false);
const becomingAgent = ref(false);

const referralLink = computed(() => {
  if (!userReferralCode.value) return "";
  const domain = useRuntimeConfig().public.appDomain;
  return `${domain}/invite/${userReferralCode.value}`;
});

const partnerDashboardLink = computed(() => {
  const domain = useRuntimeConfig().public.appDomain;
  return `${domain}/partner`;
});

// Function to copy code to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(userReferralCode.value);
    push.success("Referral code copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy:", err);
    push.error("Failed to copy referral code");
  }
};

// Function to copy link to clipboard
const copyLinkToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(referralLink.value);
    push.success("Referral link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy:", err);
    push.error("Failed to copy referral link");
  }
};

// Function to fetch referral data
const fetchReferralData = async () => {
  try {
    loading.value = true;
    const response = await UserService.GetReferralCode();

    if (response.success) {
      userReferralCode.value = response.data.referralCode;
    }
  } catch (error) {
    console.error("Error fetching referral data:", error);
    push.error("Failed to load referral data");
  } finally {
    loading.value = false;
  }
};

// Function to fetch user info
const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await UserService.GetCurrentAccount(token);
    if (response.success) {
      userInfo.value = response.data;
      isAgent.value = response.data.isAgent || false;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

// Function to become an agent
const becomeAgent = async () => {
  try {
    becomingAgent.value = true;
    const response = await UserService.BecomeAgent();

    if (response.success) {
      push.success(t("referral.becomeAgent.success"));
      // Refresh user info to update isAgent status
      await fetchUserInfo();
    } else {
      push.error(response.message || t("referral.becomeAgent.error"));
    }
  } catch (error) {
    console.error("Error becoming agent:", error);
    push.error(t("referral.becomeAgent.error"));
  } finally {
    becomingAgent.value = false;
  }
};

// On component mount, check if user is logged in and get their referral code
onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    isLoggedIn.value = true;
    await Promise.all([fetchReferralData(), fetchUserInfo()]);
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

code {
  font-family: "Fira Code", monospace;
  font-size: 1.1em;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #f3f4f6, #e5e7eb);
}

.custom-button {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #ff9800, #ffc107);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-button:disabled {
  background: #e5e7eb;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.partner-dashboard-button {
  background: linear-gradient(135deg, #42a5f5, #1e88e5);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.partner-dashboard-button:hover {
  background: linear-gradient(135deg, #1e88e5, #42a5f5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.become-agent-button {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.become-agent-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed, #8b5cf6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.become-agent-button:disabled {
  background: #e5e7eb;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

input {
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #ffc107;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container > * {
  animation: fadeIn 0.5s ease-out;
}
</style>
