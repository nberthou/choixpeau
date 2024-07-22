import { Relation, Student, House } from "./types";

export const splitStudentsIntoHouses = (
  students: Student[],
  relations: Relation[]
) => {
  const houses: { [key in House]: Student[] } = {
    [House.GRYFFINDOR]: [],
    [House.HUFFLEPUFF]: [],
    [House.RAVENCLAW]: [],
    [House.SLYTHERIN]: []
  };

  const houseMap = new Map<Student, House>();

  const findLeastFilledHouse = (): House => {
    let minHouse = Object.keys(houses)[0] as House;
    Object.keys(houses).forEach((house) => {
      if (houses[house as House].length < houses[minHouse].length) {
        minHouse = house as House;
      }
    });
    return minHouse;
  };

  const addStudentToHouse = (student: Student, house: House) => {
    houses[house]?.push(student);
    houseMap.set(student, house);
  };

  const processRelation = (relation: Relation) => {
    const { firstStudent, secondStudent, relation: relationType } = relation;
    const firstStudentHouse = houseMap.get(firstStudent);
    const secondStudentHouse = houseMap.get(secondStudent);

    if (relationType === "SHOULD") {
      if (
        firstStudentHouse &&
        secondStudentHouse &&
        firstStudentHouse !== secondStudentHouse
      ) {
        if (
          houses[firstStudentHouse]!.length < houses[secondStudentHouse]!.length
        ) {
          addStudentToHouse(secondStudent, firstStudentHouse);
        } else {
          addStudentToHouse(firstStudent, secondStudentHouse);
        }
      } else if (firstStudentHouse) {
        addStudentToHouse(secondStudent, firstStudentHouse);
      } else if (secondStudentHouse) {
        addStudentToHouse(firstStudent, secondStudentHouse);
      } else {
        const newHouse = findLeastFilledHouse();
        addStudentToHouse(firstStudent, newHouse);
        addStudentToHouse(secondStudent, newHouse);
      }
    } else if (relationType === "SHOULD_NOT") {
      if (
        firstStudentHouse &&
        secondStudentHouse &&
        firstStudentHouse === secondStudentHouse
      ) {
        addStudentToHouse(secondStudent, findLeastFilledHouse());
      } else if (firstStudentHouse) {
        addStudentToHouse(secondStudent, findLeastFilledHouse());
      } else if (secondStudentHouse) {
        addStudentToHouse(firstStudent, findLeastFilledHouse());
      } else {
        addStudentToHouse(firstStudent, findLeastFilledHouse());
        addStudentToHouse(secondStudent, findLeastFilledHouse());
      }
    }
  };

  const randomStudents = students.sort(() => Math.random() - 0.5);

  const studentMap = new Map(students.map((s) => [s.name, s]));

  if (relations.length > 0) {
    relations.forEach((rel) => {
      const stud1 = studentMap.get(rel.firstStudent.name);
      const stud2 = studentMap.get(rel.secondStudent.name);
      if (stud1 && stud2) processRelation(rel);
    });
  }

  randomStudents.forEach((student) => {
    if (!houseMap.has(student)) {
      addStudentToHouse(student, findLeastFilledHouse());
    }
  });

  return {
    houses,
    students: randomStudents.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
  };
};

export const colorsByHouse = {
  [House.GRYFFINDOR]: {
    primary: "#C12120",
    secondary: "#DE9C45",
    tertiary: "#F1F1F1"
  },
  [House.HUFFLEPUFF]: {
    primary: "#E2BB51",
    secondary: "#000000",
    tertiary: "#F1F1F1"
  },
  [House.RAVENCLAW]: {
    primary: "#26476F",
    secondary: "#BDB8B2",
    tertiary: "#1E1E1E"
  },
  [House.SLYTHERIN]: {
    primary: "#0D421C",
    secondary: "#DAD4C8",
    tertiary: "#1E1E1E"
  }
};
