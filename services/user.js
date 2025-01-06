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
};
