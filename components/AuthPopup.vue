<template>
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

const open = (type) => {
  mode.value = type;
  isVisible.value = true;
};

const handleLogin = () => {
  alert(`Logged in with email: ${email.value}`);
  isVisible.value = false;
};

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
.field {
  margin-bottom: 1rem;
}
</style>
