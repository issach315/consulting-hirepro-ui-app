import React, { useState } from "react";
import { DataTable } from "@/components";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} from "@/service";

import { useTableFetch } from "@/hooks"

import ClientForm from "./ClientForm";
import {Modal} from "@/components";
import { ConfirmationModal } from "@/components";

const ClientsList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(false);

  // -------------------------
  // OPEN ACTIONS
  // -------------------------
  const openCreate = () => {
    setSelectedClient(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEdit = (client) => {
    setSelectedClient(client);
    setModalMode("edit");
    setModalOpen(true);
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

      if (modalMode === "create") {
        await createClient(values);
      } else {
        await updateClient(selectedClient.id, values);
      }

      setModalOpen(false);
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
 const fetchData = useTableFetch(getAllClients, { sortBy: "createdAt" });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ADD BUTTON */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-white hover:opacity-90 transition"
          style={{ backgroundColor: "#2A4DBD" }} // theme color
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>

      <DataTable columns={columns} fetchData={fetchData} initialPageSize={10} />

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalMode === "create" ? "Register Client" : "Update Client"}
        size="xl"
      >
        <ClientForm
          mode={modalMode}
          initialValues={selectedClient}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={loading}
        />
      </Modal>

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
