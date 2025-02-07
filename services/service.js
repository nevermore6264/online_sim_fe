import { api } from "../utils/axios";

export default {
  async GetServicesByCountryCode(countryCode) {
    const response = await api.get(
      `/api/services?platform=web&countryCode=${countryCode}`
    );
    return response.data;
  },
};
