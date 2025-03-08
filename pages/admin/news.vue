<template>
  <div class="news-management">
    <h1>{{ $t("newsManagement.title") }}</h1>
    <Button
      class="custom-button"
      :label="$t('newsManagement.addNews')"
      @click="openAddDialog"
      style="margin-bottom: 20px"
    />

    <!-- Dialog thêm tin tức -->
    <Dialog
      v-model:visible="showAddDialog"
      :header="$t('newsManagement.addNews')"
      :modal="true"
      class="custom-dialog"
    >
      <div class="p-fluid">
        <div class="p-field">
          <label for="title">{{ $t("newsManagement.newsTitle") }}</label>
          <InputText
            id="title"
            v-model="currentNews.title"
            class="custom-input"
          />
        </div>
        <div class="p-field">
          <label for="slug">{{ $t("newsManagement.newsSlug") }}</label>
          <InputText
            id="slug"
            v-model="currentNews.slug"
            class="custom-input"
          />
        </div>
        <div class="p-field">
          <label for="image">{{ $t("newsManagement.newsImage") }}</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            @change="handleImageUpload"
          />
          <img
            v-if="currentNews.imagePreview"
            :src="currentNews.imagePreview"
            alt="Preview"
            class="image-preview"
          />
        </div>
        <div class="p-field">
          <label for="content">{{ $t("newsManagement.newsContent") }}</label>
          <Editor
            v-model="currentNews.content"
            api-key="ralnw41ykjyj9duuyicqbgsidqiiycmaofumkp19xrbty8hi"
            :init="{
              height: 300,
              menubar: true,
              plugins:
                'advlist autolink lists link image charmap print preview anchor',
              toolbar:
                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            }"
          />
        </div>
        <div class="p-field">
          <label for="isPublished">{{
            $t("newsManagement.isPublished")
          }}</label>
          <Checkbox
            id="isPublished"
            v-model="currentNews.isPublished"
            :binary="true"
          />
        </div>
      </div>
      <template #footer>
        <Button
          class="custom-button"
          :label="$t('newsManagement.cancel')"
          icon="pi pi-times"
          @click="closeAddDialog"
        />
        <Button
          class="custom-button"
          :label="$t('newsManagement.save')"
          icon="pi pi-check"
          @click="saveNews"
        />
      </template>
    </Dialog>

    <!-- Dialog chỉnh sửa tin tức -->
    <Dialog
      v-model:visible="showEditDialog"
      :header="$t('newsManagement.editNews')"
      :modal="true"
      class="custom-dialog"
    >
      <div class="p-fluid">
        <div class="p-field">
          <label for="title">{{ $t("newsManagement.newsTitle") }}</label>
          <InputText
            id="title"
            v-model="currentNews.title"
            class="custom-input"
          />
        </div>
        <div class="p-field">
          <label for="slug">{{ $t("newsManagement.newsSlug") }}</label>
          <InputText
            id="slug"
            v-model="currentNews.slug"
            class="custom-input"
            :disabled="true"
          />
        </div>
        <div class="p-field">
          <label for="image">{{ $t("newsManagement.newsImage") }}</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            @change="handleImageUpload"
          />
          <img
            v-if="currentNews.imagePreview"
            :src="currentNews.imagePreview"
            alt="Preview"
            class="image-preview"
          />
        </div>
        <div class="p-field">
          <label for="content">{{ $t("newsManagement.newsContent") }}</label>
          <Editor
            v-model="currentNews.content"
            api-key="ralnw41ykjyj9duuyicqbgsidqiiycmaofumkp19xrbty8hi"
            :init="{
              height: 300,
              menubar: true,
              plugins:
                'advlist autolink lists link image charmap print preview anchor',
              toolbar:
                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            }"
          />
        </div>
        <div class="p-field">
          <label for="isPublished">{{
            $t("newsManagement.isPublished")
          }}</label>
          <Checkbox
            id="isPublished"
            v-model="currentNews.isPublished"
            :binary="true"
          />
        </div>
      </div>
      <template #footer>
        <Button
          class="custom-button"
          :label="$t('newsManagement.cancel')"
          icon="pi pi-times"
          @click="closeEditDialog"
        />
        <Button
          class="custom-button"
          :label="$t('newsManagement.save')"
          icon="pi pi-check"
          @click="saveNews"
        />
      </template>
    </Dialog>

    <!-- Bảng hiển thị danh sách tin tức -->
    <DataTable
      :value="news"
      :paginator="true"
      :rows="10"
      class="custom-datatable"
    >
      <Column field="_id" header="ID" style="width: 10%"></Column>
      <Column
        :header="$t('newsManagement.newsTitle')"
        field="title"
        style="width: 20%"
      ></Column>
      <Column
        :header="$t('newsManagement.newsSlug')"
        field="slug"
        style="width: 20%"
      ></Column>
      <Column
        :header="$t('newsManagement.newsContent')"
        field="content"
      ></Column>
      <Column :header="$t('newsManagement.actions')" style="width: 15%">
        <template #body="slotProps">
          <Button
            class="custom-button"
            icon="pi pi-pencil"
            @click="editNews(slotProps.data._id)"
          />
          <Button
            class="custom-button"
            icon="pi pi-trash"
            @click="deleteNews(slotProps.data._id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import NewsService from "@/services/new";
import { useI18n } from "vue-i18n";
import Editor from "@tinymce/tinymce-vue";

const { t } = useI18n();

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const news = ref([]);
const showAddDialog = ref(false);
const showEditDialog = ref(false);
const currentNews = ref({
  id: null,
  title: "",
  slug: "",
  content: "",
  thumbnail: null,
  imagePreview: "",
  isPublished: false,
});

// Watch for changes in the title and generate the slug
watch(
  () => currentNews.value.title,
  (newTitle) => {
    if (newTitle && !showEditDialog.value) {
      currentNews.value.slug = slugify(newTitle);
    }
  }
);

// Fetch news when component is mounted
onMounted(async () => {
  await fetchNews();
});

// Fetch news from API
const fetchNews = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is not found in localStorage");
    return;
  }

  const response = await NewsService.News(token);
  news.value = response?.data?.docs;
};

// Open dialog to add news
const openAddDialog = () => {
  currentNews.value = {
    id: null,
    title: "",
    slug: "",
    content: "",
    thumbnail: null,
    imagePreview: "",
    isPublished: false,
  };
  showAddDialog.value = true;
};

// Open dialog to edit news
const editNews = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is not found in localStorage");
    return;
  }

  const response = await NewsService.Get(id, token);
  if (response && response.data) {
    currentNews.value = {
      id: response.data.id,
      title: response.data.title,
      slug: response.data.slug,
      content: response.data.content,
      thumbnail: response.data.thumbnail,
      imagePreview: response.data.thumbnail,
      isPublished: response.data.isPublished,
    };
    showEditDialog.value = true;
  } else {
    console.error("Failed to fetch news details");
  }
};

// Close add dialog
const closeAddDialog = () => {
  showAddDialog.value = false;
};

// Close edit dialog
const closeEditDialog = () => {
  showEditDialog.value = false;
};

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      currentNews.value.imagePreview = e.target.result;
      currentNews.value.thumbnail = file;
    };
    reader.readAsDataURL(file);
  }
};

// Save news (add or update)
const saveNews = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is not found in localStorage");
    return;
  }

  const formData = new FormData();
  formData.append("slug", currentNews.value.slug);
  formData.append("title", currentNews.value.title);
  formData.append("content", currentNews.value.content);
  formData.append("isPublished", currentNews.value.isPublished);
  if (currentNews.value.thumbnail) {
    formData.append("thumbnail", currentNews.value.thumbnail);
  }

  if (showEditDialog.value && currentNews.value.id) {
    // Update news
    const response = await NewsService.Update(
      currentNews.value.id,
      formData,
      token
    );
    if (response && response.success) {
      await fetchNews();
      showEditDialog.value = false;
    } else {
      console.error("Failed to update news");
    }
  } else {
    // Add news
    const response = await NewsService.Add(formData, token);
    if (response && response.success) {
      await fetchNews();
      showAddDialog.value = false;
    } else {
      console.error("Failed to add news");
    }
  }
};

// Delete news
const deleteNews = async (id) => {
  if (confirm(t("newsManagement.confirmDelete"))) {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is not found in localStorage");
      return;
    }

    const response = await NewsService.Delete(id, token);
    if (response && response.success) {
      await fetchNews();
    } else {
      console.error("Failed to delete news");
    }
  }
};
</script>

<style scoped>
.news-management {
  padding: 2rem;
}

.custom-datatable {
  margin-bottom: 1.5rem;
}

.custom-button {
  margin-right: 0.5rem;
}

.custom-dialog .p-dialog-content {
  padding: 1.5rem;
}

.image-preview {
  max-width: 100%;
  height: auto;
  margin-top: 1rem;
  border-radius: 8px;
}

.p-field {
  margin-top: 10px;
}
</style>
