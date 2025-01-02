<template>
    <div class="guide-block">
        <h2>How to use the SMSpva?</h2>
        <span style="margin-left: 2px; margin-top: 5px;">
            To get a temporary number for receiving SMS, you will need to do 3 simple steps.
        </span>
        <div class="cards">
            <div class="guide-card" v-for="(step, index) in steps" :key="index">
                <div class="guide-card-body">
                    <h3>{{ step.title }}</h3>
                    <p><b>{{ step.action1 }}</b></p>
                    <p><b>{{ step.action2 }}</b></p>
                </div>
                <div class="image">
                    <img :src="step.image" alt="" loading="lazy">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            steps: [
                {
                    title: 'Get the temp number',
                    action1: 'Choose the service from which you will be expecting the SMS',
                    action2: 'Choose the country from which this number should be',
                    image: '/layout/images/guide1.svg'
                },
                {
                    title: 'Send SMS to the phone number',
                    action1: 'Enter this phone number into the registration form on the required website',
                    action2: 'Send the confirmation code to the number',
                    image: '/layout/images/guide2.svg'
                },
                {
                    title: 'Get an SMS on the website',
                    action1: 'After receiving the SMS message with the confirmation code,',
                    action2: 'copy it and use it to complete the account activation',
                    image: '/layout/images/guide3.svg'
                }
            ]
        };
    }
};
</script>

<style scoped>
.guide-block {
   margin: 2rem auto;
   width: 95%;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
}

.guide-card {
    flex: 1 1 calc(33.333% - 20px);
    align-items: center;
    padding: 20px 20px 30px 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 15px;
    margin-bottom: 10px;
    background: rgb(255, 255, 255);
    box-shadow: 0 0 8px rgb(227, 227, 227);
    margin-right: 20px;
    margin-top: 10px;
}

.guide-card-body {
    flex: 1;
    height: 175px;
}

.guide-card-body h3 {
    margin-top: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgb(56, 56, 56);
}

.guide-card-body p {
    font-style: normal;
    font-size: 14px;
    line-height: 17px;
    color: rgb(56, 56, 56);
    opacity: 0.6;
}

.image {
    text-align: right;
}

.image img {
    max-width: 100px; /* Adjust size as needed */
    height: auto;
}
</style>