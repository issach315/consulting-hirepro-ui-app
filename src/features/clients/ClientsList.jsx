import React, { useState } from "react";
import { DataTable, Drawer } from "@/components";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} from "@/service";

import ClientForm from "./ClientForm";
import {ConfirmationModal} from "@/components";

const ClientsList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create");
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(false);

  // -------------------------
  // OPEN ACTIONS
  // -------------------------
  const openCreate = () => {
    setSelectedClient(null);
    setDrawerMode("create");
    setDrawerOpen(true);
  };

  const openEdit = (client) => {
    setSelectedClient(client);
    setDrawerMode("edit");
    setDrawerOpen(true);
  };

  const openDelete = (client) => {
    setSelectedClient(client);
    setDeleteOpen(true);
  };

  // -------------------------
  // CREATE / UPDATE
  // -------------------------
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (drawerMode === "create") {
        await createClient(values);
      } else {
        await updateClient(selectedClient.id, values);
      }

      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // DELETE
  // -------------------------
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteClient(selectedClient.id);
      setDeleteOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // TABLE COLUMNS
  // -------------------------
  const columns = [
    { field: "clientCode", headerName: "Client Code" },
    { field: "name", headerName: "Name" },
    { field: "subscriptionId", headerName: "Subscription ID" },
    { field: "regions", headerName: "Regions" },
    { field: "status", headerName: "Status" },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="p-2 bg-blue-50 text-blue-600 rounded"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => openDelete(row)}
            className="p-2 bg-red-50 text-red-600 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  // -------------------------
  // FETCH DATA
  // -------------------------
  const fetchData = async (params) => {
    const response = await getAllClients({
      page: params.page - 1,
      size: params.pageSize,
    });

    const apiData = response.data.data;

    return {
      data: apiData.content,
      total: apiData.metadata.totalElements,
      page: apiData.metadata.currentPage + 1,
      totalPages: apiData.metadata.totalPages,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ADD BUTTON */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>

      <DataTable columns={columns} fetchData={fetchData} initialPageSize={10} />

      {/* CREATE / EDIT DRAWER */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerMode === "create" ? "Register Client" : "Update Client"}
        size="lg"
      >
        <ClientForm
          mode={drawerMode}
          initialValues={selectedClient}
          onSubmit={handleSubmit}
          onCancel={() => setDrawerOpen(false)}
          loading={loading}
        />
      </Drawer>

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Client"
        message={`Are you sure you want to delete "${selectedClient?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={loading}
      />
    </div>
  );
};

export default ClientsList;
