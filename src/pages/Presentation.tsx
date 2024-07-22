import { FC, ReactNode, useEffect, useState } from "react";
import { store } from "../store";
import { useStore } from "@tanstack/react-store";
import { House, Steps, Student } from "../types";
import choixpeau from "../assets/choixpeau.gif";
import { styled, css } from "@pigment-css/react";
import { Button } from "../components/Button";
import { colorsByHouse } from "../utils";

enum View {
  STUDENT = "STUDENT",
  HOUSE = "HOUSE"
}

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

const gifStyle = css({
  height: "25rem",
  width: "100%"
});

const ResultContainer = styled(Container)<{ house: House }>({
  variants: [
    {
      props: { house: House.GRYFFINDOR },
      style: { color: colorsByHouse[House.GRYFFINDOR].secondary }
    },
    {
      props: { house: House.HUFFLEPUFF },
      style: { color: colorsByHouse[House.HUFFLEPUFF].secondary }
    },
    {
      props: { house: House.RAVENCLAW },
      style: { color: colorsByHouse[House.RAVENCLAW].secondary }
    },
    {
      props: { house: House.SLYTHERIN },
      style: { color: colorsByHouse[House.SLYTHERIN].secondary }
    }
  ],
  "& h2": {
    fontSize: "10rem"
  }
});

const ButtonsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  position: "absolute",
  bottom: "5rem"
});
const StudentView: FC<{
  student: Student;
  setView: (view: View) => unknown;
}> = ({ student, setView }) => {
  useEffect(() => {
    setTimeout(() => {
      const mainContainer = document.getElementsByTagName("body")[0];
      mainContainer.style.backgroundColor =
        colorsByHouse[student.house!].primary;
      mainContainer.style.backgroundImage = "none";
      setView(View.HOUSE);
    }, 5000);
  }, []);
  return (
    <Container>
      <h1>{student.name} ira a...</h1>
      <div>
        <img src={choixpeau} alt="choixpeau" className={gifStyle} />
      </div>
    </Container>
  );
};

const HouseView: FC<{
  student: Student;
  setCurrentStudent: (newStudent: Student) => unknown;
  setView: (newView: View) => unknown;
}> = ({ student, setCurrentStudent, setView }) => {
  const { students } = useStore(store);
  const currentStudentIndex = students.findIndex(
    (stud) => stud.name === student.name
  );

  const isLastStudent = currentStudentIndex === students.length - 1;

  const goToNextStudent = () => {
    const mainContainer = document.getElementsByTagName("body")[0];
    mainContainer.style.backgroundColor = "#1E1E1E";
    mainContainer.style.backgroundImage =
      "linear-gradient(rgba(38, 71, 111, 1), rgba(38, 71, 111, 0.1))";
    setCurrentStudent(students[currentStudentIndex + 1]);
    setView(View.STUDENT);
  };

  const goToSummary = () => {
    const mainContainer = document.getElementsByTagName("body")[0];
    mainContainer.style.backgroundColor = "#1E1E1E";
    mainContainer.style.backgroundImage =
      "linear-gradient(rgba(38, 71, 111, 1), rgba(38, 71, 111, 0.1))";
    store.setState((state) => ({
      ...state,
      currentStep: Steps.SUMMARY
    }));
  };

  return (
    <ResultContainer house={student.house!}>
      <h1>{student.name} ira a... </h1>
      <div>
        <h2>{student.house}</h2>
      </div>
      <ButtonsContainer>
        {isLastStudent ? (
          <Button color={student.house!} onClick={goToSummary}>
            Voir le résumé
          </Button>
        ) : (
          <Button color={student.house!} onClick={goToNextStudent}>
            Eleve suivant
          </Button>
        )}
      </ButtonsContainer>
    </ResultContainer>
  );
};

export const Presentation: FC = () => {
  const { students } = useStore(store);
  const [currentStudent, setCurrentStudent] = useState<Student>(students[0]);
  const [view, setView] = useState<View>(View.STUDENT);

  const getCurrentView = (student: Student): { [key in View]: ReactNode } => ({
    [View.STUDENT]: <StudentView student={student} setView={setView} />,
    [View.HOUSE]: (
      <HouseView
        student={student}
        setCurrentStudent={setCurrentStudent}
        setView={setView}
      />
    )
  });
  return <div>{getCurrentView(currentStudent)[view]}</div>;
};
