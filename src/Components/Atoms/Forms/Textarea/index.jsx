import { Field } from "rc-field-form";
import React from "react";

export default function TextArea({
  label,
  name,
  className,
  isRequired,
  errors,
  ...props
}) {
  return (
    <>
      <div className="form-group">
        <label>
          {label}
          <span className="text-red-500 mx-1 text-lg mt-1">
            {isRequired ? "*" : ""}
          </span>
        </label>
        <Field name={name} {...props}>
          <textarea
            type="text"
            className={`form-control ${className} ${
              errors?.[name]?.[0] ? "!border-red-400" : "border-gray-300"
            }`}
            rows="4"
          />
        </Field>
        {errors?.[name]?.[0] && (
          <p className="pt-1 px-1 text-xs text-red-400">
            {errors?.[name]?.[0]}
          </p>
        )}
        <div className="py-2 border-b border-dashed border-default opacity-80" />
      </div>
    </>
  );
}
