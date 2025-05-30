<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">{{ $t("referral.title") }}</h1>

    <div v-if="isLoggedIn" class="bg-white rounded-lg shadow p-6 mb-6">
      <div v-if="loading" class="text-center py-4">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p class="mt-2">Loading...</p>
      </div>

      <template v-else>
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("referral.yourCode") }}
        </h2>
        <div class="flex items-center gap-4">
          <code class="bg-gray-100 px-4 py-2 rounded">{{
            userReferralCode
          }}</code>
          <button
            @click="copyToClipboard"
            class="custom-button"
            :disabled="!userReferralCode"
          >
            {{ $t("referral.copy") }}
          </button>
        </div>

        <div class="mt-4">
          <h3 class="font-medium mb-2">{{ $t("referral.shareLink") }}</h3>
          <div class="flex items-center gap-4">
            <input
              type="text"
              :value="referralLink"
              readonly
              class="flex-1 bg-gray-100 px-4 py-2 rounded"
            />
            <button
              @click="copyLinkToClipboard"
              class="custom-button"
              :disabled="!userReferralCode"
            >
              {{ $t("referral.copyLink") }}
            </button>
          </div>
        </div>
      </template>
    </div>

    <div v-else class="bg-white rounded-lg shadow p-6">
      <p class="text-gray-600">{{ $t("referral.loginRequired") }}</p>
      <div class="mt-4">
        <Button
          :label="$t('landing.login')"
          @click="() => $router.push('/login')"
          class="mr-2"
        />
        <Button
          :label="$t('landing.signup')"
          @click="() => $router.push('/signup')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useReferralStore } from "~/stores/referral";
import UserService from "@/services/user";
import { push } from "notivue";

const isLoggedIn = ref(false);
const userReferralCode = ref("");
const loading = ref(false);

const referralLink = computed(() => {
  if (!userReferralCode.value) return "";
  const domain = useRuntimeConfig().public.appDomain;
  return `${domain}/invite/${userReferralCode.value}`;
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

// On component mount, check if user is logged in and get their referral code
onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    isLoggedIn.value = true;
    await fetchReferralData();
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

code {
  font-family: monospace;
  font-size: 1.1em;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-button {
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 30px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
}

.custom-button:hover:not(:disabled) {
  background-color: #e0a800;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

input {
  border: 1px solid #e2e8f0;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}
</style>
