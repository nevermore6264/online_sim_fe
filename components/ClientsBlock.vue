<template>
  <div class="clients_block">
    <h1>Receive SMS Online - SmsPva</h1>
    <h2
      style="
        color: rgb(56, 56, 56);
        margin-left: 2px;
        margin-top: 5px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
      "
    >
      Receive SMS online to temporary numbers from all over the world
    </h2>
    <div class="spacer-25"></div>
    <a class="try_it_out noselect">Try it out</a>

    <div class="clients_stars">
      <div class="stars noselect">
        <i class="pi pi-star-fill"></i>
        <i class="pi pi-star-fill"></i>
        <i class="pi pi-star-fill"></i>
        <i class="pi pi-star-fill"></i>
        <i class="pi pi-star-fill"></i>
      </div>
      <span>550,000+ users</span>
    </div>
    <div class="clients_text">
      <h3>
        We are trusted by more than 550,000 paying customers, and that number
        continues to grow...
      </h3>
      <br />
      <span
        >With our Temporary Number service, you'll only get high-quality,
        billable numbers with the highest success rates on the market
        today.</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stars: Array(5).fill(0), // Creates an array with 5 elements for the stars
    };
  },
};
</script>

<style scoped>
.clients_block {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.clients_stars {
  display: flex;
  align-items: center;
  padding: 20px 20px 30px 20px;
  box-sizing: border-box;
  border-radius: 15px;
  margin-bottom: 10px;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 8px rgb(227, 227, 227);
  margin-right: 20px;
  margin-top: 10px;
}

.stars {
  display: flex;
  margin-right: 10px; /* Space between stars and user count */
}
.clients_text {
  margin-top: 10px;
}

.clients_text h3 {
  margin: 0;
}

.clients_text span {
  display: block;
  margin-top: 5px;
}

.spacer-25 {
  height: 25px; /* Adjusts spacing */
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
