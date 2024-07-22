import { FC } from "react";
import { store } from "./store";
import { useStore } from "@tanstack/react-store";

const App: FC = () => {
  const { currentStep, steps } = useStore(store);
  const getCurrentStep = steps[currentStep];
  return <div className="App">{getCurrentStep()}</div>;
};

export default App;
