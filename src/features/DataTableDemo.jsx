import React from "react";
import { DataTable } from "@/components";
import { Pencil, Trash2 } from "lucide-react";

const DataTableDemo = () => {
  const columns = [
    { field: "id", headerName: "ID", sortable: true },
    { field: "name", headerName: "Name", sortable: true },
    { field: "email", headerName: "Email", sortable: true },
    { field: "department", headerName: "Department", sortable: true },
    { field: "role", headerName: "Role", sortable: true },
    { field: "status", headerName: "Status", sortable: true },
    { field: "salary", headerName: "Salary", sortable: true },
    { field: "joinDate", headerName: "Join Date", sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Edit: ${row.name}`)}
            className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
            title="Edit"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => alert(`Delete: ${row.name}`)}
            className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const fetchData = async (params) => {
    await new Promise((r) => setTimeout(r, 800));

    const deps = ["Engineering", "Marketing", "Sales", "HR", "Finance"];
    const roles = ["Manager", "Senior", "Junior", "Lead", "Intern"];
    const stats = ["Active", "Inactive", "On Leave"];
    const fNames = [
      "John",
      "Jane",
      "Mike",
      "Emily",
      "David",
      "Sarah",
      "Chris",
      "Anna",
      "Tom",
      "Lisa",
    ];
    const lNames = [
      "Smith",
      "Johnson",
      "Brown",
      "Lee",
      "Wilson",
      "Martin",
      "Davis",
      "Garcia",
      "Lopez",
      "Taylor",
    ];

    const allData = Array.from({ length: 250 }, (_, i) => ({
      id: i + 1,
      name: `${fNames[i % fNames.length]} ${
        lNames[Math.floor(i / fNames.length) % lNames.length]
      }`,
      email: `${fNames[i % fNames.length].toLowerCase()}.$.${lNames[
        Math.floor(i / fNames.length) % lNames.length
      ].toLowerCase()}@company.com`,
      department: deps[i % deps.length],
      role: roles[i % roles.length],
      status: stats[i % stats.length],
      salary: `$${(50000 + i * 1000).toLocaleString()}`,
      joinDate: new Date(
        2020 + (i % 5),
        i % 12,
        (i % 28) + 1
      ).toLocaleDateString(),
    }));

    let filtered = [...allData];

    if (params.filters?.globalSearch) {
      const term = params.filters.globalSearch.toLowerCase();
      filtered = filtered.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(term)
        )
      );
    }

    Object.entries(params.filters || {}).forEach(([key, val]) => {
      if (key !== "globalSearch" && val) {
        filtered = filtered.filter((item) =>
          String(item[key]).toLowerCase().includes(val.toLowerCase())
        );
      }
    });

    if (params.sortField) {
      filtered.sort((a, b) => {
        let av = a[params.sortField];
        let bv = b[params.sortField];

        if (params.sortField === "salary") {
          av = parseInt(av.replace(/[$,]/g, ""));
          bv = parseInt(bv.replace(/[$,]/g, ""));
        }

        return (
          (av < bv ? -1 : av > bv ? 1 : 0) *
          (params.sortOrder === "asc" ? 1 : -1)
        );
      });
    }

    const start = (params.page - 1) * params.pageSize;

    return {
      data: filtered.slice(start, start + params.pageSize),
      total: filtered.length,
      page: params.page,
      totalPages: Math.ceil(filtered.length / params.pageSize),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DataTable
        columns={columns}
        fetchData={fetchData}
        pageSizeOptions={[10, 25, 50, 100]}
        initialPageSize={10}
      />
    </div>
  );
};

export default DataTableDemo;
