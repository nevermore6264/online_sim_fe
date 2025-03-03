<template>
  <div class="news_content_block">
    <!-- Sử dụng Carousel thay cho DataView -->
    <Carousel
      :value="products"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :autoplayInterval="3000"
      circular
    >
      <template #item="slotProps">
        <div class="shortNews">
          <div class="flex flex-col md:items-end gap-2 mt-2">
            <span class="text-sm p-1 font-medium mb-2"> 30/01/25 | 10:12 </span>
          </div>
          <div class="flex sm:items-start p-1 gap-4">
            <div class="flex justify-between md:items-center flex-1 gap-6">
              <div class="flex flex-row justify-between items-start gap-2">
                <div>
                  <p class="text-lg font-medium mt-2">
                    {{ slotProps.data.text }}
                  </p>
                  <div
                    class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                  >
                    {{ slotProps.data.text }}
                  </div>
                </div>
              </div>
            </div>
            <div class="md:w-40 relative img-news">
              <img
                class="block xl:block mx-auto rounded w-full"
                :src="slotProps.data.image"
                :alt="slotProps.data.text"
              />
            </div>
          </div>
          <div class="flex flex-col md:items-end gap-2 mt-2">
            <Button
              icon="pi pi-arrow-right"
              :label="$t('landing.read_more')"
              iconPos="right"
              class="flex-auto md:flex-initial whitespace-nowrap button-next-p"
            ></Button>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Sử dụng Composition API
import NewsService from "@/services/new"; // Import service

// Khai báo biến reactive
const products = ref([]);

// Cấu hình responsive cho Carousel
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

// Hàm fetch dữ liệu
const fetchNews = async () => {
  try {
    const data = await NewsService.News();
    products.value = data?.data.slice(0, 5).map((item) => ({
      title: item.title,
      description: item.description,
      image: `https://picsum.photos/200/300?random=${Math.random()}`, // Hình ảnh ngẫu nhiên
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

// Gọi hàm fetch dữ liệu khi component được mounted
onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.shortNews {
  border: 0px;
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  box-shadow: 0px 0px 0px 0px rgb(255, 255, 255);
  padding: 10px;
  margin: 0 auto 20px;
}

.button-next-p {
  background-color: rgb(0, 174, 255);
  border-radius: 10px;
  border: 1px solid rgb(0, 174, 255);
}

.news_content_block {
  margin: 0 auto;
  width: 95%;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 1rem;
  margin-top: 20px;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 8px rgb(227, 227, 227);
}
</style>
