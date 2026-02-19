// src/services/authService.js

import appClient from "./appClient";

/* ============================
   AUTH API SERVICE
============================ */

/**
 * Login User
 * @param {Object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 */
export const login = async (credentials) => {
  const response = await appClient.post("/auth/login", credentials);
  return response.data;
};

/**
 * Register User
 * @param {Object} userData
 */
export const register = async (userData) => {
  const response = await appClient.post("/auth/register", userData);
  return response.data;
};

/**
 * Get Current Logged-in User
 */
export const getCurrentUser = async () => {
  const response = await appClient.get("/auth/me");
  return response.data;
};

/**
 * Refresh Token
 * (Normally handled automatically by interceptor,
 * but exposed here if you want manual control)
 */
export const refreshToken = async () => {
  const response = await appClient.post("/auth/refresh-token");
  return response.data;
};

/**
 * Logout User
 */
export const logout = async () => {
  const response = await appClient.post("/auth/logout");
  return response.data;
};

/* ============================
   DEFAULT EXPORT (OPTIONAL)
============================ */

const authService = {
  login,
  register,
  getCurrentUser,
  refreshToken,
  logout,
};

export default authService;
