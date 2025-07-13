<template>
  <div class="without-login">
    <h1>{{ $t("landing.header_title") }}</h1>
    <h2 class="footerDesc">
      {{ $t("landing.footerDesc") }}
    </h2>
    <div class="spacer-25"></div>
    <Button class="try_it_out noselect" @click="() => $router.push('/signup')">
      {{ $t("landing.try_now") }}
      <i
        class="pi pi-arrow-right"
        style="font-size: 0.75rem; margin-left: 10px"
      ></i>
    </Button>
    <div class="clients_block">
      <div class="clients_stars">
        <div class="stars noselect">
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
          <i class="pi pi-star-fill"></i>
        </div>
        <span class="users_count">{{ $t("landing.users_count") }}</span>
      </div>
      <div class="clients_text">
        <h3>{{ $t("landing.trusted_users") }}</h3>
        <br />
        <span>{{ $t("landing.temporary_service") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.footerDesc {
  color: #374151;
  margin-left: 2px;
  margin-top: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
}

.clients_block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 20px;
  margin-bottom: 10px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clients_block:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
}

.without-login {
  margin: 2rem auto;
  width: 95%;
}

.stars {
  text-align: center;
  margin-bottom: 12px;
  color: #3b82f6;
}

.stars i {
  font-size: 20px;
  margin: 0 2px;
}

.users_count {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.clients_text {
  text-align: center;
  margin-top: 15px;
  width: 100%;
}

.clients_text h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.clients_text span {
  display: block;
  margin-top: 8px;
  font-size: 15px;
  line-height: 1.6;
  color: #4b5563;
}

.try_it_out {
  vertical-align: middle;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  padding: 16px 32px;
  border-radius: 12px;
  margin: 2rem auto;
  background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
  border: none;
  color: white;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
  position: relative;
  overflow: hidden;
}

.try_it_out:hover {
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 60%, #60a5fa 100%);
  transform: translateY(-1px) scale(1.03);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
}
</style>
