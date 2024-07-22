import { ChangeEvent, FC, ReactNode } from "react";
import { styled } from "@pigment-css/react";

const SelectContainer = styled("select")({
  padding: "5px",
  border: "1px solid #ccc",
  borderRadius: "25px",
  fontSize: "16px",
  margin: "5px"
});

export const Select: FC<{
  children: ReactNode;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ children, ...props }) => {
  return <SelectContainer {...props}>{children}</SelectContainer>;
};

export const Option: FC<{
  value: string;
  children: ReactNode;
  disabled?: boolean;
}> = ({ value, children, disabled = false }) => {
  return (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  );
};
