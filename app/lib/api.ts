import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

API.interceptors.request.use(
  (config) => {
    // Use access token instead of token
    const accessToken = localStorage.getItem("access")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle token refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refresh")

        if (refreshToken) {
          // Try to get a new access token
          const response = await axios.post(`${API_URL}/accounts/token/refresh/`, {
            refresh: refreshToken,
          })

          // If successful, update the access token
          if (response.data.access) {
            localStorage.setItem("access", response.data.access)

            // Update the authorization header
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`

            // Retry the original request
            return axios(originalRequest)
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError)

        // Clear tokens on refresh failure
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")

        // Redirect to login page
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  },
)

export default API

