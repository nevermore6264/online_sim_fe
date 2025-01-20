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
