// lib/api-services/notification-service.ts

import API from "@/app/lib/api"

export const NotificationService = {
  async getPreferences() {
    const res = await API.get("/notifications/my-preferences/")
    return res.data
  },

  async updatePreferences(data: any) {
    const res = await API.put("/notifications/my-preferences/", data)
    return res.data
  },
}
