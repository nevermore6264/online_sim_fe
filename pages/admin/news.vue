<template>
  <div class="news-management">
    <h1>{{ $t("newsManagement.title") }}</h1>
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
    <Button
      class="custom-button"
      :label="$t('newsManagement.addNews')"
      @click="openAddDialog"
    />
    <Dialog
      v-model:visible="displayDialog"
      :header="dialogHeader"
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
            :disabled="isEditMode"
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
          <!-- Thay thế QuillEditor bằng TinyMCE -->
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
      </div>
      <template #footer>
        <Button
          class="custom-button"
          :label="$t('newsManagement.cancel')"
          icon="pi pi-times"
          @click="closeDialog"
        />
        <Button
          class="custom-button"
          :label="$t('newsManagement.save')"
          icon="pi pi-check"
          @click="saveNews"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import NewsService from "@/services/new";
import { useI18n } from "vue-i18n";
import Editor from "@tinymce/tinymce-vue"; // Import TinyMCE Editor

const { t } = useI18n();

const slugify = (text) => {
  return text
    .toString() // Ensure it's a string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters (e.g., special symbols)
    .replace(/\-\-+/g, "-"); // Replace multiple hyphens with a single hyphen
};

const news = ref([]);
const displayDialog = ref(false);
const currentNews = ref({
  id: null,
  title: "",
  slug: "",
  content: "",
  thumbnail: null,
  imagePreview: "",
});
const isEditMode = ref(false);
const dialogHeader = ref(t("newsManagement.addNews"));

// Watch for changes in the title and generate the slug
watch(
  () => currentNews.value.title,
  (newTitle) => {
    if (newTitle && !isEditMode.value) {
      currentNews.value.slug = slugify(newTitle);
    }
  }
);

// Lấy danh sách tin tức khi component được tạo
onMounted(async () => {
  await fetchNews();
});

// Lấy danh sách tin tức từ API
const fetchNews = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is not found in localStorage");
    loading.value = false;
    return;
  }

  const response = await NewsService.News(token);
  news.value = response?.data;
};

// Mở dialog để thêm tin tức
const openAddDialog = () => {
  currentNews.value = {
    id: null,
    title: "",
    slug: "",
    content: "",
    thumbnail: null,
    imagePreview: "",
  };
  isEditMode.value = false;
  dialogHeader.value = t("newsManagement.addNews");
  displayDialog.value = true;
};

// Mở dialog để chỉnh sửa tin tức
const editNews = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token is not found in localStorage");
    return;
  }

  // Lấy thông tin chi tiết của bản ghi dựa trên id
  const response = await NewsService.Get(id, token);
  if (response && response.data) {
    currentNews.value = {
      id: response.data.id,
      title: response.data.title,
      slug: response.data.slug,
      content: response.data.content,
      thumbnail: response.data.thumbnail,
      imagePreview: response.data.thumbnail, // Hiển thị ảnh preview nếu có
    };
    isEditMode.value = true;
    dialogHeader.value = t("newsManagement.editNews");
    displayDialog.value = true;
  } else {
    console.error("Failed to fetch news details");
  }
};

// Đóng dialog
const closeDialog = () => {
  displayDialog.value = false;
};

// Xử lý upload ảnh
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

// Lưu tin tức (thêm hoặc cập nhật)
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
  if (currentNews.value.thumbnail) {
    formData.append("thumbnail", currentNews.value.thumbnail);
  }

  if (isEditMode.value && currentNews.value.id) {
    // Cập nhật tin tức nếu có id
    const response = await NewsService.Update(
      currentNews.value.id,
      formData,
      token
    );
    if (response && response.success) {
      push.success(t("newsManagement.updateSuccess"));
    } else {
      push.error(t("newsManagement.updateFailed"));
    }
  } else {
    // Thêm tin tức mới nếu không có id
    const response = await NewsService.Add(formData, token);
    if (response && response.success) {
      push.success(t("newsManagement.addSuccess"));
    } else {
      push.error(t("newsManagement.addFailed"));
    }
  }

  await fetchNews(); // Lấy lại danh sách tin tức sau khi thêm/cập nhật
  closeDialog();
};

// Xóa tin tức
const deleteNews = async (id) => {
  if (confirm(t("newsManagement.confirmDelete"))) {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is not found in localStorage");
      return;
    }

    const response = await NewsService.Delete(id, token);
    if (response && response.success) {
      await fetchNews(); // Lấy lại danh sách tin tức sau khi xóa
      push.success(t("newsManagement.deleteSuccess"));
    } else {
      push.error(t("newsManagement.deleteFailed"));
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

.custom-quill {
  height: 300px;
  margin-bottom: 1.5rem;
}
</style>
