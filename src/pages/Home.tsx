import { FC, useState } from "react";
import { store } from "../store";
import { useStore } from "@tanstack/react-store";
import { Steps, Student } from "../types";
import { styled } from "@pigment-css/react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { StudentList } from "../components/StudentsList";

const StudentInput = styled(Input)({
  width: "50%"
});

const Title = styled("h1")({
  fontSize: "4rem"
});

const SubTitle = styled("h2")({
  fontSize: "3rem"
});

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

export const Home: FC = () => {
  const { students } = useStore(store);
  const [studentName, setStudentName] = useState<string>("");

  const addStudent = (): void => {
    store.setState((state) => ({
      ...state,
      students: [...state.students, { name: studentName }].sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    }));
    setStudentName("");
  };

  const removeStudent = (student: Student): void => {
    store.setState((state) => ({
      ...state,
      students: state.students.filter((stud) => stud.name !== student.name)
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStudentName(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && studentName.length > 0) {
      addStudent();
    }
  };

  const goToNextStep = (): void => {
    store.setState((state) => ({
      ...state,
      currentStep: Steps.RELATIONS
    }));
  };

  return (
    <>
      <Container>
        <Title>Bienvenue sur le Choixpeau Harry Potter !</Title>
        <div style={{ width: "100%" }}>
          <StudentInput
            value={studentName}
            onChange={handleInputChange}
            onKeyDown={handleEnter}
            placeholder="Entrez le nom de l'élève"
          />
          <Button disabled={studentName.length === 0} onClick={addStudent}>
            Ajouter un élève
          </Button>
        </div>
      </Container>
      <Container>
        <SubTitle>Liste des élèves ({students.length})</SubTitle>
        <StudentList students={students} removeStudent={removeStudent} />
        {students.length > 0 && (
          <Button color="success" onClick={goToNextStep}>
            Prochaine étape{" "}
          </Button>
        )}
      </Container>
    </>
  );
};
