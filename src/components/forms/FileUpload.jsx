import React from "react";
import { useFormikContext, ErrorMessage } from "formik";
import { Upload, X, FileText } from "lucide-react";

const FileUpload = ({
  label,
  name,
  className = "",
  accept,
  fullWidth, // Extract fullWidth here
  ...props // Other props will be here (excluding fullWidth)
}) => {
  const { setFieldValue, values } = useFormikContext();
  const file = values[name];

  const handleRemove = () => {
    setFieldValue(name, null);
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
          onChange={(e) => setFieldValue(name, e.currentTarget.files[0])}
          className="hidden"
          id={name}
          {...props} // Only valid DOM/Formik props (fullWidth is extracted)
        />
        <label
          htmlFor={name}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
        >
          <Upload size={18} />
          <span className="text-sm">
            {file ? "Change file" : "Choose file"}
          </span>
        </label>
      </div>

      {file && (
        <div className="flex items-center justify-between gap-2 mt-2 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <FileText size={16} className="text-blue-500 flex-shrink-0" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300 truncate">
              {file.name}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            <X size={16} />
          </button>
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

export default FileUpload;
