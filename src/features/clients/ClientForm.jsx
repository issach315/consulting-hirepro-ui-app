import React from "react";
import * as Yup from "yup";
import { Building2, Hash, Globe, Activity, CreditCard } from "lucide-react";
import {FormBuilder} from "@/components";

const ClientForm = ({
  initialValues = {},
  mode = "create",
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const sections = [
    {
      title: "Client Information",
      description: "Enter client details",
      columns: 2,
      fields: [
        {
          type: "input",
          name: "clientCode",
          label: "Client Code",
          placeholder: "Enter client code",
          icon: Hash,
          required: true,
          disabled: mode === "edit",
        },
        {
          type: "input",
          name: "name",
          label: "Client Name",
          placeholder: "Enter client name",
          icon: Building2,
          required: true,
        },
        {
          type: "input",
          name: "subscriptionId",
          label: "Subscription ID",
          placeholder: "Enter subscription ID",
          icon: CreditCard,
          required: true,
        },
        {
          type: "select",
          name: "regions",
          label: "Region",
          icon: Globe,
          required: true,
          options: [
            { value: "DOMESTIC", label: "Domestic" },
            { value: "INTERNATIONAL", label: "International" },
          ],
        },
        {
          type: "select",
          name: "status",
          label: "Status",
          icon: Activity,
          required: true,
          options: [
            { value: "ACTIVE", label: "Active" },
            { value: "INACTIVE", label: "Inactive" },
          ],
        },
      ],
    },
  ];

  const validationSchema = Yup.object({
    clientCode: Yup.string().required("Client code is required"),
    name: Yup.string().required("Client name is required"),
    subscriptionId: Yup.string().required("Subscription ID is required"),
    regions: Yup.string().required("Region is required"),
    status: Yup.string().required("Status is required"),
  });

  const defaultValues = {
    clientCode: "",
    name: "",
    subscriptionId: "",
    regions: "DOMESTIC",
    status: "ACTIVE",
    ...initialValues,
  };

  return (
    <FormBuilder
      sections={sections}
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      submitText={mode === "edit" ? "Update Client" : "Create Client"}
      cancelText="Cancel"
      onCancel={onCancel}
      isSubmitting={loading}
    />
  );
};

export default ClientForm;
