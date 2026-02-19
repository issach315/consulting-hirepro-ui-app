import React, { useState } from "react";
import { useField, useFormikContext, ErrorMessage } from "formik";
import { ChevronDown, Search, X, Check } from "lucide-react";

const MultiSelectSearch = ({
  label,
  icon: Icon,
  options = [],
  name,
  className = "",
  placeholder = "Search and select...",
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedValues = field.value || [];
  const selected = options.filter((opt) => selectedValues.includes(opt.value));

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setFieldValue(name, newValues);
  };

  const handleRemove = (value) => {
    setFieldValue(
      name,
      selectedValues.filter((v) => v !== value)
    );
  };

  const handleClear = () => {
    setFieldValue(name, []);
    setSearchTerm("");
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-3 text-neutral-400 z-10">
            <Icon size={18} />
          </div>
        )}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-10 py-2.5 min-h-[42px] rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer`}
        >
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selected.map((opt) => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm"
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(opt.value);
                    }}
                    className="hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="text-neutral-400">{placeholder}</span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-1">
          {selected.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            size={18}
            className={`text-neutral-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
            <div className="p-2 border-b border-neutral-200 dark:border-neutral-700">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => handleToggle(opt.value)}
                    className={`px-4 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-2 ${
                      selectedValues.includes(opt.value)
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedValues.includes(opt.value)
                          ? "bg-blue-500 border-blue-500"
                          : "border-neutral-300 dark:border-neutral-600"
                      }`}
                    >
                      {selectedValues.includes(opt.value) && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <span className="text-neutral-900 dark:text-white">
                      {opt.label}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-neutral-500 text-sm">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500 mt-0.5"
      />
    </div>
  );
};

export default MultiSelectSearch;
