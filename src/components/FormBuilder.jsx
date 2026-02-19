// FormBuilder.jsx - Updated with section support
import React from "react";
import { Formik, Form } from "formik";

// Import all your form components as default imports
import Input from "./forms/Input";
import TextArea from "./forms/TextArea";
import Select from "./forms/Select";
import Checkbox from "./forms/Checkbox";
import Radio from "./forms/Radio";
import FileUpload from "./forms/FileUpload";
import MultiFileUpload from "./forms/MultiFileUpload";
import DatePicker from "./forms/DatePicker";
import DateTimePicker from "./forms/DateTimePicker";
import TimePicker from "./forms/TimePicker";
import RangeSlider from "./forms/RangeSlider";
import Rating from "./forms/Rating";
import Button from "./forms/Button";

// Import the new search components
import SelectSearch from "./forms/SelectSearch";
import MultiSelectSearch from "./forms/MultiSelectSearch";

// Component mapping
const COMPONENT_MAP = {
  input: Input,
  textarea: TextArea,
  select: Select,
  checkbox: Checkbox,
  radio: Radio,
  file: FileUpload,
  multiFile: MultiFileUpload,
  date: DatePicker,
  datetime: DateTimePicker,
  time: TimePicker,
  range: RangeSlider,
  rating: Rating,
  selectSearch: SelectSearch,
  multiSelectSearch: MultiSelectSearch,
};

const FormBuilder = ({
  config = [],
  sections = [], // New prop for sections
  initialValues = {},
  onSubmit,
  validationSchema,
  validate,
  className = "",
  submitText = "Submit",
  resetText = "Reset",
  showReset = true,
  customComponents = {},
  formProps = {},
  children,
}) => {
  // Build initial values from config if not provided
  const buildInitialValues = () => {
    if (Object.keys(initialValues).length > 0) return initialValues;

    const values = {};
    const allFields = [...config];

    // Also collect fields from sections if provided
    if (sections && sections.length > 0) {
      sections.forEach((section) => {
        if (section.fields) {
          allFields.push(...section.fields);
        }
      });
    }

    allFields.forEach((field) => {
      if (field.name) {
        // Handle different default values based on field type
        if (field.type === "checkbox") {
          values[field.name] = field.defaultValue || false;
        } else if (field.type === "radio") {
          values[field.name] = field.defaultValue || "";
        } else if (
          field.type === "multiSelectSearch" ||
          field.type === "multiFile" ||
          (field.type === "select" && field.multiple)
        ) {
          values[field.name] = field.defaultValue || [];
        } else {
          values[field.name] = field.defaultValue || "";
        }
      }
    });
    return values;
  };

  // Merge custom components with default map
  const allComponents = { ...COMPONENT_MAP, ...customComponents };

  // Render form field based on type
  const renderField = (fieldConfig, index) => {
    const {
      type,
      name,
      label,
      placeholder,
      options = [],
      component,
      condition,
      fullWidth = false,
      className: fieldClassName = "",
      inputType,
      ...fieldProps
    } = fieldConfig;

    // Use custom component if specified, otherwise use type-based component
    const Component = component
      ? allComponents[component] || allComponents[type]
      : allComponents[type];

    if (!Component) {
      console.warn(`Component type "${type}" not found for field "${name}"`);
      return null;
    }

    // Create component props
    const componentProps = {
      name,
      label,
      placeholder,
      className: fieldClassName,
      fullWidth,
      ...fieldProps,
    };

    // For input components, handle inputType (email, password, etc.)
    if (type === "input" && inputType) {
      componentProps.type = inputType;
    }

    // Type-specific rendering
    switch (type) {
      case "select":
      case "selectSearch":
      case "multiSelectSearch":
        return (
          <Component
            key={name || index}
            {...componentProps}
            options={options}
          />
        );

      case "radio":
        if (options.length > 0) {
          return (
            <div key={name || index} className="flex flex-col gap-1">
              {label && (
                <label className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">
                  {label}
                </label>
              )}
              <div className="flex flex-wrap gap-4">
                {options.map((option) => (
                  <Component
                    key={`${name}-${option.value}`}
                    name={name}
                    value={option.value}
                    label={option.label}
                    {...fieldProps}
                  />
                ))}
              </div>
            </div>
          );
        }
        return <Component key={name || index} {...componentProps} />;

      case "checkbox":
        // For single checkbox
        if (!options || options.length === 0) {
          return (
            <Component key={name || index} {...componentProps}>
              {label}
            </Component>
          );
        }
        // For checkbox group
        return (
          <div key={name || index} className="flex flex-col gap-1">
            {label && (
              <label className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">
                {label}
              </label>
            )}
            <div className="flex flex-wrap gap-4">
              {options.map((option) => (
                <Component
                  key={`${name}-${option.value}`}
                  name={name}
                  value={option.value}
                  {...fieldProps}
                >
                  {option.label}
                </Component>
              ))}
            </div>
          </div>
        );

      case "range":
        return (
          <Component
            key={name || index}
            {...componentProps}
            min={fieldProps.min || 0}
            max={fieldProps.max || 100}
            step={fieldProps.step || 1}
          />
        );

      case "rating":
        return (
          <Component
            key={name || index}
            {...componentProps}
            max={fieldProps.max || 5}
            icon={fieldProps.icon || "star"}
          />
        );

      default:
        return <Component key={name || index} {...componentProps} />;
    }
  };

  // Render a section with title and description
  const renderSection = (section, sectionIndex) => {
    const { title, description, fields = [], columns = 4, condition } = section;

    // Check if section should be rendered based on condition
    if (condition && !condition(initialValues)) {
      return null;
    }

    return (
      <div key={sectionIndex} className="form-section mb-8 last:mb-0">
        {/* Section Header */}
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Section Fields */}
        {fields.length > 0 && (
          <div
            className={`grid grid-cols-1 ${
              columns >= 2 ? "sm:grid-cols-2" : ""
            } ${columns >= 3 ? "lg:grid-cols-3" : ""} ${
              columns >= 4 ? "xl:grid-cols-4" : ""
            } gap-6`}
          >
            {fields.map((field, index) => {
              // Check for conditional rendering
              if (field.condition && !field.condition(initialValues)) {
                return null;
              }

              // Handle full-width fields
              const fieldColumns = field.columns || 1;
              const colSpanClass = field.fullWidth
                ? "sm:col-span-2 lg:col-span-3 xl:col-span-4"
                : fieldColumns > 1
                ? `sm:col-span-${Math.min(
                    fieldColumns,
                    2
                  )} lg:col-span-${Math.min(
                    fieldColumns,
                    3
                  )} xl:col-span-${Math.min(fieldColumns, 4)}`
                : "col-span-1";

              return (
                <div key={field.name || index} className={colSpanClass}>
                  {renderField(field, index)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <Formik
      initialValues={buildInitialValues()}
      validationSchema={validationSchema}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting, resetForm, values }) => (
        <Form className={`flex flex-col gap-6 ${className}`} {...formProps}>
          {/* Render sections if provided */}
          {sections && sections.length > 0 ? (
            <div className="space-y-8">{sections.map(renderSection)}</div>
          ) : (
            /* Render flat config if no sections */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {config.map((field, index) => {
                // Check for conditional rendering
                if (field.condition && !field.condition(values)) {
                  return null;
                }

                // Handle full-width fields
                if (field.fullWidth) {
                  return (
                    <div
                      key={field.name || index}
                      className="sm:col-span-2 lg:col-span-3 xl:col-span-4"
                    >
                      {renderField(field, index)}
                    </div>
                  );
                }

                return (
                  <div key={field.name || index} className="col-span-1">
                    {renderField(field, index)}
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom children (for additional content) */}
          {children}

          {/* Form actions */}
          <div className="flex flex-wrap gap-4 pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-700">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5"
            >
              {isSubmitting ? "Submitting..." : submitText}
            </Button>

            {showReset && (
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 px-6 py-2.5"
              >
                {resetText}
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormBuilder;
