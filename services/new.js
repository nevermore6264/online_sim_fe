import { api } from "../utils/axios";

export default {
  async News() {
    // TODO: Sửa sang API News
    const response = await api.get(`/api/services`);
    return response.data;
  },

  // Thêm tin tức mới
  async Add(newsData) {
    const response = await api.post("/api/news", newsData);
    return response.data;
  },

  // Cập nhật tin tức
  async Update(id, newsData) {
    const response = await api.put(`/api/news/${id}`, newsData);
    return response.data;
  },

  // Xóa tin tức
  async Delete(id) {
    const response = await api.delete(`/api/news/${id}`);
    return response.data;
  },
};
