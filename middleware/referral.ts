import { useReferralStore } from '~/stores/referral'

export default defineNuxtRouteMiddleware((to) => {
    const referralStore = useReferralStore()

    // Check for referral code in URL parameters
    const code = to.query.code as string
    if (code) {
        referralStore.setReferralCode(code)
    }

    // Check for referral code in path (for /invite/CODE format)
    const inviteMatch = to.path.match(/\/invite\/([^\/]+)/)
    if (inviteMatch && inviteMatch[1]) {
        referralStore.setReferralCode(inviteMatch[1])
    }
}) 