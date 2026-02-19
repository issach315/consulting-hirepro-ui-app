import React from "react";
import { useField } from "formik";
import { Check } from "lucide-react";

const Checkbox = ({
  children,
  className = "",
  fullWidth, // Extract fullWidth here
  ...props // Other props will be here (excluding fullWidth)
}) => {
  const [field] = useField({ ...props, type: "checkbox" });

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer group ${
        fullWidth ? "md:col-span-2" : ""
      } ${className}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          {...field}
          {...props} // Only valid DOM/Formik props
          className="w-5 h-5 text-blue-500 border-2 border-neutral-300 dark:border-neutral-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
        {field.checked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Check size={14} className="text-white" />
          </div>
        )}
      </div>
      <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
        {children}
      </span>
    </label>
  );
};

export default Checkbox;
