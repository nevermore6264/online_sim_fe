<template>
  <div class="card">
    <h2>Buy OTP Service</h2>

    <DataView :value="products" paginator :rows="5">
      <template #list="slotProps">
        <div class="block">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div class="flex sm:flex-row sm:items-center p-6 gap-4 shortNews">
              <div class="flex justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row justify-between items-start gap-2">
                  <div>
                    <span class="text-lg font-medium mt-2">
                      <!-- {{ item.text }} -->
                      Added Provider Selection in the Rental Section!
                    </span>
                    <div
                      class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                    >
                      <!-- {{ item.text }} -->
                      Dear users! We have added the ability to select a provider
                      for the desired country in the rental section! If you need
                      a specific provider, you can choose it after selectin
                    </div>
                  </div>
                </div>
              </div>
              <div class="md:w-40 relative img-news">
                <img
                  class="block xl:block mx-auto rounded w-full"
                  :src="`https://picsum.photos/200/300?random=${index}`"
                  :alt="item.text"
                />
                <div
                  class="absolute bg-black/70 rounded-border"
                  style="left: 4px; top: 4px"
                >
                  <Tag
                    :value="item.inventoryStatus"
                    :severity="getSeverity(item)"
                  ></Tag>
                </div>
              </div>
              <div class="flex flex-col md:items-end gap-8">
                <div class="flex flex-row-reverse md:flex-row gap-2">
                  <Button
                    icon="pi pi-arrow-right"
                    label="Read more"
                    iconPos="right"
                    :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                    class="flex-auto md:flex-initial whitespace-nowrap"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import NewsService from "@/services/new";

export default {
  data() {
    return {
      products: null,
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const data = await NewsService.News();
        this.products = data?.data;
        console.log(products);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },
    getSeverity(product) {
      switch (product.inventoryStatus) {
        case "INSTOCK":
          return "success";

        case "LOWSTOCK":
          return "warn";

        case "OUTOFSTOCK":
          return "danger";

        default:
          return null;
      }
    },
  },
};
</script>

<style scoped>
.img-news {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.shortNews {
  width: 100%;
  max-width: 700px;
  height: 200px;
  border: 0px;
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  box-shadow: 0px 0px 0px 0px rgb(255, 255, 255);
  padding: 10px;
  margin: 0 auto 20px;
}
</style>
