<template>
  <div class="auth-container">
    <div class="auth-form">
      <div class="logo">
        <img src="/layout/images/logo.png" alt="Logo" class="logo-image" />
      </div>
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <InputText
          v-model="signUpData.firstName"
          placeholder="First Name"
          required
          class="auth-input"
        />
        <InputText
          v-model="signUpData.lastName"
          placeholder="Last Name"
          required
          class="auth-input"
        />
        <InputText
          v-model="signUpData.username"
          placeholder="Username"
          required
          class="auth-input"
        />
        <InputText
          v-model="signUpData.password"
          type="password"
          placeholder="Password"
          required
          class="auth-input"
        />
        <InputText
          v-model="signUpData.confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          class="auth-input"
        />
        <Button
          label="Sign Up"
          type="submit"
          class="auth-submit"
          :disabled="loading"
        />
      </form>
      <p class="switch-link">
        Already have an account?
        <nuxt-link to="/login">Log in here</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { push } from "notivue";
import UserService from "@/services/user";

const signUpData = ref({
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
});
const loading = ref(false);

const handleSignUp = async () => {
  const { firstName, lastName, username, password, confirmPassword } =
    signUpData.value;

  if (!firstName || !lastName || !username || !password || !confirmPassword) {
    push.warning("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    push.warning("Passwords do not match.");
    return;
  }

  loading.value = true;
  try {
    const response = await UserService.CreateUser(signUpData.value);
    if (response.success) {
      push.success("Registration successful! Please log in.");
      window.location.href = "/login";
    } else {
      push.error("Registration failed.");
    }
  } catch (error) {
    push.error("An error occurred during registration.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Styles specific for SignUpForm.vue */
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  text-align: center;
}
.auth-input {
  margin-bottom: 1rem;
}
.switch-link {
  margin-top: 1rem;
}
</style>
