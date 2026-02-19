import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { Heart, Star, ThumbsUp, Smile } from "lucide-react";

const Rating = ({
  label,
  name,
  max = 5,
  icon = "star",
  className = "",
  size = 24,
  fullWidth,
  iconComponent, // Extract iconComponent here to prevent it from reaching DOM
  ...props
}) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [hoverValue, setHoverValue] = useState(0);

  // Use iconComponent if provided, otherwise fall back to icon mapping
  const IconComponent = iconComponent || 
    ({
      star: Star,
      heart: Heart,
      thumbsup: ThumbsUp,
      smile: Smile,
    }[icon] || Star);

  return (
    <div
      className={`flex flex-col gap-2 ${
        fullWidth ? "md:col-span-2" : ""
      } ${className}`}
    >
      {label && (
        <label className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">
          {label}
        </label>
      )}
      <div className="flex items-center gap-1">
        {[...Array(max)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setFieldValue(name, ratingValue)}
              onMouseEnter={() => setHoverValue(ratingValue)}
              onMouseLeave={() => setHoverValue(0)}
              className="transition-transform hover:scale-110"
              {...props} // Only valid DOM/Formik props
            >
              <IconComponent
                size={size}
                className={`${
                  ratingValue <= (hoverValue || field.value)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-neutral-300 dark:text-neutral-600"
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;