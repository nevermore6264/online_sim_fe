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

  async OrderList(token, { page, limit, type }) {
    const response = await api.get(`/api/account/order-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, limit, type },
    });
    return response.data;
  },

  async CreateCall(token, id) {
    const response = await api.get(`/api/sim-service/create-call/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
