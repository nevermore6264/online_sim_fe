<template>
  <div class="main">
    <div class="footer">
      <div class="bubbles">
        <div
          v-for="i in 128"
          :key="i"
          class="bubble"
          :style="{
            '--size': `${2 + Math.random() * 4}rem`,
            '--distance': `${6 + Math.random() * 4}rem`,
            '--position': `${-5 + Math.random() * 110}%`,
            '--time': `${2 + Math.random() * 2}s`,
            '--delay': `${-1 * (2 + Math.random() * 2)}s`,
          }"
        ></div>
      </div>
      <div class="content">
        <footer id="footer">
          <div class="container">
            <div class="p-grid">
              <div class="p-col-12 p-md-3">
                <a href="index.html">
                  <img
                    src="/layout/images/logo.png"
                    alt=""
                    class="img-fluid logo-footer"
                  />
                </a>
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
                  <h2>Follow Us</h2>
                  <ul class="social-icons p-d-flex p-flex-column p-gap-2">
                    <li>
                      <a href="#"><i class="pi pi-facebook"></i> Facebook</a>
                    </li>
                    <li>
                      <a href="#"><i class="pi pi-instagram"></i> Instagram</a>
                    </li>
                    <li>
                      <a href="#"><i class="pi pi-linkedin"></i> Linkedin</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="p-col-12 p-md-3">
                <div class="address">
                  <h2>Address</h2>
                  <ul class="address-links">
                    <li class="address1">
                      <i class="pi pi-map-marker"></i> Kolathur Ramankulam,
                      Malappuram Dt Kerala 679338
                    </li>
                    <li>
                      <a href="#"
                        ><i class="pi pi-phone"></i> +91 90904500112</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><i class="pi pi-envelope"></i> mail@1234567.com</a
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

<script></script>

<style scoped>
.main {
  display: grid;
  grid-template-rows: 0fr 10rem auto;
  grid-template-areas: "main" "." "footer";
  overflow-x: hidden;
  font-family: "Open Sans", sans-serif;
}

.footer {
  z-index: 1;
  --footer-background: #fc4a1a;
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
  width: 200px;
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
    width: var(--size, 4rem);
    height: var(--size, 4rem);
  }
  100% {
    width: 0rem;
    height: 0rem;
  }
}

@keyframes bubble-move {
  0% {
    bottom: -4rem;
  }
  100% {
    bottom: var(--distance, 10rem);
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
  padding-top: 7rem;
}

#footer .p-grid {
  display: flex;
  gap: 150px;
}

.social-links h2 {
  padding-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
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

.social-icons a {
  color: #f5f7fa;
}

.social-icons a:hover {
  color: #000;
}

.social-icons a i {
  box-shadow: rgb(0 0 0 / 8%) 0px 4px 12px;
  padding: 0.4rem 1rem 0.4rem 1rem;
  border-radius: 3px;
  color: #82074a;
  font-size: 16px;
  margin-right: 12px;
  background-color: #f5f7fa;
}

li {
  list-style: none;
}

.useful-link h2 {
  padding-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
}
.useful-link img {
  padding-bottom: 15px;
}

.address-links li a {
  color: #f5f7fa;
}

.address h2 {
  padding-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
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
  color: #82074a;
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

.copy-right-sec {
  padding: 1.8rem;
  background: #82074a;
  color: #fff;
  text-align: center;
}

.copy-right-sec a {
  color: #fcd462;
  font-weight: 500;
}

a {
  text-decoration: none;
}

.address-links {
  padding: 0px;
  margin: 0px;
}
/* footer section end */
</style>
