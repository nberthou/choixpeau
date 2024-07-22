import { FC, useState } from "react";
import { store } from "../../../store";
import { useStore } from "@tanstack/react-store";
import { Relation as RelationType, Student } from "../../../types";
import { Select, Option } from "../../../components/Select";
import { Button } from "../../../components/Button";
import { styled } from "@pigment-css/react";

const StyledRelation = styled("span")({
  cursor: "pointer",
  borderBottom: "2px dashed white"
});

export const Relation: FC<{ relation?: RelationType }> = ({ relation }) => {
  const { students, relations } = useStore(store);
  const [firstStudent, setFirstStudent] = useState<string>(
    relation?.firstStudent?.name || ""
  );
  const [secondStudent, setSecondStudent] = useState<string>(
    relation?.secondStudent?.name || ""
  );
  const [relationType, setRelationType] = useState<"SHOULD" | "SHOULD_NOT">(
    relation?.relation || "SHOULD"
  );

  const changeRelationType = () => {
    if (relationType === "SHOULD") {
      setRelationType("SHOULD_NOT");
    } else {
      setRelationType("SHOULD");
    }
  };

  const addRelationToState = () => {
    if (
      relations.find(
        (rel) =>
          rel.firstStudent.name === firstStudent &&
          rel.secondStudent.name === secondStudent
      )
    ) {
      return;
    }
    store.setState((state) => ({
      ...state,
      relations: [
        ...state.relations,
        {
          firstStudent: students.find(
            (student) => student.name === firstStudent
          ) as Student,
          secondStudent: students.find(
            (student) => student.name === secondStudent
          ) as Student,
          relation: relationType
        }
      ]
    }));
    setFirstStudent("");
    setSecondStudent("");
    setRelationType("SHOULD");
  };

  const removeStudent = () => {
    const relationToRemove = relations.find(
      (rel) =>
        (rel.firstStudent?.name === firstStudent &&
          rel.secondStudent?.name === secondStudent) ||
        (rel.firstStudent?.name === secondStudent &&
          rel.secondStudent?.name === firstStudent)
    );

    store.setState((state) => ({
      ...state,
      relations: state.relations.filter(
        (rel) =>
          rel.firstStudent?.name !== relationToRemove?.firstStudent?.name &&
          rel.secondStudent?.name !== relationToRemove?.secondStudent?.name
      )
    }));
  };

  const isRelationAlreadyAdded = !!relations.find(
    (rel) =>
      (rel.firstStudent?.name === firstStudent &&
        rel.secondStudent?.name === secondStudent) ||
      (rel.firstStudent?.name === secondStudent &&
        rel.secondStudent?.name === firstStudent)
  );

  const bothStudentsAreSelected = firstStudent && secondStudent;

  return (
    <div>
      <Select
        value={firstStudent}
        onChange={(e) => setFirstStudent(e.target.value)}
      >
        <Option disabled value="">
          Choisissez un élève
        </Option>
        {students.map((student) => (
          <Option key={student.name} value={student.name}>
            {student.name}
          </Option>
        ))}
      </Select>
      et
      <Select
        value={secondStudent}
        onChange={(e) => setSecondStudent(e.target.value)}
      >
        <Option disabled value="">
          Choisissez un élève
        </Option>
        {students
          .filter((student) => student.name !== firstStudent)
          .map((student) => (
            <Option key={student.name} value={student.name}>
              {student.name}
            </Option>
          ))}
      </Select>{" "}
      <StyledRelation
        onClick={() => !isRelationAlreadyAdded && changeRelationType()}
      >
        {relationType === "SHOULD" ? "doivent" : "ne doivent pas"}
      </StyledRelation>{" "}
      être ensemble
      {!isRelationAlreadyAdded && bothStudentsAreSelected && (
        <Button onClick={addRelationToState}>Ajouter la relation</Button>
      )}
      {isRelationAlreadyAdded && (
        <Button color="danger" onClick={() => removeStudent()}>
          Supprimer la relation
        </Button>
      )}
    </div>
  );
};
