import { api } from "../utils/axios";

export default {
  async News() {
    // TODO: Sửa sang API News
    const response = await api.post(`/api/services`);
    return response.data;
  },
};
