<template>
  <FraudWarning />
  <Header />
  <div class="main">
    <div class="container">
      <main class="main-content">
        <NuxtPage />
      </main>
      <div class="side-content">

        <GuideBlock />
        <FeaturesBlock />
        <ContinueBlock />
        <NewsTips />
        <TipsBlock />
        <FooterLandingPage />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.main {
  display: flex;
}

.container {
  display: flex;
  flex: 1;
}

.main-content {
  padding: 20px;
}

.side-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
</style>