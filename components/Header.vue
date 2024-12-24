<template>
  <!-- Navbar Section -->
  <div
    class="p-menubar p-component p-menubar-mobile-active layout-topbar"
    data-pc-name="menubar"
    data-pc-section="root"
  >
    <!-- Logo Section -->
    <div class="p-menubar-start" data-pc-section="start">
      <a class="layout-topbar-logo" href="/">
        <img src="/layout/images/logo.svg" alt="logo" />
      </a>
    </div>

    <!-- End Section -->
    <div class="p-menubar-end" data-pc-section="end">
      <div class="d-flex align-items-center">
        <Button
          aria-label="Login"
          class="p-button p-component p-button-text"
          @click="openPopup('login')"
        >
          <span
            class="p-button-icon p-c p-button-icon-left pi pi-sign-in"
            data-pc-section="icon"
          ></span>
          <span class="p-button-label p-c" data-pc-section="label">
            Login
          </span>
        </Button>
        <Button
          aria-label="Sign Up"
          class="p-button p-component p-button-text"
          @click="openPopup('signup')"
        >
          <span
            class="p-button-icon p-c p-button-icon-left pi pi-user-plus"
            data-pc-section="icon"
          ></span>
          <span class="p-button-label p-c" data-pc-section="label">
            Sign Up
          </span>
        </Button>
      </div>
    </div>
  </div>

  <!-- Auth Popup Dialog -->
  <Dialog
    v-model:visible="isVisible"
    modal
    :header="headerText"
    :style="{ width: '30rem' }"
  >
    <template v-if="mode === 'login'">
      <h3>Login</h3>
      <form @submit.prevent="handleLogin">
        <div class="field">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" required />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <InputText
            id="password"
            type="password"
            v-model="password"
            required
          />
        </div>
        <Button label="Login" type="submit" />
      </form>
    </template>
    <template v-else-if="mode === 'signup'">
      <h3>Sign Up</h3>
      <form @submit.prevent="handleSignup">
        <div class="field">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" required />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <InputText
            id="password"
            type="password"
            v-model="password"
            required
          />
        </div>
        <div class="field">
          <label for="confirmPassword">Confirm Password</label>
          <InputText
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            required
          />
        </div>
        <Button label="Sign Up" type="submit" />
      </form>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { Dialog, InputText, Button } from "primevue";

const isVisible = ref(false);
const mode = ref("login"); // Default to login
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const headerText = computed(() =>
  mode.value === "login" ? "Login" : "Sign Up"
);

// Open the popup and set the mode (login/signup)
const openPopup = (type) => {
  mode.value = type;
  isVisible.value = true;
};

// Handle Login action
const handleLogin = () => {
  alert(`Logged in with email: ${email.value}`);
  isVisible.value = false;
};

// Handle Sign Up action
const handleSignup = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }
  alert(`Signed up with email: ${email.value}`);
  isVisible.value = false;
};
</script>

<style scoped>
.layout-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.p-menubar-start {
  display: flex;
  align-items: center;
}

.p-menubar-end {
  display: flex;
  align-items: center;
}

.p-menuitem-link {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.p-button {
  margin-left: 10px;
}

.p-menubar {
  border: 0 !important;
  border-bottom: 1px solid #e2e8f0 !important;
  border-radius: 0px !important;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}

.field {
  margin-bottom: 1rem;
}
</style>
