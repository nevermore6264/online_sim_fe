import { api } from "../utils/axios";

export default {
  async GetCurrentAccount(token) {
    const response = await api.get("/api/account/get-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async CreateUser(userData) {
    const response = await api.post("/api/web/register", userData);
    return response.data;
  },

  async Login(loginData) {
    const response = await api.post("/api/web/login", loginData);
    return response.data;
  },

  async LoginGoogle(loginData) {
    const response = await api.post("/api/web/loginGoogle", loginData);
    return response.data;
  },

  async OrderList(token, { page, limit }) {
    const response = await api.get(`/api/account/order-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, limit },
    });
    return response.data;
  },
};
