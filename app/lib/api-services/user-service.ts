// lib/api-services/user-service.ts
import API from "../../lib/api"

export async function getProfile() {
  const res = await API.get("/accounts/profile/")
  if (res.status < 200 || res.status >= 300) throw new Error("Failed to fetch profile")
  return res.data
}

export async function updateProfile(data: any) {
  const res = await API.patch("/accounts/profile/", data)
  if (res.status < 200 || res.status >= 300) throw new Error("Failed to update profile")
  return res.data
}
