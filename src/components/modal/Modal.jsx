import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  children,
  title = "",
  size = "md", // 'sm', 'md', 'lg', 'xl', 'full'
  showCloseButton = true,
  overlay = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = "",
  hideHeader = false,
  footer,
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && closeOnEscape) {
        onClose();
      }
    };
    
    if (closeOnEscape) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-[calc(100vw-2rem)]",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      {overlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={closeOnOverlayClick ? onClose : undefined}
        />
      )}

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal Panel */}
        <div
          className={`relative w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl transform transition-all duration-300 ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {!hideHeader && (title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors ml-auto"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t bg-gray-50 rounded-b-lg">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;