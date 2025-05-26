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
      const checkCallback = setInterval(() => {
        try {
          // Try to access the window's location
          console.log("href ", authWindow.location.href);
          try {
            const callbackUrl = authWindow.location.href;
            if (callbackUrl.includes("code=")) {
              clearInterval(checkCallback);
              const url = new URL(callbackUrl);
              const code = url.searchParams.get("code");
              authWindow.close();

              // Make a POST request to your backend with the code
              api
                .post("/api/auth/google/callback", { code })
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            }
          } catch (e) {
            // If we can't access the window's location, it's likely due to COOP
            // Just continue waiting
            console.log("Waiting for callback...");
          }
        } catch (error) {
          console.log("Error checking window state:", error);
        }
      }, 1000);

      // Set a timeout to clear the interval if it takes too long
      setTimeout(() => {
        clearInterval(checkCallback);
        if (authWindow && !authWindow.closed) {
          authWindow.close();
        }
        reject(new Error("Authentication timed out"));
      }, 300000); // 5 minutes timeout
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
};
