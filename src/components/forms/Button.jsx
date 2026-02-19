import React from "react";

const Button = ({ 
  children, 
  className = "", 
  variant = "primary",
  fullWidth, // Extract fullWidth
  ...props 
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    outline: "border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:ring-neutral-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props} // Only valid DOM props
    >
      {children}
    </button>
  );
};

export default Button;