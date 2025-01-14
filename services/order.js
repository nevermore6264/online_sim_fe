import { api } from "../utils/axios";

export default {
  async BuyOTP(serviceCode) {
    const response = await api.post(`/api/sim-service/buy-otp`, {
      serviceCode,
    });
    return response.data;
  },

  async RentOTP(token, data) {
    const response = await api.post(
      `/api/sim-service/rent-otp`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      data
    );
    return response.data;
  },
};
