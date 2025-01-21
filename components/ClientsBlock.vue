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
  color: rgb(56, 56, 56);
  margin-left: 2px;
  margin-top: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
}

.clients_block {
  display: flex;
  flex-direction: column; /* Sắp xếp theo cột */
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
  margin-bottom: 10px;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 8px rgb(227, 227, 227);
}

.without-login {
  margin: 2rem auto;
  width: 95%;
}

.stars {
  text-align: center;
  margin-bottom: 10px; /* Khoảng cách giữa ngôi sao và dòng "550,000+ users" */
  color: #2aabee; /* Đổi màu ngôi sao thành xanh */
}

.stars i {
  font-size: 18px;
}

.users_count {
  font-size: 16px;
  font-weight: 500;
  color: rgb(56, 56, 56); /* Màu chữ tối */
}

.clients_text {
  text-align: left;
  margin-top: 15px;
  width: 100%;
}

.clients_text h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.clients_text span {
  display: block;
  margin-top: 5px;
  font-size: 14px;
  line-height: 24px;
  color: rgb(110, 120, 130);
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
  margin: 2rem auto;
  border: none;
}

.try_it_out:hover {
  background-color: #3b82f6; /* Darker on hover */
}
</style>
