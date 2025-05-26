<template>
  <div class="landing-page">
    <div class="flex-container landing-page-container">
      <!-- Bên trái: Danh sách quốc gia -->
      <div class="table-container table-services">
        <input
          v-model="searchCountry"
          :placeholder="$t('landing.search_country')"
          class="search-input"
        />
        <DataTable
          :value="filteredCountries"
          scrollable
          scrollHeight="500px"
          dataKey="code"
          :loading="loading"
        >
          <template #header>
            <div class="lbl_services">{{ $t("landing.select_country") }}</div>
          </template>
          <template #empty>{{ $t("landing.no_countries_found") }}</template>
          <template #loading>{{ $t("landing.loading_countries") }}</template>
          <Column style="min-width: 12rem">
            <template #body="{ data }">
              <div class="b-country-row">
                <div
                  v-for="country in data"
                  :key="country.code"
                  class="country-item"
                  :class="{
                    'selected-country': country.code === selectedCustomer?.code,
                  }"
                  @click.stop="onCountryClick(country)"
                >
                  <img
                    :src="country.flagImage"
                    :alt="country.name"
                    class="flag-image"
                  />
                  <span class="country-name">{{ country.name }}</span>
                  <div
                    class="network-selection"
                    v-if="country.code === selectedCustomer?.code"
                  >
                    <label for="network"
                      >{{ $t("landing.select_network") }}:</label
                    >
                    <Dropdown
                      v-model="selectedNetwork"
                      :options="networkOptions"
                      optionLabel="label"
                      optionValue="value"
                      :placeholder="$t('landing.select_network')"
                      class="w-full small-dropdown"
                      @click="handleDropdownClick"
                    />
                  </div>
                  <button
                    class="select-button"
                    :class="{
                      selected: country.code === selectedCustomer?.code,
                    }"
                  >
                    {{
                      country.code === selectedCustomer?.code
                        ? $t("landing.selected")
                        : $t("landing.select")
                    }}
                  </button>
                </div>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Phần giữa: Chọn gói dịch vụ -->
      <div class="middle-section">
        <div class="package-section">
          <h3>{{ $t("landing.select_package") }}</h3>
          <!-- Input số lượng -->
          <div class="quantity-input">
            <label for="quantity">{{ $t("landing.quantity") }}:</label>
            <InputNumber
              v-model="quantity"
              inputId="quantity"
              :min="1"
              :max="10"
              showButtons
              class="small-input-number"
            />
          </div>
          <!-- Các gói dịch vụ -->
          <div class="package-buttons">
            <div class="package-row">
              <Button
                v-for="(pkg, index) in packages"
                :key="index"
                :label="pkg.label"
                :class="{ selected: selectedPackage === pkg.value }"
                @click="selectPackage(pkg.value)"
                class="package-button"
              />
            </div>
          </div>
          <!-- Tổng tiền -->
          <div class="total-price">
            {{ $t("landing.total_amount") }}: {{ totalPrice }} USD
          </div>
          <!-- Nút mua -->
          <Button class="buy-button" @click="buyPackage">
            {{ $t("landing.buy_package") }}
          </Button>
        </div>
        <!-- Bảng số muốn gọi đến -->
        <div class="table-section">
          <h3>{{ $t("landing.numbers_to_call") }}</h3>
          <input
            v-model="userInputNumber"
            :placeholder="$t('landing.enter_phone_number')"
            class="phone-input"
          />
          <div class="selected-number">
            {{ $t("landing.selected_number") }}: {{ userInputNumber }}
          </div>
        </div>
      </div>

      <!-- Bên phải: 2 bảng -->
      <div class="right-section">
        <!-- Bảng danh sách số đã mua -->
        <div class="table-section">
          <h3>{{ $t("landing.purchased_numbers") }}</h3>
          <DataTable
            :value="purchasedNumbers"
            scrollable
            scrollHeight="200px"
            :loading="purchasedNumbersLoading"
            ref="purchasedNumbersTable"
          >
            <Column field="number" header="Số điện thoại"></Column>
            <!-- <Column field="extendedData" header="Thông tin mở rộng"></Column> -->
            <Column header="Hành động">
              <template #body="{ data }">
                <Button
                  v-if="callStatus[data.id]?.isCalling"
                  icon="pi pi-phone"
                  class="p-button-sm btn-call"
                  :label="`Calling... (${callStatus[data.id].remainingTime}s)`"
                  disabled
                />
                <Button
                  v-else
                  icon="pi pi-phone"
                  class="p-button-sm btn-call"
                  :label="$t('landing.call')"
                  @click="callNumber(data.id)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
        <!-- Bảng danh sách số đã gọi -->
        <div class="table-section">
          <h3>{{ $t("landing.called_numbers") }}</h3>
          <DataTable
            :value="purchasedNumbersSuccess"
            scrollable
            scrollHeight="200px"
            :loading="purchasedNumbersLoadingSuccess"
            ref="purchasedNumbersTableSuccess"
          >
            <Column field="number" header="Số điện thoại"></Column>
            <!-- <Column field="extendedData" header="Thông tin mở rộng"></Column> -->
            <Column header="Hành động">
              <template #body="{}">
                <Button
                  icon="pi pi-phone"
                  class="p-button-sm btn-call"
                  label="Called"
                  disabled
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import { GetAllCountries } from "@/services/country.js";
import { useI18n } from "vue-i18n";
import DurationService from "@/services/duration"; // Import service
import orderService from "../services/order";
import { push } from "notivue";

const { t } = useI18n();
const customers = ref([]);
const loading = ref(false);
const selectedCustomer = ref(null);
const selectedNetwork = ref("any"); // Mặc định chọn Any
const selectedPackage = ref(null); // Gói dịch vụ được chọn
const quantity = ref(1); // Số lượng mặc định
const userInputNumber = ref(null); // Số điện thoại người dùng nhập
// Dành cho Pending
const purchasedNumbers = ref([]); // Danh sách số đã mua
const purchasedNumbersLoading = ref(false); // Trạng thái loading cho purchasedNumbers
const currentPage = ref(1);
const totalPages = ref(1);
const hasNextPage = ref(false);
const purchasedNumbersTable = ref(null); // Ref để truy cập DataTable

// Dành cho Success
const purchasedNumbersSuccess = ref([]); // Danh sách số đã mua
const purchasedNumbersLoadingSuccess = ref(false); // Trạng thái loading cho purchasedNumbers
const currentPageSuccess = ref(1);
const totalPagesSuccess = ref(1);
const hasNextPageSuccess = ref(false);
const purchasedNumbersTableSuccess = ref(null); // Ref để truy cập DataTable

const callStatus = ref({}); // Lưu trữ trạng thái của các cuộc gọi
const countdownTimers = ref({}); // Lưu trữ các bộ đếm ngược

// Danh sách các gói dịch vụ
const packages = ref([]);

const networkOptions = ref([
  { label: t("landing.network_docomo"), value: "docomo" },
  { label: t("landing.network_any"), value: "any" },
]);

// Tính tổng tiền
const totalPrice = computed(() => {
  if (!selectedPackage.value) return 0;
  const selectedPkg = packages.value.find(
    (pkg) => pkg.value === selectedPackage.value
  );
  return selectedPkg ? selectedPkg.price * quantity.value : 0;
});

// Tìm kiếm
const searchCountry = ref("");

// Phân nhóm dựa trên kích thước màn hình
const groupedCustomers = computed(() => {
  const itemsPerRow = 1;
  const groups = [];
  for (let i = 0; i < customers.value.length; i += itemsPerRow) {
    groups.push(customers.value.slice(i, i + itemsPerRow));
  }
  return groups;
});

// Lọc danh sách quốc gia theo tìm kiếm
const filteredCountries = computed(() => {
  if (!searchCountry.value.trim()) return groupedCustomers.value;
  return groupedCustomers.value.map((group) =>
    group.filter((country) =>
      country.name.toLowerCase().includes(searchCountry.value.toLowerCase())
    )
  );
});

const onCountryClick = async (country) => {
  // Cập nhật quốc gia được chọn
  selectedCustomer.value = {
    ...country,
    services: [], // Khởi tạo danh sách dịch vụ trống
  };
};

const handleDropdownClick = (event) => {
  event.stopPropagation(); // Ngăn chặn sự kiện lan truyền
};

const loadJapanServices = async () => {
  const japan = {
    name: "Japan",
    code: "JPN",
    icon: "🇯🇵",
    flagImage: "https://flagsapi.com/JP/flat/64.png",
    services: [],
  };

  // Gán dịch vụ của Japan vào selectedCustomer.value
  selectedCustomer.value = japan;
};

const initializeData = async () => {
  loading.value = true;
  const countries = await GetAllCountries();
  customers.value = countries;
  loading.value = false;
};

const selectPackage = (pkg) => {
  selectedPackage.value = pkg;
};

const buyPackage = async () => {
  if (!selectedPackage.value) {
    push.warning(t("landing.please_select_package"));
    return;
  }

  const selectedPkg = packages.value.find(
    (pkg) => pkg.value === selectedPackage.value
  );

  if (!selectedPkg) {
    push.warning(t("landing.invalid_package"));
    return;
  }

  const seconds = selectedPkg.value; // Số giây của gói
  const phoneNumber = userInputNumber.value; // Số điện thoại người dùng nhập
  const token = localStorage.getItem("token");

  let successCount = 0; // Đếm số lần mua thành công

  // Thực hiện mua gói nhiều lần dựa trên quantity
  for (let i = 0; i < quantity.value; i++) {
    const data = {
      duration: seconds,
    };

    // Ensure data is a plain object without reactive properties
    const plainData = JSON.parse(JSON.stringify(data));

    const response = await orderService.BuyCall(token, plainData);
    if (response.success) {
      successCount++;
    } else {
      push.warning(`Failed to buy call for attempt ${i + 1}`);
    }
  }

  // Hiển thị thông báo tổng hợp
  if (successCount == quantity.value) {
    const msg = t("landing.purchase_success_multiple", {
      package: selectedPkg.label,
      quantity: successCount,
      seconds: seconds,
      phoneNumber: phoneNumber,
    });
    push.success(msg);
  }
};

const startCountdown = (id, duration) => {
  callStatus.value[id] = { remainingTime: duration, isCalling: true };

  countdownTimers.value[id] = setInterval(() => {
    callStatus.value[id].remainingTime -= 1;

    if (callStatus.value[id].remainingTime <= 0) {
      clearInterval(countdownTimers.value[id]);
      callStatus.value[id].isCalling = false;
    }
  }, 1000);
};

const callNumber = async (id) => {
  const token = localStorage.getItem("token");
  if (!userInputNumber.value) {
    push.warning(t("landing.please_enter_number"));
    return;
  }

  const data = {
    phone: userInputNumber.value,
  };
  const plainData = JSON.parse(JSON.stringify(data));

  const responseOfSetCallee = await orderService.SetCallee(
    token,
    plainData,
    id
  );
  if (responseOfSetCallee) {
    const response = await orderService.CreateCall(token, id);
    try {
      if (response.data.status === "SUCCESS") {
        const number = response.data.number; // Giả sử API trả về số điện thoại
        const duration = response.data.extendedData.duration; // Giả sử API trả về duration trong extendedData

        push.success(`Gọi số ${number} thành công!`);
        startCountdown(id, duration); // Bắt đầu đếm ngược
      } else {
        push.error(`Gọi số ${number} thất bại!`);
      }
    } catch (error) {
      console.error("Error calling number:", error);
      push.warning(`Gọi số ${number} thất bại!`);
    }
  }
};

const fetchPurchasedNumbers = async (page = 1) => {
  purchasedNumbersLoading.value = true;
  const token = localStorage.getItem("token");
  try {
    const response = await orderService.OrderList(token, {
      page: page,
      limit: 10,
      type: "buy.call.service",
      statusCode: "PENDING",
    });
    if (page === 1) {
      purchasedNumbers.value = response.data.docs.map((order) => ({
        id: order?.id,
        number: order?.stock?.phone,
        extendedData: order.extendedData,
      }));
    } else {
      purchasedNumbers.value = [
        ...purchasedNumbers.value,
        ...response.data.docs.map((order) => ({
          id: order?.id,
          number: order?.stock?.phone,
          extendedData: order.extendedData,
        })),
      ];
    }
    currentPage.value = response.data.page;
    totalPages.value = response.data.totalPages;
    hasNextPage.value = response.data.hasNextPage;
  } catch (error) {
    console.error("Failed to fetch purchased numbers:", error);
  } finally {
    purchasedNumbersLoading.value = false;
  }
};

const fetchPurchasedNumbersSuccess = async (page = 1) => {
  purchasedNumbersLoading.value = true;
  const token = localStorage.getItem("token");
  try {
    const response = await orderService.OrderList(token, {
      page: page,
      limit: 10,
      type: "buy.call.service",
      statusCode: "SUCCESS",
    });
    if (page === 1) {
      purchasedNumbers.value = response.data.docs.map((order) => ({
        id: order?.id,
        number: order?.stock?.phone,
        extendedData: order.extendedData,
      }));
    } else {
      purchasedNumbersSuccess.value = [
        ...purchasedNumbers.value,
        ...response.data.docs.map((order) => ({
          id: order?.id,
          number: order?.stock?.phone,
          extendedData: order.extendedData,
        })),
      ];
    }
    currentPageSuccess.value = response.data.page;
    totalPagesSuccess.value = response.data.totalPages;
    hasNextPageSuccess.value = response.data.hasNextPage;
  } catch (error) {
    console.error("Failed to fetch purchased numbers:", error);
  } finally {
    purchasedNumbersLoading.value = false;
  }
};

const onScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  if (scrollHeight - (scrollTop + clientHeight) < 50 && hasNextPage.value) {
    fetchPurchasedNumbers(currentPage.value + 1);
  }
};

onMounted(async () => {
  await initializeData();
  await loadJapanServices(); // Load dịch vụ của Japan khi component được mount
  await fetchPurchasedNumbers(); // Load danh sách số đã mua
  await fetchPurchasedNumbersSuccess();

  // Lấy các gói dịch vụ từ API
  try {
    const durations = await DurationService.GetDurations();
    packages.value = durations?.data.map((duration) => ({
      label: t("landing.package1", {
        second: duration.seconds,
        price: duration.price,
      }),
      value: duration.seconds,
      price: duration.price,
    }));
  } catch (error) {
    console.error("Failed to fetch durations:", error);
  }
});

onUnmounted(() => {
  Object.values(countdownTimers.value).forEach((timer) => clearInterval(timer));
});

// Sử dụng watchEffect để gắn sự kiện scroll
watchEffect(() => {
  if (purchasedNumbersTable.value) {
    const tableWrapper = purchasedNumbersTable.value.$el.querySelector(
      ".p-datatable-wrapper"
    );
    if (tableWrapper) {
      tableWrapper.addEventListener("scroll", onScroll);
    }
  }

  if (purchasedNumbersTableSuccess.value) {
    const tableWrapper = purchasedNumbersTableSuccess.value.$el.querySelector(
      ".p-datatable-wrapper"
    );
    if (tableWrapper) {
      tableWrapper.addEventListener("scroll", onScroll);
    }
  }
});
</script>
<style scoped>
.landing-page-container {
  display: flex;
  gap: 20px;
  width: 100%;
  margin: 20px auto 0 auto;
}

.table-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 3; /* Chiếm 30% */
}

.middle-section {
  flex: 4; /* Chiếm 40% */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-section {
  flex: 3; /* Chiếm 30% */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-section .table-section {
  height: 300px;
}

.package-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.quantity-input {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.quantity-input label {
  margin-right: 10px;
  font-weight: bold;
}

.package-buttons {
  margin-bottom: 20px;
}

.package-row {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.package-button {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  background-color: #007bff;
  border: 1px solid #0056b3;
  color: white;
  transition: all 0.3s ease;
}

.package-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.package-button.selected {
  background-color: #28a745;
  color: white;
  border-color: #1e7e34;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.total-price {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
}

.buy-button {
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 30px; /* Tăng kích thước padding */
  cursor: pointer;
  font-size: 18px; /* Tăng kích thước font */
  margin-top: 20px; /* Thêm khoảng cách phía trên */
}

.buy-button:hover {
  background-color: #eccd6e;
}

.table-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.search-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.phone-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.landing-page {
  margin-bottom: 0 !important;
}

.landing-page .p-datatable .p-datatable-tbody > tr > td {
  border: none;
  padding: 5px 5px;
}

.title {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.5em;
  margin: 20px 0;
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

.lbl_services {
  text-align: left;
  font-size: 14px;
  margin-bottom: 14px;
  font-weight: normal;
}

.table-services .p-datatable-header {
  margin-bottom: -15px !important;
  min-width: 135px !important;
  width: max-content !important;
  max-width: 60% !important;
  padding: 0px 15px !important;
  height: 45px !important;
  border-radius: 15px 15px 0 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: rgb(0, 174, 255);
  color: #ffffff;
}

.country-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.3s;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
}

.country-item:hover {
  background-color: rgb(201, 200, 200);
}

.btn-call {
  display: block;
  margin-left: auto;
  margin-right: 0;
}

.flag-image {
  width: 32px;
  height: auto;
  margin-right: 8px;
}

.country-name {
  font-size: 14px;
}

.landing-page .p-datatable-thead {
  display: none;
}

.b-country-row {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  grid-auto-flow: dense;
}

.selected-country {
  background-color: rgb(0, 174, 255) !important;
  color: white;
  font-weight: bold;
}

.select-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto; /* Đẩy nút về phía bên phải */
}

.select-button:hover {
  background-color: #0056b3;
}

.select-button.selected {
  background-color: #ffc107; /* Màu vàng */
  color: #000; /* Màu chữ đen để dễ đọc */
  border: 1px solid #ffc107; /* Viền màu vàng */
}

.network-selection {
  margin-top: 10px;
  padding: 10px;
}

.network-selection label {
  margin-right: 10px;
  font-weight: bold;
}

.network-selection select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.selected-number {
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  text-align: left;
  padding: 5px;
}

.selected-button {
  background-color: #ffc107 !important; /* Màu vàng */
  color: #000 !important; /* Màu chữ đen */
  border: 1px solid #ffc107 !important; /* Viền màu vàng */
}

@media (max-width: 768px) {
  .landing-page-container {
    flex-direction: column;
  }

  .table-container,
  .middle-section,
  .right-section {
    flex: 1;
  }
}
</style>
