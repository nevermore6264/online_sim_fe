<template>
  <div class="news-management">
    <h1>{{ $t("newsManagement.title") }}</h1>
    <DataTable
      :value="news"
      :paginator="true"
      :rows="10"
      class="custom-datatable"
    >
      <Column :header="$t('newsManagement.newsTitle')" field="title "></Column>
      <Column
        :header="$t('newsManagement.newsContent')"
        field="content"
      ></Column>
      <Column :header="$t('newsManagement.actions')">
        <template #body="slotProps">
          <Button
            class="custom-button"
            icon="pi pi-pencil"
            @click="editNews(slotProps.data)"
          />
          <Button
            class="custom-button"
            icon="pi pi-trash"
            @click="deleteNews(slotProps.data)"
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
            v-model="currentNews.text"
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
import { ref, onMounted } from "vue";
import NewsService from "@/services/new";
import { useI18n } from "vue-i18n";
import Editor from "@tinymce/tinymce-vue"; // Import TinyMCE Editor

const { t } = useI18n();

const news = ref([]);
const displayDialog = ref(false);
const currentNews = ref({
  id: null,
  title: "",
  content: "",
  image: null,
  imagePreview: "",
});
const isEditMode = ref(false);
const dialogHeader = ref(t("newsManagement.addNews"));

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
    content: "",
    image: null,
    imagePreview: "",
  };
  isEditMode.value = false;
  dialogHeader.value = t("newsManagement.addNews");
  displayDialog.value = true;
};

// Mở dialog để chỉnh sửa tin tức
const editNews = (newsItem) => {
  currentNews.value = { ...newsItem, imagePreview: newsItem.image };
  isEditMode.value = true;
  dialogHeader.value = t("newsManagement.editNews");
  displayDialog.value = true;
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
      currentNews.value.image = file;
    };
    reader.readAsDataURL(file);
  }
};

// Lưu tin tức (thêm hoặc cập nhật)
const saveNews = async () => {
  const formData = new FormData();
  formData.append("title", currentNews.value.title);
  formData.append("content", currentNews.value.content);
  if (currentNews.value.image) {
    formData.append("image", currentNews.value.image);
  }
  if (isEditMode.value) {
    // Cập nhật tin tức
    await NewsService.Update(currentNews.value.id, formData, token);
  } else {
    // Thêm tin tức mới
    await NewsService.Add(formData, token);
  }
  await fetchNews(); // Lấy lại danh sách tin tức sau khi thêm/cập nhật
  closeDialog();
};

// Xóa tin tức
const deleteNews = async (newsItem) => {
  if (confirm(t("newsManagement.confirmDelete"))) {
    await NewsService.Delete(newsItem.id, token);
    await fetchNews(); // Lấy lại danh sách tin tức sau khi xóa
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
