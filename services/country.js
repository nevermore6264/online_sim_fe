import { api } from "../utils/axios"

export default {
    async GetAllCountries() {
        const response = await api.get(`/api/countries`)
        return response.data
    }
}