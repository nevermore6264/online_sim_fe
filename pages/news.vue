<template>
  <div class="card">
    <h2>{{ $t("landing.headerNews") }}</h2>

    <DataView :value="products" paginator :rows="5">
      <template #list="slotProps">
        <div class="block">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="shortNews"
          >
            <div class="flex flex-col md:items-end gap-2 mt-2">
              <span class="text-sm p-1 font-medium mb-2">
                30/01/25 | 10:12
              </span>
            </div>
            <div class="flex sm:items-start p-1 gap-4">
              <div class="flex justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row justify-between items-start gap-2">
                  <div>
                    <p class="text-lg font-medium mt-2">
                      Added Provider Selection in the Rental Section!
                    </p>
                    <div
                      class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                    >
                      Dear users! We have added the ability to select a provider
                      for the desired country in the rental section! If you need
                      a specific provider, you can choose it after selecting...
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
        const data = await NewsService.NewsForUser();
        this.products = data?.data;
      } catch (error) {
        console.error("Error fetching news:", error);
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

h2 {
  padding: 70px 0px 50px;
  text-align: center;
  font-weight: 700;
  font-size: 44px;
  line-height: 53px;
}
</style>
