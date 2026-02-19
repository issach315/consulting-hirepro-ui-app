import React from "react";
import { useField, useFormikContext, ErrorMessage } from "formik";
import ReactDatePicker from "react-datepicker";
import { Clock } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

const TimePicker = ({
  label,
  name,
  className = "",
  icon: Icon = Clock,
  ...props
}) => {
  const { setFieldValue, values } = useFormikContext();
  const [field] = useField(name);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 z-10 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <ReactDatePicker
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => setFieldValue(name, date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
          wrapperClassName="w-full"
          {...props}
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500 mt-0.5"
      />
    </div>
  );
};

export default TimePicker;
