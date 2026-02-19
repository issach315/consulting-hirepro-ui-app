import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  Columns,
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Check,
  Eye,
  EyeOff,
  SlidersHorizontal,
} from "lucide-react";

const DataTable = ({
  columns = [],
  fetchData,
  pageSizeOptions = [10, 25, 50, 100],
  initialPageSize = 10,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
    totalPages: 0,
  });
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc",
  });
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: true }), {}),
  );
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const columnSelectorRef = useRef();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        sortField: sortConfig.field,
        sortOrder: sortConfig.direction,
        filters: {
          ...filters,
          ...(searchQuery && { globalSearch: searchQuery }),
        },
      };
      const result = await fetchData(params);
      setData(result.data);
      setPagination((prev) => ({
        ...prev,
        total: result.total,
        totalPages: result.totalPages,
        page: result.page,
      }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [
    pagination.page,
    pagination.pageSize,
    sortConfig,
    filters,
    searchQuery,
    fetchData,
  ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        columnSelectorRef.current &&
        !columnSelectorRef.current.contains(e.target)
      ) {
        setShowColumnSelector(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePageChange = (page) =>
    setPagination((prev) => ({ ...prev, page }));
  const handlePageSizeChange = (e) =>
    setPagination((prev) => ({
      ...prev,
      pageSize: parseInt(e.target.value),
      page: 1,
    }));
  const handleSort = (field, e) => {
    e.stopPropagation();
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  const handleFilterChange = (field, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (!value) delete newFilters[field];
      else newFilters[field] = value;
      return newFilters;
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };
  const toggleColumn = (field) =>
    setVisibleColumns((prev) => ({ ...prev, [field]: !prev[field] }));
  const resetFilters = () => {
    setFilters({});
    setSearchQuery("");
    setSortConfig({ field: null, direction: "asc" });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const filteredColumns = columns.filter((col) => visibleColumns[col.field]);
  const hasFilter = (field) => filters[field] && filters[field].trim() !== "";
  const getActiveFilterCount = () =>
    Object.keys(filters).filter(
      (key) => filters[key] && filters[key].trim() !== "",
    ).length;
  const getPageNumbers = () => {
    const { totalPages, page } = pagination;
    const nums = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) nums.push(i);
    } else if (page <= 3) {
      nums.push(1, 2, 3, 4, "...", totalPages);
    } else if (page >= totalPages - 2) {
      nums.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      nums.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
    return nums;
  };

  return (
    <div className="w-full">
      {/* Top Bar - Non-sticky */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full sm:w-64 pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
                showFiltersPanel
                  ? "bg-blue-50 border-blue-300 text-blue-600"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
            <div className="relative" ref={columnSelectorRef}>
              <button
                onClick={() => setShowColumnSelector(!showColumnSelector)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Columns className="w-4 h-4" />
                <span className="hidden sm:inline">Columns</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showColumnSelector && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 min-w-[200px]">
                  <div className="p-3 border-b">
                    <h4 className="font-medium flex items-center gap-2">
                      <Columns className="w-4 h-4" />
                      Columns
                    </h4>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-2">
                    {columns.map((col) => (
                      <button
                        key={col.field}
                        onClick={() => toggleColumn(col.field)}
                        className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                      >
                        {visibleColumns[col.field] ? (
                          <Check className="w-4 h-4 text-blue-600" />
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                        <span className="flex-1 text-left">
                          {col.headerName}
                        </span>
                        {visibleColumns[col.field] ? (
                          <Eye className="w-4 h-4 text-blue-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
              disabled={
                !Object.keys(filters).length &&
                !searchQuery &&
                !sortConfig.field
              }
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <select
              value={pagination.pageSize}
              onChange={handlePageSizeChange}
              className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        {showFiltersPanel && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {getActiveFilterCount()} active
                </span>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear all
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {columns.map((col) => (
                <div key={col.field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {col.headerName}
                    {hasFilter(col.field) && (
                      <span className="ml-2 px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                        Active
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`Filter ${col.headerName}...`}
                      value={filters[col.field] || ""}
                      onChange={(e) =>
                        handleFilterChange(col.field, e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {hasFilter(col.field) && (
                      <button
                        onClick={() => handleFilterChange(col.field, "")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Table Container with Sticky logic */}
      <div className="bg-white rounded-lg shadow border overflow-hidden flex flex-col">
        <div className="overflow-auto max-h-[600px] relative">
          {" "}
          {/* Set a max-height to enable scrolling */}
          <table className="min-w-full divide-y divide-gray-200 table-fixed sm:table-auto">
            <thead className="bg-gray-50 sticky top-0 z-20 shadow-sm">
              <tr>
                {filteredColumns.map((col) => (
                  <th
                    key={col.field}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase group bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-1 flex-1 cursor-pointer"
                        onClick={(e) =>
                          col.sortable !== false && handleSort(col.field, e)
                        }
                      >
                        <span>{col.headerName}</span>
                        {col.sortable !== false &&
                          sortConfig.field === col.field &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="w-3 h-3 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-blue-600" />
                          ))}
                        {col.sortable !== false && !sortConfig.field && (
                          <ArrowUpDown className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100" />
                        )}
                      </div>
                      {hasFilter(col.field) && (
                        <Filter className="w-3 h-3 text-blue-600 ml-2" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={filteredColumns.length} className="px-4 py-24">
                    <div className="flex flex-col justify-center items-center">
                      <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                      <p className="text-gray-600">Loading data...</p>
                    </div>
                  </td>
                </tr>
              ) : !data.length ? (
                <tr>
                  <td
                    colSpan={filteredColumns.length}
                    className="px-4 py-12 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <Search className="w-12 h-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No data found
                      </h3>
                      <p className="text-gray-600">
                        Try adjusting your filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {filteredColumns.map((col) => (
                      <td
                        key={col.field}
                        className="px-4 py-4 text-sm whitespace-nowrap"
                      >
                        {col.renderCell ? col.renderCell(row) : row[col.field]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Sticky Pagination Bar */}
        <div className="sticky bottom-0 z-10 px-4 py-4 bg-gray-50 border-t w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <strong>{(pagination.page - 1) * pagination.pageSize + 1}</strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  pagination.page * pagination.pageSize,
                  pagination.total,
                )}
              </strong>{" "}
              of <strong>{pagination.total}</strong> results
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(1)}
                disabled={pagination.page === 1}
                className="p-2 border rounded-md disabled:opacity-50 hover:bg-white bg-white"
              >
                <ChevronFirst className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="p-2 border rounded-md disabled:opacity-50 hover:bg-white bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {getPageNumbers().map((num, i) =>
                num === "..." ? (
                  <span key={`e${i}`} className="px-3 py-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`px-3 py-2 min-w-[40px] border rounded-md ${
                      pagination.page === num
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {num}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={
                  pagination.page === pagination.totalPages ||
                  pagination.totalPages === 0
                }
                className="p-2 border rounded-md disabled:opacity-50 hover:bg-white bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                disabled={
                  pagination.page === pagination.totalPages ||
                  pagination.totalPages === 0
                }
                className="p-2 border rounded-md disabled:opacity-50 hover:bg-white bg-white"
              >
                <ChevronLast className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
