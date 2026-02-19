import React from "react";
import { useField } from "formik";

const Radio = ({ label, className = "", ...props }) => {
  const [field] = useField({ ...props, type: "radio" });

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer group ${className}`}
    >
      <input
        type="radio"
        {...field}
        {...props}
        className="w-5 h-5 text-blue-500 border-2 border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
};

export default Radio;
