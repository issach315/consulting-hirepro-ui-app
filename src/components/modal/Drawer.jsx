import React, { useEffect } from "react";
import { X } from "lucide-react";

const Drawer = ({
  isOpen,
  onClose,
  children,
  title = "",
  position = "right", // 'right', 'left', 'top', 'bottom'
  size = "md", // 'sm', 'md', 'lg', 'xl', 'full'
  showCloseButton = true,
  overlay = true,
  closeOnOverlayClick = true,
  className = "",
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
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

  const positionClasses = {
    right: "inset-y-0 right-0",
    left: "inset-y-0 left-0",
    top: "inset-x-0 top-0",
    bottom: "inset-x-0 bottom-0",
  };

  const sizeClasses = {
    sm: {
      right: "w-80",
      left: "w-80",
      top: "h-64",
      bottom: "h-64",
    },
    md: {
      right: "w-96",
      left: "w-96",
      top: "h-96",
      bottom: "h-96",
    },
    lg: {
      right: "w-[30rem]",
      left: "w-[30rem]",
      top: "h-[32rem]",
      bottom: "h-[32rem]",
    },
    xl: {
      right: "w-[40rem]",
      left: "w-[40rem]",
      top: "h-[40rem]",
      bottom: "h-[40rem]",
    },
    full: {
      right: "w-screen",
      left: "w-screen",
      top: "h-screen",
      bottom: "h-screen",
    },
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      {overlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={closeOnOverlayClick ? onClose : undefined}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed ${positionClasses[position]} ${sizeClasses[size][position]} bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${className}`}
        style={{
          transform: isOpen
            ? "translateX(0)"
            : position === "right"
            ? "translateX(100%)"
            : position === "left"
            ? "translateX(-100%)"
            : position === "top"
            ? "translateY(-100%)"
            : "translateY(100%)",
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
