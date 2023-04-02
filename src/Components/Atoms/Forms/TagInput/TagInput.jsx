import React, { memo, useState } from "react";
import { Field } from "rc-field-form";
import { TagsInput } from "react-tag-input-component";

function TagField({ value = [], errors, ...props }) {
  return (
    <TagsInput
      value={value}
      {...props}
      placeHolder="Enter"
      className={`${errors ? "border-errors" : ""} h-full w-full`}
      classNames={{
        tag: "",
        input: "",
      }}
    />
  );
}

const TagInput = memo(
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
            <TagField {...props} />
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
export default TagInput;
