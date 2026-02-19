// @/service/index.js

// ============================
// App Client
// ============================
export { default as appClient } from "./appClient";
export { apiGet, apiPost, apiPut, apiDelete, apiUpload } from "./appClient";

// ============================
// Auth Service
// ============================
export {
  login,
  register,
  getCurrentUser,
  refreshToken,
  logout,
} from "./authService";

export { default as authService } from "./authService";

// ============================
// Client Service
// ============================
export {
  createClient,
  updateClient,
  deleteClient,
  getClientById,
  getAllClients,
} from "./clientsService";


