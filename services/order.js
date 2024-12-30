import { api } from "../utils/axios"

export default {
    async BuyOTP(serviceCode) {
        const response = await api.post(`/api/sim-service/buy-otp`, { serviceCode })
        return response.data
    }
}