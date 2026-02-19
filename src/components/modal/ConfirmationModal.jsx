import React from "react";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import Modal from "./Modal";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning", // 'warning', 'info', 'success', 'danger'
  isLoading = false,
  confirmButtonProps = {},
  cancelButtonProps = {},
}) => {
  const variantConfig = {
    warning: {
      icon: AlertTriangle,
      iconColor: "text-yellow-500",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-500",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    success: {
      icon: CheckCircle,
      iconColor: "text-green-500",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },
    danger: {
      icon: XCircle,
      iconColor: "text-red-500",
      buttonColor: "bg-red-500 hover:bg-red-600",
    },
  };

  const { icon: Icon, iconColor, buttonColor } = variantConfig[variant];

  const footer = (
    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        disabled={isLoading}
        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        {...cancelButtonProps}
      >
        {cancelText}
      </button>
      <button
        onClick={onConfirm}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg text-white ${buttonColor} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
        {...confirmButtonProps}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          confirmText
        )}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-gray-600">{message}</div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
