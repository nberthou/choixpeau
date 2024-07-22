import { FC } from "react";
import { styled } from "@pigment-css/react";

const InputContainer = styled("input")({
  padding: "10px",
  margin: "1rem",
  borderRadius: "25px",
  border: "1px solid #DE9C45"
});

export const Input: FC<{
  value: string;
  onChange: any;
  onKeyDown: any;
  placeholder?: string;
}> = ({ ...props }) => {
  return <InputContainer {...props} />;
};
