<template>
  <div class="main-footer">
    <div class="footer">
      <div class="bubbles">
        <div
          v-for="(style, i) in bubbleStyles"
          :key="i"
          class="bubble"
          :style="{
            '--size': style.size,
            '--distance': style.distance,
            '--position': style.position,
            '--time': style.time,
            '--delay': style.delay,
          }"
        ></div>
      </div>
      <div class="content">
        <footer id="footer">
          <div class="container">
            <div class="p-grid">
              <div class="p-col-12 p-md-3">
                <div class="footer-about">
                  <p>
                    Receive SMS online to temporary numbers from all over the
                    world
                  </p>
                  <p>Copyright © 2024 ❤ Japan Sim. All rights reserved.</p>
                </div>
              </div>
              <div class="p-col-12 p-md-6">
                <div class="social-links">
                  <ul class="social-icons p-d-flex p-flex-column p-gap-2">
                    <li>
                      <a
                        href="https://www.facebook.com/callmeiwn/"
                        target="_blank"
                        ><i class="pi pi-facebook"></i> Facebook</a
                      >
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/hieu_david266/"
                        target="_blank"
                        ><i class="pi pi-instagram"></i> Instagram</a
                      >
                    </li>
                    <li>
                      <a
                        href="https://vn.linkedin.com/in/hieupikas"
                        target="_blank"
                        ><i class="pi pi-linkedin"></i> Linkedin</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="p-col-12 p-md-3">
                <div class="address">
                  <ul class="address-links">
                    <li class="address1">
                      <i class="pi pi-map-marker"></i> Ngũ Hành Sơn Đà Nẵng
                    </li>
                    <li>
                      <a href="#"><i class="pi pi-phone"></i> +84 862478150</a>
                    </li>
                    <li>
                      <a href="#"
                        ><i class="pi pi-envelope"></i>
                        spteam.coder@gmail.com</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <svg style="position: fixed; top: 100vh">
        <defs>
          <filter id="blob">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bubbleStyles: [],
    };
  },
  mounted() {
    // Ensure random values are calculated only on the client-side
    this.generateBubbleStyles();
  },
  methods: {
    generateBubbleStyles() {
      this.bubbleStyles = Array.from({ length: 128 }).map(() => {
        return {
          size: `${2 + Math.random() * 4}rem`,
          distance: `${6 + Math.random() * 4}rem`,
          position: `${-5 + Math.random() * 110}%`,
          time: `${2 + Math.random() * 2}s`,
          delay: `${-1 * (2 + Math.random() * 2)}s`,
        };
      });
    },
  },
};
</script>

<style scoped>
.main-footer {
  display: grid;
  grid-template-rows: 0fr 7rem auto;
  grid-template-areas: "main" "." "footer";
  overflow-x: hidden;
  background: linear-gradient(
    to right,
    #d7f2fe,
    #ffffff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.footer {
  z-index: 1;
  --footer-background: #2aabee;
  display: grid;
  position: relative;
  grid-area: footer;
  min-height: 12rem;
}

.bubbles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1rem;
  background: var(--footer-background);
  filter: url("#blob");
}

.bubble {
  position: absolute;
  left: var(--position, 50%);
  background: var(--footer-background);
  border-radius: 100%;
  animation: bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
    bubble-move var(--time, 4s) ease-in infinite var(--delay, 0s);
  transform: translate(-50%, 100%);
}

.content {
  display: grid;
  padding: 2rem;
  background: var(--footer-background);
}

.content img {
  width: 50px;
  margin-top: 30px;
}

a,
p {
  color: #f5f7fa;
  text-decoration: none;
}

b {
  color: white;
}

.footer p {
  margin: 0;
  font-size: 0.75rem;
}

.image {
  align-self: center;
  width: 4rem;
  height: 4rem;
  margin: 0.25rem 0;
  background-size: cover;
  background-position: center;
}

@keyframes bubble-size {
  0%,
  75% {
    width: var(--size, 1rem);
    height: var(--size, 1rem);
  }
  100% {
    width: 0rem;
    height: 0rem;
  }
}

@keyframes bubble-move {
  0% {
    bottom: -1rem;
  }
  100% {
    bottom: var(--distance, 1rem);
  }
}

/* footer section start */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}

#footer {
  padding-top: 5rem;
}

#footer .p-grid {
  display: flex;
  gap: 100px;
  flex-wrap: wrap;
}

.social-links img {
  padding-bottom: 25px;
}

.social-icons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #f5f7fa;
  margin: 0px;
  padding: 0px;
}

.social-icons a i {
  box-shadow: rgb(0 0 0 / 8%) 0px 4px 12px;
  padding: 0.4rem 1rem 0.4rem 1rem;
  border-radius: 3px;
  color: #2aabee;
  font-size: 16px;
  margin-right: 12px;
  background-color: #f5f7fa;
  transition: color 0.3s ease; /* Smooth color transition */
}

.social-icons a {
  position: relative; /* Position context for the pseudo-element */
  color: #f5f7fa; /* Default text color */
  text-decoration: none; /* Remove underline */
  padding: 0.5rem; /* Add padding for better click area */
}

.social-icons a::before {
  content: ""; /* Create a pseudo-element */
  position: absolute;
  left: 50%; /* Center the pseudo-element */
  bottom: 0; /* Position it at the bottom */
  width: 100%; /* Full width */
  height: 2px; /* Height of the underline */
  background: #f5f7fa; /* Color of the underline */
  transform: translateX(-50%) scaleX(0); /* Initially hidden */
  transition: transform 0.3s ease; /* Smooth scale transition */
}

.social-icons a:hover {
  color: #f5f7fa; /* Change text color on hover */
}

.social-icons a:hover::before {
  transform: translateX(-50%) scaleX(1); /* Show the underline */
}

li {
  list-style: none;
}

.address-links li a {
  color: #f5f7fa;
}

.address img {
  padding-bottom: 15px;
}

.address-links li {
  color: #f5f7fa;
  font-size: 15px;
  font-weight: 500;
}

.address-links li a {
  color: #f5f7fa;
}

.address-links li i {
  font-size: 16px;
  padding-right: 8px;
  color: #f5f7fa;
}

.address-links li i:nth-child(1) {
  padding-top: 9px;
}

.address-links .address1 {
  font-weight: 500;
  font-size: 15px;
  display: flex;
}

.address-links {
  line-height: 32px;
  color: #f5f7fa;
}

a {
  text-decoration: none;
}

.address-links {
  padding: 0px;
  margin: 0px;
}
</style>
