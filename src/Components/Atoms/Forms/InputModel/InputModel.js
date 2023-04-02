import { Field } from "rc-field-form";
import React, { useState } from "react";

function InputValue({ value = "", ...props }) {
  return <input value={value} {...props} />;
}

const InputModel = React.memo(
  ({
    type = "text",
    label,
    isRequired,
    errors,
    placeholder,
    name,
    className,
    ...props
  }) => {
    const [meta, setMeta] = useState("");

    const onMetaChange = (nextMeta) => {
      setMeta(nextMeta.name);
    };

    return (
      <>
        <Field onMetaChange={onMetaChange} name={name} {...props}>
          <InputValue
            type={type || "text"}
            placeholder={placeholder}
            onChange={props.handleChange}
            className={`${
              errors?.[meta]?.[0] ? "!border-red-400" : "border-gray-300"
            } ${className} border`}
          />
        </Field>
      </>
    );
  }
);

export default InputModel;
