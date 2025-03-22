import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8000/api", // Change to your deployed URL in prod
})

// Add access token to requests
API.interceptors.request.use((config) => {
  const access = localStorage.getItem("access")
  if (access) {
    config.headers.Authorization = `Bearer ${access}`
  }
  return config
})

// Handle token expiration and refresh automatically
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    const isTokenError =
      error.response &&
      error.response.status === 401 &&
      error.response.data?.code === "token_not_valid"

    if (isTokenError && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refresh = localStorage.getItem("refresh")
        if (!refresh) throw new Error("No refresh token")

        const response = await axios.post("http://localhost:8000/api/token/refresh/", {
          refresh,
        })

        const newAccess = response.data.access
        localStorage.setItem("access", newAccess)

        // Update the failed request with new token and retry
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return API(originalRequest)
      } catch (refreshError) {
        // If refresh also fails, clear tokens and redirect
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  }
)

export default API
