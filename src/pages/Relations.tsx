import { FC, useState } from "react";
import { store } from "../store";
import { useStore } from "@tanstack/react-store";
import { Relation } from "./components/Relations/Relation";
import { Steps } from "../types";
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

export const Relations: FC = () => {
  const { relations } = useStore(store);

  const goToNextStep = (): void => {
    store.setState((state) => ({
      ...state,
      currentStep: Steps.CONFIRMING
    }));
  };

  const goToPreviousStep = (): void => {
    store.setState((state) => ({
      ...state,
      currentStep: Steps.HOME
    }));
  };

  return (
    <Container>
      <h1>Relations entre élèves</h1>
      {relations.map((relation) => (
        <div key={relation.firstStudent?.name + relation.secondStudent?.name}>
          <Relation relation={relation} />
        </div>
      ))}
      <Relation />
      <ButtonsContainer>
        <Button color="danger" onClick={goToPreviousStep}>
          Etape précédente
        </Button>
        <Button color="success" onClick={goToNextStep}>
          Prochaine étape
        </Button>
      </ButtonsContainer>
    </Container>
  );
};
