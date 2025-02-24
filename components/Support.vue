<template>
  <div>
    <!-- Speed Dial Component -->
    <SpeedDial
      :model="items"
      :radius="80"
      type="quarter-circle"
      direction="up"
      :style="{ position: 'fixed', bottom: '20px', right: '20px' }"
      class="custom-speed-dial"
    />

    <!-- OverlayPanel for Email -->
    <OverlayPanel ref="op" class="custom-overlay-panel">
      <div class="p-fluid">
        <div class="p-field">
          <label for="name">Tên</label>
          <InputText id="name" v-model="name" placeholder="Nhập tên của bạn" />
        </div>
        <div class="p-field">
          <label for="email">Email</label>
          <InputText
            id="email"
            v-model="email"
            placeholder="Nhập email của bạn"
          />
        </div>
        <div class="p-field">
          <label for="message">Nội dung</label>
          <Textarea
            id="message"
            v-model="message"
            rows="5"
            placeholder="Nhập nội dung tin nhắn"
          />
        </div>
        <Button label="Gửi" @click="sendEmail" class="p-button-primary" />
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SpeedDial from "primevue/speeddial";
import OverlayPanel from "primevue/overlaypanel";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

const op = ref(null);
const name = ref("");
const email = ref("");
const message = ref("");

const items = ref([
  {
    label: "Email",
    icon: "pi pi-envelope",
    command: () => {
      op.value.toggle(event);
    },
  },
  {
    label: "Telegram",
    icon: "pi pi-telegram",
    command: () => {
      window.open("https://t.me/your_telegram_link", "_blank");
    },
  },
]);

const sendEmail = () => {
  // Logic để gửi email
  console.log("Gửi email:", {
    name: name.value,
    email: email.value,
    message: message.value,
  });
  // Reset form
  name.value = "";
  email.value = "";
  message.value = "";
  op.value.hide();
};
</script>

<style scoped>
/* Custom SpeedDial */
.custom-speed-dial {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.custom-speed-dial .p-speeddial-button {
  width: 56px;
  height: 56px;
  background-color: #007bff;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.custom-speed-dial .p-speeddial-button:hover {
  background-color: #0056b3;
}

.custom-speed-dial .p-speeddial-action {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.custom-speed-dial .p-speeddial-action:hover {
  background-color: #f8f9fa;
}

/* Custom OverlayPanel */
.custom-overlay-panel {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-overlay-panel .p-fluid .p-field {
  margin-bottom: 1rem;
}

.custom-overlay-panel .p-field label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

.custom-overlay-panel .p-inputtext,
.custom-overlay-panel .p-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.custom-overlay-panel .p-button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
}

.custom-overlay-panel .p-button:hover {
  background-color: #0056b3;
}
</style>
