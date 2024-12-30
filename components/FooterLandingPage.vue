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
        <div v-for="(group, index) in content" :key="index">
          <b>{{ group.title }}</b>
          <div v-for="item in group.links" :key="item.name">
            <a :href="item.href">{{ item.name }}</a>
          </div>
        </div>
        <div>
          <a
            class="image"
            href="https://codepen.io/z-"
            target="_blank"
            :style="{
              backgroundImage:
                'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/happy.svg)',
            }"
          ></a>
          <p>Copyright © 2024 ❤ Japan Sim. All rights reserved.</p>
        </div>
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
  grid-template-rows: 1fr 10rem auto;
  grid-template-areas: "main" "." "footer";
  overflow-x: hidden;
  background: #f5f7fa;
  min-height: 100vh;
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
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 4rem;
  padding: 2rem;
  background: var(--footer-background);
}

a,
p {
  color: #f5f7fa;
  text-decoration: none;
}

b {
  color: white;
}

p {
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
</style>
