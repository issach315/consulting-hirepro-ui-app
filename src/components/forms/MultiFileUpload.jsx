import React from "react";
import { useFormikContext, ErrorMessage } from "formik";
import { Upload, X, FileText } from "lucide-react";

const MultiFileUpload = ({
  label,
  name,
  className = "",
  accept,
  fullWidth, // Extract fullWidth
  ...props
}) => {
  const { setFieldValue, values } = useFormikContext();
  const files = values[name] || [];

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.currentTarget.files);
    setFieldValue(name, [...files, ...newFiles]);
  };

  const handleRemove = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFieldValue(name, newFiles);
  };

  return (
    <div
      className={`flex flex-col gap-1 ${
        fullWidth ? "md:col-span-2" : ""
      } ${className}`}
    >
      {label && (
        <label className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={name}
          multiple
          {...props} // Only valid props
        />
        <label
          htmlFor={name}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
        >
          <Upload size={18} />
          <span className="text-sm">Choose files</span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <FileText size={16} className="text-blue-500 flex-shrink-0" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300 truncate">
                  {file.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500 mt-0.5"
      />
    </div>
  );
};

export default MultiFileUpload;
