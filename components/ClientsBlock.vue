<template>
    <div class="clients_block">
        <h1>Receive SMS Online - SmsPva</h1>
        <h2 style="color: rgb(56, 56, 56); margin-left: 2px; margin-top: 5px; font-style: normal; font-weight: 400; font-size: 18px; line-height: 22px;">
            Receive SMS online to temporary numbers from all over the world
        </h2>
        <div class="spacer-25"></div>
        <a href="/index.php?do=register" class="try_it_out noselect">Try it out</a>

        <div class="col-lg-10 clients_stars">
            <div class="stars noselect">
                <svg v-for="(star, index) in stars" :key="index" width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.584 0.000488281L15.4093 8.63458L24.5521 8.63458L17.1554 13.9707L19.9807 22.6048L12.584 17.2687L5.18731 22.6048L8.01259 13.9707L0.615905 8.63458L9.75872 8.63458L12.584 0.000488281Z" fill="var(--color-primary)"></path>
                </svg>
            </div>
            <span>550,000+ users</span>
        </div>
        <div class="col-lg-20 clients_text">
            <h3>We are trusted by more than 550,000 paying customers, and that number continues to grow...</h3>
            <br>
            <span>With our Temporary Number service, you'll only get high-quality, billable numbers with the highest success rates on the market today.</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stars: Array(5).fill(0) // Creates an array with 5 elements for the stars
        };
    }
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
}

.stars {
    display: flex;
    margin-right: 10px; /* Space between stars and user count */
}

.col-lg-10 {
    flex: 0 0 50%; /* Adjust based on your layout */
}

.col-lg-20 {
    flex: 0 0 50%; /* Adjust based on your layout */
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
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--color-primary); /* Example color */
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin-bottom: 20px; /* Space below the button */
    transition: background-color 0.3s;
}

.try_it_out:hover {
    background-color: darken(var(--color-primary), 10%); /* Adjust for hover effect */
}
</style>