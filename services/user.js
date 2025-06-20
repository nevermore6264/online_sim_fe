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

  async LoginGoogle() {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const authWindow = window.open(
      "https://verifysms.org/api/auth/google",
      "Google Sign In",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    return new Promise((resolve, reject) => {
      function handleMessage(event) {
        if (event.origin !== "https://verifysms.org") return;
        const data = event.data;
        if (data && data.token) {
          window.removeEventListener("message", handleMessage);
          if (authWindow && !authWindow.closed) {
            authWindow.close();
          }
          resolve(data.token);
        }
      }

      window.addEventListener("message", handleMessage);

      // Timeout nếu quá lâu không nhận được message
      setTimeout(() => {
        window.removeEventListener("message", handleMessage);
        if (authWindow && !authWindow.closed) {
          authWindow.close();
        }
        reject(new Error("Authentication timed out"));
      }, 300000); // 5 phút
    });
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

  async GetReferralCode() {
    const response = await api.get("/api/web/refferal-code");
    return response.data;
  },

  async LoginTelegram(telegramData) {
    const response = await api.post("/api/auth/telegram", telegramData);
    return response.data;
  },

  async startCall(orderId) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await api.post(
      `/api/sim-service/create-pokemon-call/${orderId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
