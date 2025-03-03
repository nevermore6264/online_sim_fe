import { api } from "../utils/axios";

export default {
  async BuyOTP(token, data) {
    const response = await api.post(`/api/sim-service/buy-otp`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async RentOTP(token, data) {
    const response = await api.post(`/api/sim-service/rent-otp`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async BuyCall(token, data) {
    const response = await api.post(`/api/sim-service/buy-call`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
