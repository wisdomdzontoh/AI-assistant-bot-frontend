import API from "../../lib/api"

export const SubscriptionService = {
  async getCurrentSubscription() {
    const res = await API.get("/subscriptions/my-subscription/")
    return res.data
  },

  async getPlans() {
    const res = await API.get("/subscriptions/plans/")
    return res.data
  },

  async getPlanById(planId: number) {
    const res = await API.get(`/subscriptions/plans/${planId}/`)
    return res.data
  },

  async createCheckoutSession(planId: number) {
    const res = await API.post("/subscriptions/create-checkout/", {
      plan_id: planId,
    })
    return res.data
  },
}
