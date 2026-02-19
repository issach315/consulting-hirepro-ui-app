// src/hooks/useTableData.js
import { useCallback } from "react";

/**
 * Creates a fetchData adapter for DataTable that maps to your API conventions.
 * @param {Function} apiFn - Your service function (e.g. getAllClients)
 * @param {Object} defaults - Default overrides (sortBy, sortDirection, etc.)
 */
export const useTableFetch = (apiFn, defaults = {}) => {
  return useCallback(async (params) => {
    const response = await apiFn({
      page: params.page - 1,
      size: params.pageSize,
      sortBy: params.sortField || defaults.sortBy || "createdAt",
      sortDirection: params.sortOrder?.toUpperCase() || defaults.sortDirection || "DESC",
      filters: params.filters || {},
    });

    const apiData = response.data.data;
    return {
      data: apiData.content,
      total: apiData.metadata.totalElements,
      page: apiData.metadata.currentPage + 1,
      totalPages: apiData.metadata.totalPages,
    };
  }, [apiFn]);
};