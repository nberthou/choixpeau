import { FC, useEffect } from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import { House, Steps, Student } from "../types";
import { assignStudentsToHouses } from "../utils";
import { StudentList } from "../components/StudentsList";
import { styled } from "@pigment-css/react";
import { Button } from "../components/Button";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

const ButtonsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  position: "absolute",
  bottom: "5rem"
});

export const Confirming: FC = () => {
  const { students, relations } = useStore(store);

  const goToStep = (step: Steps): void => {
    store.setState((state) => ({
      ...state,
      currentStep: step
    }));
  };

  useEffect(() => {
    const { students: newStudents } = assignStudentsToHouses(
      students,
      relations
    );
    const filledHouses = Object.groupBy(newStudents, (stud) => stud.house!) as {
      [key in House]: Student[];
    };

    store.setState((state) => ({
      ...state,
      students: newStudents,
      houses: filledHouses
    }));
  }, []);
  return (
    <Container>
      <h1>
        Les élèves suivants vont être répartis dans les quatre maisons de Harry
        Potter !
      </h1>

      <StudentList students={students} />
      <ButtonsContainer>
        <Button color="danger" onClick={() => goToStep(Steps.RELATIONS)}>
          Etape précédente
        </Button>
        <Button color="success" onClick={() => goToStep(Steps.PRESENTATION)}>
          Commencer la présentation
        </Button>
      </ButtonsContainer>
    </Container>
  );
};
