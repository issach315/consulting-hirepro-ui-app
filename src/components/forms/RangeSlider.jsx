import React from "react";
import { useField, useFormikContext, ErrorMessage } from "formik";
import { DollarSign, Percent } from "lucide-react";

const RangeSlider = ({
  label,
  name,
  min = 0,
  max = 100,
  step = 1,
  className = "",
  showValue = true,
  icon,
  fullWidth, // Extract fullWidth here
  ...props // Other props will be here (excluding fullWidth)
}) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const Icon =
    icon === "dollar" ? DollarSign : icon === "percent" ? Percent : null;

  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? "md:col-span-2" : ""} ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-neutral-700 dark:text-neutral-300 font-medium text-sm flex items-center gap-2">
            {Icon && <Icon size={18} className="text-neutral-400" />}
            {label}
          </label>
        )}
        {showValue && (
          <span className="text-sm font-semibold text-blue-500 dark:text-blue-400">
            {field.value}
          </span>
        )}
      </div>
      <input
        type="range"
        {...field}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setFieldValue(name, e.target.value)}
        className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        {...props} // Only valid DOM/Formik props
      />
      <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default RangeSlider;