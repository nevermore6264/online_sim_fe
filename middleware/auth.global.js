import { push } from "notivue";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return; // Chỉ chạy trên client nếu cần

  const token = localStorage.getItem("token");
  const publicPaths = ["/", "/login", "/signup"]; // Các trang không cần bảo vệ

  // Nếu không có token và trang hiện tại không thuộc danh sách bỏ qua
  if (!token && !publicPaths.includes(to.path)) {
    push.warning("You do not have the right !!!");
    return navigateTo("/");
  }
});
