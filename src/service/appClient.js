import axios from "axios";

/* ============================
   BASE URL (Vite)
============================ */
const BASE_URL = "https://consulting-hirepro-service-development.up.railway.app/api" ;

/* ============================
   AXIOS INSTANCE (Cookie Based)
============================ */
const appClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 🔥 IMPORTANT for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================
   RESPONSE INTERCEPTOR
============================ */
appClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 - Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔥 Call refresh-token endpoint (cookie-based)
        await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Retry original request
        return appClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails → logout user
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/* ============================
   HELPER METHODS
============================ */
export const apiGet = (url, config = {}) =>
  appClient.get(url, config);

export const apiPost = (url, data, config = {}) =>
  appClient.post(url, data, config);

export const apiPut = (url, data, config = {}) =>
  appClient.put(url, data, config);

export const apiDelete = (url, config = {}) =>
  appClient.delete(url, config);

export const apiUpload = (url, formData, config = {}) =>
  appClient.post(url, formData, {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    },
  });

export default appClient;
