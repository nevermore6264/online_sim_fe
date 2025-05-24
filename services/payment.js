import { api } from "../utils/axios";

export default {
  async createPaymentQRCode(amount) {
    const response = await api.post("/api/web/payment/qrcode", { amount });
    return response.data;
  },
};
