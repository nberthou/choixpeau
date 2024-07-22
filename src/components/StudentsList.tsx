import { FC } from "react";
import { styled } from "@pigment-css/react";
import { Student } from "../types";

const Container = styled("ul")({
  listStyleType: "none",
  fontSize: "2rem",
  display: "grid",
  width: "80%",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "1rem"
});

export const StudentList: FC<{
  students: Student[];
  removeStudent?: (student: Student) => void;
}> = ({ students, removeStudent }) => {
  return (
    <Container>
      {students.map((student) => (
        <li
          key={student.name}
          onClick={() => removeStudent && removeStudent(student)}
        >
          {student.name}
        </li>
      ))}
    </Container>
  );
};
