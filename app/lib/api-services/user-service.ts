import API from "../../lib/api"


export async function getProfile() {
    const res = await API.get<any>("/accounts/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.status < 200 || res.status >= 300) throw new Error("Failed to fetch profile")
    return res.data
  }
  
  export async function updateProfile(data: any) {
    const res = await API.get("/accounts/profile/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    })
    if (res.status < 200 || res.status >= 300) throw new Error("Failed to update profile")
    return res.data
  }
  