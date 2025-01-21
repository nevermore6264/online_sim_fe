export default {
  welcome: "Welcome",
  landing: {
    berrors_top_yellow:
      "There are fraudulent sites that copy our design. Check the site domain when you visit the site. Our domain is Verifysms.com. Be careful and do not trust fraudulent sites. We are not responsible for the actions of these fraudulent sites.",
    hello: "Hello",
    footerDesc:
      "Receive SMS online to temporary numbers from all over the world",
    footerCopyRight: "Copyright © 2024 ❤ Japan Sim. All rights reserved.",
    headerRentNumber: "Rent Number",
    headerRentOTP: "Rent OTP",
    headerProxy: "Proxy",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    noAccount: "Don't have an account?",
    username: "Login / Username",
    password: "Password",
    forgot_password: "Forgot password?",
    or_login: "Or log in with:",
    firstName: "First Name",
    lastName: "Last Name",
    confirmPassword: "Confirm Password",
    alreadyAccount: "Already have an account?",
    signUpHere: "Sign up here",
    signup_info_heading:
      "Complete a simple registration and receive a phone number for SMS",
    signup_info_paragraph:
      "Get the opportunity to use our numbers for registration!",
    tips_heading: "Tips VerifySMS.com",
    tips_paragraph:
      "We write about account registration, the intricacies of working with proxies, and other important topics.",
    blog_button: "Blog",
    news_heading: "News",
    telegram_channel: "@verifysms_news_official",
    terms_agreement: "By logging in to the service, you agree with the",
    terms: "Terms",
    privacy_policy: "Privacy Policy",
    number_storage:
      "We do not store numbers longer than 24 hours. If you need to receive SMS for a long time, use",
    rent_numbers: "Rent numbers",
    telegram_info:
      "Our official telegram channel where you will be the first to know about price changes and news.",
    header_title: "Receive SMS Online - Verifysms",
    footerDesc:
      "Receive SMS online to temporary numbers from all over the world",
    try_now: "Try it now",
    trusted_users:
      "We are trusted by more than 550,000 paying customers, and that number continues to grow...",
    temporary_service:
      "With our Temporary Number service, you'll only get high-quality, billable numbers with the highest success rates on the market today.",
    users_count: "550,000+ users",
    guide_title: "How to use the VerifySMS?",
    guide_description:
      "To get a temporary number for receiving SMS, you will need to do 3 simple steps.",
    steps: [
      {
        title: "Get the temp number",
        action1: "Choose the service from which you will be expecting the SMS",
        action2: "Choose the country from which this number should be",
      },
      {
        title: "Send SMS to the phone number",
        action1:
          "Enter this phone number into the registration form on the required website",
        action2: "Send the confirmation code to the number",
      },
      {
        title: "Get an SMS on the website",
        action1: "After receiving the SMS message with the confirmation code,",
        action2: "copy it and use it to complete the account activation",
      },
    ],
    features_title:
      "VerifySMS is one of the first websites to offer phone number sales",
    features_description:
      "VerifySMS offers the opportunity to use short-term temporary phone numbers from various countries at a reasonable price to receive SMS messages.",
    features: [
      {
        icon: "pi-verified",
        header: "Account Verification",
        body: "Simplify online account verification by receiving instant confirmation codes on popular apps or services. Set up SMS QA tests easily.",
      },
      {
        icon: "pi-flag-fill",
        header: "Over 60 countries",
        body: "Get phone numbers from many countries such as the US, UK, China, Australia, India, Germany, Netherlands, Poland, Spain and many more.",
      },
      {
        icon: "pi-clock",
        header: "Choose number instant",
        body: "With just a few clicks, you can get a second phone number on any popular service and receive SMS messages containing verification codes almost instantly.",
      },
      {
        icon: "pi-shield",
        header: "Privacy protection",
        body: "To protect your privacy, use our temporary phone number instead of your real phone number when registering on websites or apps.",
      },
      {
        icon: "pi-whatsapp",
        header: "Virtual and real numbers",
        body: "Our service offers a wide range of VOIP numbers and real SIM cards from providers around the world.",
      },
      {
        icon: "pi-qrcode",
        header: "API compatibility",
        body: "VerifySMS's API provides easy automation of your workflow, whether you need one verification or thousands.",
      },
    ],
    search_country: "Search country",
    select_country: "Select country",
    no_countries_found: "No countries found.",
    loading_countries: "Loading countries data. Please wait.",
    search_service: "Search service",
    select_service: "Select service",
    no_services_found: "No data found.",
    loading_services: "Loading services data. Please wait.",
    service_price: "from {price} USDT",
  },
  notify: {
    no_rights: "You do not have the right!",
  },
  rent_number: {
    notify:
      "Proxies are not allowed to be used in illegal activities. Responsibility when using a proxy lies with the buyer. Our proxies are suitable only for white purposes.",
    always_active: "Always active numbers",
    activation_by_order: "Activation of numbers on by order, from 10 minutes",
    priority_numbers:
      "Both types of numbers, priority for always active numbers",
    api: {
      general: "General",
    },
  },
  proxy: {
    api: {
      general: "General",
    },
  },
  faq: {
    items: [
      {
        question: "General",
        answer:
          "Only GET requests are accepted.\nThe server always responds in JSON format. If the request was successful, the status field will be 1; otherwise, 0. If status = 0, the error cause will be indicated in the msg field.\nMost requests require the user's API key to be specified.",
      },
      {
        question: "List of available countries",
        answer:
          '<h4>Request</h4><pre>https://smspva.com/api/rent.php?method=getcountries</pre><h4>Response</h4><pre>{\n  "status": 1,\n  "data": [\n    {\n      "name": "Россия", // country name\n      "code": "RU"      // country code\n    }\n  ]\n}</pre>',
      },
    ],
  },
};
