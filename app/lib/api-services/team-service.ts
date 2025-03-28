// lib/api-services/team-service.ts
import API from "@/app/lib/api"

export const TeamService = {
  async getMembers() {
    const res = await API.get("/accounts/team-members/")
    return res.data
  },

  async addMember(userId: number, role: string) {
    const res = await API.post("/accounts/team-members/", { user: userId, role })
    return res.data
  },

  async updateMember(id: number, data: { role: string }) {
    const res = await API.patch(`/accounts/team-members/${id}/`, data)
    return res.data
  },

  async deleteMember(id: number) {
    const res = await API.delete(`/accounts/team-members/${id}/`)
    return res.data
  },


  inviteMember(email: string, role: string) {
    return API.post("/accounts/team-members/invite/", { email, role });
  },

}
