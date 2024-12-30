import { api } from "../utils/axios"

export default {
    async GetCurrentAccount() {
        const response = await api.get(`/api/account/get-info`)
        return response.data
    }
}