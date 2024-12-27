<template>
  <div>
    <Breadcrumb :home="home" :model="items" />

    <h2>Buy OTP Service</h2>

    <!-- Flex container to hold two tables on the same row -->
    <div class="flex-container">
      <!-- Main DataTable -->
      <div class="table-container">
        <DataTable
          :value="customers"
          scrollable
          scrollHeight="400px"
          dataKey="id"
          :loading="loading"
          @row-click="onRowClick"
        >
          <template #header>
            <div class="flex justify-content-end">
              <!-- Không cần thêm ô tìm kiếm tại header nữa -->
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>

          <Column
            header="Country"
            filterField="country.name"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              <div class="flex align-items-center row-content">
                <img
                  alt="flag"
                  :src="`https://flagsapi.com/${data.country.code}/flat/64.png`"
                  :class="`flag flag-${data.country.code}`"
                  style="width: 24px"
                />
                <span class="country">{{ data.country.name }}</span>
                <span class="dialCode" v-if="data.country.dialCode">
                  ({{ data.country.dialCode }})
                </span>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Sub DataTable for services -->
      <div class="table-container">
        <DataTable
          :value="selectedCustomer?.services"
          scrollable
          scrollHeight="200px"
          dataKey="id"
          :loading="loading"
        >
          <template #header>
            <h5>Services for {{ selectedCustomer?.country?.name }}</h5>
          </template>
          <template #empty> No services found. </template>
          <template #loading> Loading services data. Please wait. </template>

          <Column header="Service" field="text" style="min-width: 12rem" />
          <Column header="Code" field="code" style="min-width: 12rem" />
          <Column header="Price" style="min-width: 12rem">
            <template #body="{ data }"> {{ data?.price }} USD </template>
          </Column>
          <Column header="Action" style="min-width: 12rem">
            <template #body="{ data }">
              <button class="recharge-button" @click="buyService(data)">
                Buy
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- Table for purchased SIMs -->
    <div class="purchased-sim-container">
      <h2>Purchased SIMs</h2>
      <DataTable
        :value="purchasedSims"
        scrollable
        scrollHeight="300px"
        dataKey="id"
        :loading="loading"
      >
        <template #empty> No SIMs purchased yet. </template>
        <template #loading> Loading SIM data. Please wait. </template>

        <Column header="Country" field="country" style="min-width: 12rem" />
        <Column
          header="Phone Number"
          field="phoneNumber"
          style="min-width: 12rem"
        />
        <Column header="Service" field="service" style="min-width: 12rem" />
        <Column header="Price" field="price" style="min-width: 12rem" />
        <Column header="SMS Status" field="status" style="min-width: 12rem">
          <template #body="{ data }">
            <span>
              {{ data.status }}
            </span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // Import useRouter

const router = useRouter(); // Initialize router
const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Receive SMS" }]);
const customers = ref([]);
const purchasedSims = ref([]);
const loading = ref(false);
const selectedCustomer = ref(null);

// Hàm lấy thông tin quốc gia
const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data?.map((country) => ({
      id: country.cca2,
      country: {
        name: country.name.common,
        code: country.cca2,
        cca3: country.cca3,
        dialCode:
          country.idd && country.idd.root
            ? country.idd.root +
              (country.idd?.suffixes?.length ? country.idd?.suffixes[0] : "")
            : "N/A",
      },
      services: [],
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

// Hàm lấy danh sách SIM đã mua
const fetchPurchasedSims = async () => {
  loading.value = true;
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token is not found in localStorage");
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(
      `https://japansim.net/api/account/order-list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.data?.success) {
      purchasedSims.value = response?.data?.data?.docs.map((doc) => ({
        id: doc.id,
        country: doc.countryCode,
        phoneNumber: doc.stock.phone,
        service: doc.stock.serviceCode,
        price: doc.cost,
        status: doc.isActive ? "Active" : "Inactive",
      }));
    } else {
      console.error("Failed to fetch data from API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

// Hàm khởi tạo dữ liệu
const initializeData = async () => {
  loading.value = true;
  const countries = await fetchCountries();
  customers.value = countries;
  loading.value = false;
};

// Hàm xử lý khi click vào row
const onRowClick = async (event) => {
  selectedCustomer.value = event.data;

  // Gọi API lấy dịch vụ khi click vào row
  if (selectedCustomer.value?.country?.cca3) {
    try {
      const countryCode = selectedCustomer.value.country.cca3;
      const response = await axios.get(
        `https://japansim.net/api/services?platform=web&countryCode=${countryCode}`
      );

      if (response?.data?.success) {
        selectedCustomer.value.services = response.data.data;
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }
};

// Hàm xử lý khi click vào nút Buy
const buyService = (service) => {
  // Lưu thông tin dịch vụ vào localStorage hoặc state để sử dụng trong trang thanh toán
  localStorage.setItem("selectedService", JSON.stringify(service));

  // Chuyển hướng đến trang thanh toán
  router.push("/payment"); // Đường dẫn đến trang thanh toán
};

onMounted(() => {
  initializeData();
  fetchPurchasedSims();
});
</script>

<style scoped>
/* Flex container to align two tables side by side */
.flex-container {
  display: flex;
  gap: 2rem; /* Add some space between the tables */
}

.table-container {
  flex: 1; /* Make tables take equal width */
  min-width: 300px; /* Optional: Ensure tables don't get too narrow */
}

.row-content {
  display: flex;
  align-items: center;
  margin: auto 0;
}

.row-content .country {
  margin-left: 15px;
}

.row-content .dialCode {
  margin-left: 15px;
  color: #859398;
}

.quantity {
  color: red !important;
}

.p-datatable-scrollable-wrapper {
  overflow-y: auto; /* Tùy chỉnh cuộn */
}

.p-datatable-scrollable-view {
  max-height: 400px; /* Đảm bảo đúng chiều cao */
}

.recharge-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.recharge-button:hover {
  background-color: #0056b3;
}
</style>
