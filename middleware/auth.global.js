import { push } from "notivue";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return; // Chỉ chạy trên client nếu cần

  const token = localStorage.getItem("token");
  const publicPaths = ["/", "/login", "/signup", "/invite"]; // Thêm /invite vào danh sách public paths
  const { $i18n } = useNuxtApp();

  // Kiểm tra nếu path bắt đầu bằng /invite/ thì cho phép truy cập
  if (to.path.startsWith("/invite/")) {
    return;
  }

  // Nếu không có token và trang hiện tại không thuộc danh sách bỏ qua
  if (!token && !publicPaths.includes(to.path)) {
    push.warning($i18n.t("notify.no_rights"));
    return navigateTo("/");
  }
});
