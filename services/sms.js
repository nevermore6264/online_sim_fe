import { api } from "../utils/axios";

export default {
  async GetAllSmsList(token) {
    const response = await api.get(`/api/account/sms-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
