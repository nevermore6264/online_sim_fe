import { defineStore } from 'pinia'

export const useReferralStore = defineStore('referral', {
    state: () => ({
        referralCode: null as string | null,
    }),

    actions: {
        setReferralCode(code: string) {
            this.referralCode = code
            localStorage.setItem('referralCode', code)
        },

        getStoredReferralCode() {
            const code = localStorage.getItem('referralCode')
            if (code) {
                this.referralCode = code
            }
            return this.referralCode
        },

        clearReferralCode() {
            this.referralCode = null
            localStorage.removeItem('referralCode')
        }
    }
}) 