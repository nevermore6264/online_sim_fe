<template>
  <div class="news-management">
    <h1>{{ $t("newsManagement.title") }}</h1>
    <DataTable
      :value="news"
      :paginator="true"
      :rows="10"
      class="custom-datatable"
    >
      <Column :header="$t('newsManagement.newsTitle')" field="code"></Column>
      <Column :header="$t('newsManagement.newsContent')" field="text"></Column>
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
            v-model="currentNews.code"
            class="custom-input"
          />
        </div>
        <div class="p-field">
          <label for="content">{{ $t("newsManagement.newsContent") }}</label>
          <Textarea
            id="content"
            v-model="currentNews.text"
            rows="5"
            class="custom-textarea"
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

const { t } = useI18n(); // Sử dụng i18n

const news = ref([]);
const displayDialog = ref(false);
const currentNews = ref({ id: null, title: "", content: "" });
const isEditMode = ref(false);
const dialogHeader = ref(t("newsManagement.addNews"));

// Lấy danh sách tin tức khi component được tạo
onMounted(async () => {
  await fetchNews();
});

// Lấy danh sách tin tức từ API
const fetchNews = async () => {
  const response = await NewsService.News();
  news.value = response?.data;
};

// Mở dialog để thêm tin tức
const openAddDialog = () => {
  currentNews.value = { id: null, title: "", content: "" };
  isEditMode.value = false;
  dialogHeader.value = t("newsManagement.addNews");
  displayDialog.value = true;
};

// Mở dialog để chỉnh sửa tin tức
const editNews = (newsItem) => {
  currentNews.value = { ...newsItem };
  isEditMode.value = true;
  dialogHeader.value = t("newsManagement.editNews");
  displayDialog.value = true;
};

// Đóng dialog
const closeDialog = () => {
  displayDialog.value = false;
};

// Lưu tin tức (thêm hoặc cập nhật)
const saveNews = async () => {
  if (isEditMode.value) {
    // Cập nhật tin tức
    await NewsService.updateNews(currentNews.value.id, currentNews.value);
  } else {
    // Thêm tin tức mới
    await NewsService.addNews(currentNews.value);
  }
  await fetchNews(); // Lấy lại danh sách tin tức sau khi thêm/cập nhật
  closeDialog();
};

// Xóa tin tức
const deleteNews = async (newsItem) => {
  if (confirm(t("newsManagement.confirmDelete"))) {
    await NewsService.deleteNews(newsItem.id);
    await fetchNews(); // Lấy lại danh sách tin tức sau khi xóa
  }
};
</script>

<style scoped>
.news-management {
  padding: 2rem;
}
</style>
