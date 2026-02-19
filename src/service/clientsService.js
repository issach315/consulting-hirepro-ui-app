// src/services/clientService.js

import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
} from "./appClient"; // adjust path if needed

const CLIENT_BASE = "/clients";

/* =========================
   CREATE CLIENT
========================= */
export const createClient = async (payload) => {
  return apiPost(CLIENT_BASE, payload);
};

/* =========================
   UPDATE CLIENT
========================= */
export const updateClient = async (clientId, payload) => {
  return apiPut(`${CLIENT_BASE}/${clientId}`, payload);
};

/* =========================
   DELETE CLIENT
========================= */
export const deleteClient = async (clientId) => {
  return apiDelete(`${CLIENT_BASE}/${clientId}`);
};

/* =========================
   GET CLIENT BY ID
========================= */
export const getClientById = async (clientId) => {
  return apiGet(`${CLIENT_BASE}/${clientId}`);
};

/* =========================
   GET ALL CLIENTS
   (Pagination + Search + Filters)
========================= */
export const getAllClients = async ({
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDirection = "DESC",
  filters = {},
}) => {
  const params = { page, size, sortBy, sortDirection };

  // DataTable puts global search inside filters.globalSearch
  const { globalSearch, ...columnFilters } = filters;

  if (globalSearch) {
    params.search = globalSearch;
  }

  Object.entries(columnFilters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params[`filter.${key}`] = value;
    }
  });

  return apiGet(CLIENT_BASE, { params });
};
