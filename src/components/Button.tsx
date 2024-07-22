import { ReactNode, FC } from "react";
import { styled } from "@pigment-css/react";
import { House } from "../types";
import { colorsByHouse } from "../utils";

interface ButtonProps {
  color?: "success" | "danger" | House;
}

const ButtonContainer = styled("button")<ButtonProps>({
  backgroundColor: "#DE9C45",
  border: "none",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "25px",
  cursor: "pointer",
  margin: "1rem",
  variants: [
    { props: { color: "success" }, style: { backgroundColor: "#0D421C" } },
    { props: { color: "danger" }, style: { backgroundColor: "#C12120" } },
    {
      props: { color: House.GRYFFINDOR },
      style: {
        backgroundColor: colorsByHouse[House.GRYFFINDOR].secondary,
        color: colorsByHouse[House.GRYFFINDOR].tertiary
      }
    },
    {
      props: { color: House.HUFFLEPUFF },
      style: {
        backgroundColor: colorsByHouse[House.HUFFLEPUFF].secondary,
        color: colorsByHouse[House.HUFFLEPUFF].tertiary
      }
    },
    {
      props: { color: House.RAVENCLAW },
      style: {
        backgroundColor: colorsByHouse[House.RAVENCLAW].secondary,
        color: colorsByHouse[House.RAVENCLAW].tertiary
      }
    },
    {
      props: { color: House.SLYTHERIN },
      style: {
        backgroundColor: colorsByHouse[House.SLYTHERIN].secondary,
        color: colorsByHouse[House.SLYTHERIN].tertiary
      }
    }
  ]
});

export const Button: FC<{
  color?: ButtonProps["color"];
  onClick: any;
  children: ReactNode;
  disabled?: boolean;
}> = ({ children, ...props }) => {
  return <ButtonContainer {...props}>{children}</ButtonContainer>;
};
