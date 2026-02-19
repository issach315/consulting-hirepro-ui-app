// ExampleForm.jsx - Updated with sections
import React from "react";
import {
  Mail,
  User,
  Lock,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Calendar,
  Clock,
  Upload,
  Award,
  CheckCircle,
  Sliders,
  Star,
} from "lucide-react";
import FormBuilder from "../components/FormBuilder";
import * as Yup from "yup";

const ExampleForm = () => {
  // Define form sections
  const formSections = [
    {
      title: "Basic Information",
      description: "Please provide your personal details",
      columns: 2,
      fields: [
        {
          type: "input",
          name: "firstName",
          label: "First Name",
          placeholder: "Enter your first name",
          icon: User,
          required: true,
        },
        {
          type: "input",
          name: "lastName",
          label: "Last Name",
          placeholder: "Enter your last name",
          icon: User,
          required: true,
        },
        {
          type: "input",
          name: "email",
          label: "Email Address",
          placeholder: "Enter your email",
          inputType: "email",
          icon: Mail,
          required: true,
        },
        {
          type: "input",
          name: "phone",
          label: "Phone Number",
          placeholder: "Enter your phone",
          icon: Phone,
        },
      ],
    },
    {
      title: "Account Security",
      description: "Create a secure password for your account",
      columns: 1,
      fields: [
        {
          type: "input",
          name: "password",
          label: "Password",
          placeholder: "Enter password",
          inputType: "password",
          icon: Lock,
          required: true,
        },
        {
          type: "input",
          name: "confirmPassword",
          label: "Confirm Password",
          placeholder: "Confirm password",
          inputType: "password",
          icon: Lock,
          required: true,
        },
      ],
    },
    {
      title: "Address Information",
      description: "Where can we reach you?",
      columns: 2,
      fields: [
        {
          type: "textarea",
          name: "address",
          label: "Address",
          placeholder: "Enter your full address",
          icon: MapPin,
          rows: 3,
          fullWidth: true,
        },
        {
          type: "select",
          name: "country",
          label: "Country",
          options: [
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" },
            { value: "au", label: "Australia" },
            { value: "in", label: "India" },
            { value: "de", label: "Germany" },
          ],
          icon: Globe,
        },
        {
          type: "input",
          name: "city",
          label: "City",
          placeholder: "Enter your city",
          icon: MapPin,
        },
      ],
    },
    {
      title: "Schedule & Availability",
      description: "Tell us about your availability",
      columns: 3,
      fields: [
        {
          type: "date",
          name: "birthDate",
          label: "Date of Birth",
          icon: Calendar,
        },
        {
          type: "time",
          name: "preferredTime",
          label: "Preferred Time",
          icon: Clock,
        },
        {
          type: "datetime",
          name: "appointment",
          label: "Appointment Date & Time",
          icon: Calendar,
        },
      ],
    },
    {
      title: "Documents & Portfolio",
      description: "Upload your documents and portfolio",
      columns: 2,
      fields: [
        {
          type: "file",
          name: "resume",
          label: "Upload Resume",
          accept: ".pdf,.doc,.docx",
          icon: Upload,
        },
        {
          type: "multiFile",
          name: "portfolio",
          label: "Portfolio Files",
          accept: "image/*,.pdf",
          icon: Upload,
        },
      ],
    },
    {
      title: "Skills & Interests",
      description: "What are you good at and interested in?",
      columns: 2,
      fields: [
        {
          type: "selectSearch",
          name: "skills",
          label: "Primary Skill",
          options: [
            { value: "react", label: "React" },
            { value: "vue", label: "Vue.js" },
            { value: "angular", label: "Angular" },
            { value: "node", label: "Node.js" },
            { value: "python", label: "Python" },
            { value: "java", label: "Java" },
          ],
          icon: Award,
        },
        {
          type: "multiSelectSearch",
          name: "interests",
          label: "Interests",
          options: [
            { value: "coding", label: "Coding" },
            { value: "design", label: "Design" },
            { value: "music", label: "Music" },
            { value: "sports", label: "Sports" },
            { value: "reading", label: "Reading" },
            { value: "travel", label: "Travel" },
          ],
          multiple: true,
          icon: Award,
        },
        {
          type: "radio",
          name: "gender",
          label: "Gender",
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
            { value: "prefer-not-to-say", label: "Prefer not to say" },
          ],
          icon: User,
        },
      ],
    },
    {
      title: "Preferences & Agreements",
      description: "Configure your preferences and agree to terms",
      columns: 2,
      fields: [
        {
          type: "checkbox",
          name: "newsletter",
          label: "Subscribe to newsletter",
          icon: Mail,
        },
        {
          type: "checkbox",
          name: "terms",
          label: "I agree to the terms and conditions",
          required: true,
          icon: CheckCircle,
        },
        {
          type: "range",
          name: "salaryExpectation",
          label: "Salary Expectation",
          min: 30000,
          max: 200000,
          step: 5000,
          icon: DollarSign,
        },
        {
          type: "rating",
          name: "satisfaction",
          label: "How satisfied are you with our service?",
          max: 5,
          icon: "star", // Use string instead of iconComponent
        },
      ],
    },
  ];

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form submitted:", values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    // resetForm(); // Uncomment to reset form after submit
  };

  return (
    <div className=" mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          User Registration Form
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Please fill in all required fields marked with *
        </p>
      </div>

      <FormBuilder
        sections={formSections}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        submitText="Complete Registration"
        resetText="Start Over"
        className="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800"
      />
    </div>
  );
};

export default ExampleForm;
