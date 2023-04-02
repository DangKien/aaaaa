import { Field } from "rc-field-form";
import React, { useState } from "react";

function InputValue({ value = "", ...props }) {
  return <input value={value} {...props} />;
}

const Input = React.memo(
  ({ type = "text", label, isRequired, errors, name, className, ...props }) => {
    const [meta, setMeta] = useState("");

    const onMetaChange = (nextMeta) => {
      setMeta(nextMeta.name);
    };
    return (
      <>
        <div className="form-group flex w-full">
          <label htmlFor="label">
            {label}
            <span className="text-red-500 mx-1 text-lg mt-1">
              {isRequired ? "*" : ""}
            </span>
          </label>
          <Field onMetaChange={onMetaChange} name={name} {...props}>
            <InputValue
              type={type || "text"}
              onChange={props.handleChange}
              className={`flex border w-full px-4 ${
                errors?.[meta]?.[0] ? "border-red-400" : "border-gray-300"
              } rounded-md`}
            />
          </Field>
          {errors?.[meta]?.[0] && (
            <p className="pt-1 px-1 text-xs text-red-400">
              {errors?.[meta]?.[0]}
            </p>
          )}
          <div className="py-2 border-b border-dashed border-default opacity-80" />
        </div>
      </>
    );
  }
);

export default Input;
