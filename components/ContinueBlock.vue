<template>
  <div class="continue-block">
    <h2 class="signup-block-info">
      Complete a simple registration and receive a phone number for SMS
    </h2>
    <p class="signup-block-info">
      Get the opportunity to use our numbers for registration!
    </p>
    <Button class="try_it_out noselect">
      Sign up
      <i
        class="pi pi-arrow-right"
        style="font-size: 0.75rem; margin-left: 10px"
      ></i>
    </Button>
  </div>
</template>

<script>
export default {
  name: "ContinueBlock",
};
</script>

<style scoped>
.continue-block {
  border-radius: 5px; /* Rounded corners */
  margin: 2rem auto;
  width: 95%;
}

.try_it_out {
  vertical-align: middle;
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  padding: 14px 15px 15px 15px;
  padding-inline: 25px;
  border-radius: 15px;
  margin-top: 10px;
  background-color: #2aabee;
}

.try_it_out:hover {
  background-color: #3b82f6; /* Darker on hover */
}
</style>
