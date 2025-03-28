// lib/api-services/api-key-service.ts

import API from "@/app/lib/api"

export const APIKeyService = {
  async getKeys() {
    const res = await API.get("/core/api-keys/")
    return res.data
  },

  async createKey(name: string) {
    const res = await API.post("/core/api-keys/", { name })
    return res.data
  },
}
