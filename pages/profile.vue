<template>
  <div class="profile-page">
    <div class="profile-header">
      <img
        v-if="userInfo?.avatar"
        :src="userInfo.avatar"
        alt="User Avatar"
        class="profile-avatar"
      />
      <img
        v-else
        src="/default-avatar.png"
        alt="Default Avatar"
        class="profile-avatar"
      />
      <h2>{{ userInfo?.firstName }} {{ userInfo?.lastName }}</h2>
      <p class="username">@{{ userInfo?.username }}</p>
    </div>

    <div class="profile-body">
      <h3>About</h3>
      <p>{{ userInfo?.bio || "This user has not provided a bio yet." }}</p>

      <h3>Contact</h3>
      <ul>
        <li>Email: {{ userInfo?.email || "Not provided" }}</li>
        <li>Phone: {{ userInfo?.phone || "Not provided" }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import UserService from "@/services/user"; // Import UserService để fetch thông tin user

const route = useRoute();
const userId = route.params.id; // Lấy ID từ URL
const userInfo = ref(null);

// Fetch thông tin user từ API
const fetchUserProfile = async () => {
  try {
    const response = await UserService.GetUserProfile(userId);
    userInfo.value = response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

onMounted(fetchUserProfile);
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.username {
  color: #888;
  font-size: 14px;
}

.profile-body {
  text-align: left;
}

.profile-body h3 {
  margin-top: 20px;
  color: #007bff;
}

.profile-body ul {
  list-style-type: none;
  padding: 0;
}

.profile-body ul li {
  margin-bottom: 10px;
}
</style>
