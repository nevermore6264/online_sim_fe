<template>
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
        <!-- Login Button -->
        <Button
          aria-label="Login"
          class="p-button p-component p-button-text"
          @click="visible = true"
        >
          <span
            class="p-button-icon p-c p-button-icon-left pi pi-sign-in"
            data-pc-section="icon"
          ></span>
          <span class="p-button-label p-c" data-pc-section="label">
            Login
          </span>
        </Button>

        <!-- Login Dialog -->
        <Dialog
          v-model:visible="visible"
          modal
          header="Login"
          :style="{ width: '30rem', padding: '20px' }"
          class="auth-dialog"
        >
          <form @submit.prevent="handleLogin">
            <div class="field">
              <label for="email">Email</label>
              <InputText
                id="email"
                v-model="email"
                required
                class="input-field"
              />
            </div>
            <div class="field">
              <label for="password">Password</label>
              <InputText
                id="password"
                type="password"
                v-model="password"
                required
                class="input-field"
              />
            </div>
            <Button label="Login" type="submit" class="p-button-rounded" />
          </form>
        </Dialog>

        <!-- Sign Up Button -->
        <Button
          aria-label="Sign Up"
          class="p-button p-component p-button-text"
          @click="visibleSignUp = true"
        >
          <span
            class="p-button-icon p-c p-button-icon-left pi pi-user-plus"
            data-pc-section="icon"
          ></span>
          <span class="p-button-label p-c" data-pc-section="label">
            Sign Up
          </span>
        </Button>

        <!-- Sign Up Dialog -->
        <Dialog
          v-model:visible="visibleSignUp"
          modal
          header="Sign Up"
          :style="{ width: '30rem', padding: '20px' }"
          class="auth-dialog"
        >
          <form @submit.prevent="handleSignup">
            <div class="field">
              <label for="email">Email</label>
              <InputText
                id="email"
                v-model="email"
                required
                class="input-field"
              />
            </div>
            <div class="field">
              <label for="password">Password</label>
              <InputText
                id="password"
                type="password"
                v-model="password"
                required
                class="input-field"
              />
            </div>
            <div class="field">
              <label for="confirmPassword">Confirm Password</label>
              <InputText
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                required
                class="input-field"
              />
            </div>
            <Button label="Sign Up" type="submit" class="p-button-rounded" />
          </form>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
const visibleSignUp = ref(false);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleLogin = () => {
  if (!email.value || !password.value) {
    alert("Please fill in both fields.");
    return;
  }
  alert(`Logged in with email: ${email.value}`);
  visible.value = false; // Close the login dialog
};

const handleSignup = () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    alert("Please fill in all fields.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  alert(`Signed up with email: ${email.value}`);
  visibleSignUp.value = false; // Close the sign-up dialog
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

.p-menubar {
  border: 0 !important;
  border-bottom: 1px solid #e2e8f0 !important;
  border-radius: 0px !important;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}

.auth-dialog .p-dialog-header {
  background-color: #4caf50;
  color: white;
}

.auth-dialog .p-dialog-content {
  padding: 20px;
}

.input-field {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;
}

.p-button-rounded {
  width: 100%;
}

.p-button-icon {
  margin-right: 8px;
}
</style>
