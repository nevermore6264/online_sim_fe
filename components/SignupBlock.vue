<template>
  <div class="continue-block">
    <h2>Complete a simple registration and receive a phone number for SMS</h2>
    <span style="margin-left: 2px; margin-top: 5px"
      >Get the opportunity to use our numbers for registration!</span
    >
    <div class="spacer-25"></div>
    <a href="/index.php?do=register" class="try_it_out noselect">
      Sign up
      <svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M23.7071 8.70711C24.0976 8.31658 24.0976 7.68342 23.7071 7.29289L17.3431 0.928933C16.9526 0.538409 16.3195 0.538409 15.9289 0.928933C15.5384 1.31946 15.5384 1.95262 15.9289 2.34315L21.5858 8L15.9289 13.6569C15.5384 14.0474 15.5384 14.6805 15.9289 15.0711C16.3195 15.4616 16.9526 15.4616 17.3431 15.0711L23.7071 8.70711ZM-1.03612e-07 9L23 9L23 7L1.03612e-07 7L-1.03612e-07 9Z"
          fill="white"
        ></path>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: "SignupBlock",
};
</script>

<style scoped>
.continue-block {
  padding: 1rem; /* Example padding */
  background-color: #fc4a1a; /* Example background color */
  color: white; /* Text color */
  text-align: center; /* Center align text */
  border-radius: 5px; /* Rounded corners */
}

.try_it_out {
  text-decoration: none;
  color: white; /* Link color */
  background-color: #007bff; /* Button background color */
  padding: 0.5rem 1rem; /* Button padding */
  border-radius: 5px; /* Rounded button corners */
}

.try_it_out:hover {
  background-color: #0056b3; /* Darker on hover */
}
</style>
