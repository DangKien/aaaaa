import React, { memo } from "react";

import { Field } from "rc-field-form";
import Switch from "react-switch";

function SwitchField({ value = false, ...props }) {
  return <Switch checked={value} {...props} />;
}

const SwitchButton = memo(
  ({
    label,
    name,
    className,
    isRequired,
    offColor = "#3f4254",
    onColor = "#187DE4",
    ...props
  }) => {
    return (
      <>
        <div className="form-group flex w-full">
          <label htmlFor="label">
            {label}
            <span className="text-red-500 mx-1 text-lg mt-1">
              {isRequired ? "*" : ""}
            </span>
          </label>
          <Field name={name} {...props}>
            <SwitchField
              onChange={() => {}}
              offColor={offColor}
              onColor={onColor}
            />
          </Field>
          <div className="py-2 border-b border-dashed border-default opacity-80" />
        </div>
      </>
    );
  }
);

export default SwitchButton;
