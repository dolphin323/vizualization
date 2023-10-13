import React from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

type DropdownProps = {
  options: { value: string; label: string }[];
  onChange?: (newValue: { value: string; label: string }) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  return (
    <div>
      <Select
        options={options}
        onChange={onChange as any}
        defaultValue={options[0]}
        instanceId={"optionSelect"}
      />
    </div>
  );
};

export { Dropdown };
