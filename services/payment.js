import { api } from "../utils/axios";

export default {
  async createPaymentQRCode(amount) {
    const response = await api.post("/api/web/payment/qrcode", { amount });
    return response.data;
  },

  async createTrc20Address(token) {
    const response = await api.post(
      "/api/web/payment/crypto",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
