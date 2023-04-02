import { Field } from "rc-field-form";
import React, { memo, useState } from "react";
import ReactSelect from "react-select";

function SelectField({ value = false, errors, ...props }) {
  return (
    <ReactSelect
      className={errors ? "border-errors" : ""}
      value={value}
      checked={value}
      {...props}
    />
  );
}

const Select = memo(
  ({ label, errors, name, className, isRequired, ...props }) => {
    const [meta, setMeta] = useState("");

    const onMetaChange = (nextMeta) => {
      setMeta(nextMeta.name);
    };

    return (
      <>
        <div className="form-group flex w-full">
          {label && (
            <label htmlFor="label">
              {label}
              <span className="text-red-500 mx-1 text-lg mt-1">
                {isRequired ? "*" : ""}
              </span>
            </label>
          )}

          <Field onMetaChange={onMetaChange} name={name} {...props}>
            <SelectField errors={errors?.[name]?.[0]} {...props} />
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
export default Select;
