// lib/api-services/organization-service.ts

import API from "@/app/lib/api"

export const OrganizationService = {
  async getMyOrganization() {
    const res = await API.get("/accounts/my-organization/")
    return res.data
  },

  updateMyOrganization(data: FormData) {
    return API.put("/accounts/my-organization/", data, {
      headers: {
        "Content-Type": undefined, // REMOVE or set to undefined
      },
    })
  }
}
