import { Store } from "@tanstack/react-store";
import type { Student, Relation } from "./types";
import { Steps, House } from "./types";
import { ReactNode } from "react";
import { Home, Relations, Confirming, Summary, Presentation } from "./pages";

type State = {
  students: Student[];
  currentStep: Steps;
  steps: { [key in Steps]: () => ReactNode };
  relations: Relation[];
  houses: { [key in House]: Student[] };
};

const state: State = {
  students: [],
  currentStep: Steps.HOME,
  steps: {
    [Steps.HOME]: () => <Home />,
    [Steps.RELATIONS]: () => <Relations />,
    [Steps.CONFIRMING]: () => <Confirming />,
    [Steps.PRESENTATION]: () => <Presentation />,
    [Steps.SUMMARY]: () => <Summary />
  },
  relations: [],
  houses: {
    [House.GRYFFINDOR]: [],
    [House.HUFFLEPUFF]: [],
    [House.RAVENCLAW]: [],
    [House.SLYTHERIN]: []
  }
};

export const store = new Store(state);
