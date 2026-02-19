import React, { useState } from "react";
import { useField, useFormikContext, ErrorMessage } from "formik";
import { ChevronDown, Search, X } from "lucide-react";

const SelectSearch = ({ 
  label, 
  icon: Icon, 
  className = "", 
  fullWidth, // Extract fullWidth
  options = [],
  placeholder = "Search and select...",
  ...props 
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selected = options.find((opt) => opt.value === field.value) || null;

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value) => {
    setFieldValue(props.name, value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    setFieldValue(props.name, "");
    setSearchTerm("");
  };

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "md:col-span-2" : ""} ${className}`}>
      {label && (
        <label className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 z-10">
            <Icon size={18} />
          </div>
        )}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer`}
        >
          {selected ? selected.label : <span className="text-neutral-400">{placeholder}</span>}
        </div>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {selected && (
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
          <ChevronDown size={18} className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
            <div className="p-2 border-b border-neutral-200 dark:border-neutral-700">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
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
                    onClick={() => handleSelect(opt.value)}
                    className={`px-4 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                      opt.value === field.value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-neutral-900 dark:text-white'
                    }`}
                  >
                    {opt.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-neutral-500 text-sm">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>

      <ErrorMessage
        name={props.name}
        component="div"
        className="text-sm text-red-500 mt-0.5"
      />
    </div>
  );
};

export default SelectSearch;