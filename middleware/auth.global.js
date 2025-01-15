import { push } from "notivue";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return; // Chỉ chạy trên client nếu cần
  const token = localStorage.getItem("token");
  if (!token && to.path !== "/") {
    push.warning("You do not have the right !!!");
    return navigateTo("/");
  }
});
