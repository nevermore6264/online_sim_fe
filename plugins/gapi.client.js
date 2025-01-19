import { gapi } from "gapi-script";

export default ({ app }, inject) => {
  const initGoogleApi = () => {
    return new Promise((resolve) => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            clientId: "key-transformer-444006-i7.apps.googleusercontent.com",
            scope: "email",
          })
          .then(() => {
            resolve(gapi);
          });
      });
    });
  };

  // Inject gapi vào Nuxt context để sử dụng trong toàn bộ ứng dụng
  inject("gapi", {
    initGoogleApi,
    gapi,
  });
};
