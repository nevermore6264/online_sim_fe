import { api } from "../utils/axios";

export default {
  async News(token) {
    const response = await api.get(`/api/manage-service/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Thêm tin tức mới
  async Add(newsData, token) {
    const response = await api.post(`/api/manage-service/posts`, newsData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Cập nhật tin tức
  async Update(id, newsData, token) {
    const response = await api.put(`/api/manage-service/posts/${id}`, newsData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Xóa tin tức
  async Delete(id, token) {
    const response = await api.delete(`/api/manage-service/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
