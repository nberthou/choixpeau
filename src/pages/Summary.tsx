// @ts-nocheck

import { FC, createRef, useEffect } from "react";
import { store } from "../store";
import { useStore } from "@tanstack/react-store";
import { House, Steps, Student } from "../types";
import { styled } from "@pigment-css/react";
import { colorsByHouse } from "../utils";
import { Button } from "../components/Button";
import { useScreenshot, createFileName } from "use-react-screenshot";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

const HousesContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  "& h2": {
    fontSize: "3rem"
  }
});

const StudentList = styled("ul")({
  listStyle: "none",
  fontSize: "2rem",
  "& li": {
    marginTop: "1rem"
  }
});

const ButtonsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  position: "absolute",
  bottom: "5rem"
});

const HouseName = styled("h2")<{ house: string }>({
  fontSize: "2.75rem !important",
  variants: [
    {
      props: { house: House.GRYFFINDOR },
      style: {
        color: colorsByHouse[House.GRYFFINDOR].primary,
        "-webkit-text-stroke": `0.1px ${
          colorsByHouse[House.HUFFLEPUFF].secondary
        }`
      }
    },
    {
      props: { house: House.HUFFLEPUFF },
      style: {
        color: colorsByHouse[House.HUFFLEPUFF].primary,
        "-webkit-text-stroke": `0.1px ${
          colorsByHouse[House.HUFFLEPUFF].secondary
        }`
      }
    },
    {
      props: { house: House.RAVENCLAW },
      style: {
        color: colorsByHouse[House.RAVENCLAW].secondary,
        "-webkit-text-stroke": `0.1px ${colorsByHouse[House.RAVENCLAW].primary}`
      }
    },
    {
      props: { house: House.SLYTHERIN },
      style: {
        color: colorsByHouse[House.SLYTHERIN].secondary,
        "-webkit-text-stroke": `0.1px ${colorsByHouse[House.SLYTHERIN].primary}`
      }
    }
  ]
});

const ScreenshotContainer = styled("div")({
  backgroundImage: "none"
});

export const Summary: FC = () => {
  const { students, houses } = useStore(store);
  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => {
    const container = document.getElementById("container");
    container.style.backgroundImage =
      "linear-gradient(rgba(38, 71, 111, 1), rgba(38, 71, 111, 0.1))";
    container.style.backgroundColor = "#1E1E1E";
    takeScreenshot(ref.current).then(download);
    container.style.backgroundImage = "none";
    container.style.backgroundColor = "transparent";
  };

  const goBack = (): void => {
    store.setState((state) => ({
      ...state,
      currentStep: Steps.CONFIRMING
    }));
  };
  return (
    <Container>
      <ScreenshotContainer id="container" ref={ref}>
        <h1>Cette année, la classe est composée de : </h1>
        <HousesContainer>
          {Object.keys(houses).map((house) => (
            <div key={house}>
              <HouseName house={house}>{house}</HouseName>
              <StudentList>
                {(houses[house as House] as Student[]).map((student) => (
                  <li key={student.name}>{student.name}</li>
                ))}
              </StudentList>
            </div>
          ))}
        </HousesContainer>
      </ScreenshotContainer>
      <ButtonsContainer>
        <Button color="danger" onClick={goBack}>
          Refaire
        </Button>
        <Button color="success" onClick={downloadScreenshot}>
          Télécharger la liste
        </Button>
      </ButtonsContainer>
    </Container>
  );
};
