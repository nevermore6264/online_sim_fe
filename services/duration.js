import { api } from "../utils/axios";

export default {
  async GetDurations() {
    const response = await api.get(`/api/durations`);
    return response.data;
  },
};
