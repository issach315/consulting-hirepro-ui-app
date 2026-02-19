// Select.jsx
import React from "react";
import { useField } from "formik";

const Select = ({
  label,
  name,
  options = [],
  placeholder = "Select...",
  className = "",
  icon: Icon,
  multiple = false,
  fullWidth = false,
  ...props
}) => {
  const [field, meta] = useField(name);

  // Handle multi-select value properly
  const handleChange = (e) => {
    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions);
      const values = selectedOptions.map(option => option.value);
      field.onChange({ target: { name, value: values } });
    } else {
      field.onChange(e);
    }
  };

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
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Icon className="w-5 h-5 text-neutral-400" />
          </div>
        )}
        <select
          id={name}
          className={`
            w-full px-3 py-2 border rounded-lg bg-white dark:bg-neutral-800 
            text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 
            focus:border-transparent appearance-none transition-all duration-200
            ${Icon ? "pl-10" : ""}
            ${meta.touched && meta.error 
              ? "border-red-500 focus:ring-red-500" 
              : "border-neutral-300 dark:border-neutral-600"
            }
            ${className}
          `}
          multiple={multiple}
          {...field}
          onChange={handleChange}
          value={field.value || (multiple ? [] : "")}
          {...props} // Spread other props
        >
          {!multiple && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default Select;