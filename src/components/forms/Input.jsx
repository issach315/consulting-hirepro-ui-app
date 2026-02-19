// Input.jsx - Fixed version
import React from "react";
import { useField } from "formik";

const Input = ({
  label,
  name,
  type = "text",
  placeholder = "",
  className = "",
  icon: Icon,
  fullWidth = false,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-neutral-700 dark:text-neutral-300 font-medium text-sm"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon className="w-5 h-5 text-neutral-400" />
          </div>
        )}
        <input
          id={name}
          type={type} // Use type prop, not inputType
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border rounded-lg bg-white dark:bg-neutral-800 
            text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 
            focus:border-transparent transition-all duration-200
            ${Icon ? "pl-10" : ""}
            ${meta.touched && meta.error 
              ? "border-red-500 focus:ring-red-500" 
              : "border-neutral-300 dark:border-neutral-600"
            }
            ${className}
          `}
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default Input;