import { Relation, Student, House } from "./types";

export const assignStudentsToHouses = (
  students: Student[],
  relations: Relation[]
) => {
  const houses: { [key in House]: Student[] } = {
    [House.GRYFFINDOR]: [],
    [House.HUFFLEPUFF]: [],
    [House.RAVENCLAW]: [],
    [House.SLYTHERIN]: []
  };

  const newStudents = students;

  const getRandomAvailableHouse = () => {
    const availableHouses = Object.keys(houses).filter(
      (house) =>
        houses[house as House].length < Math.ceil(newStudents.length / 4)
    );
    return availableHouses[Math.floor(Math.random() * availableHouses.length)];
  };

  for (const relation of relations) {
    if (relation.relation === "SHOULD") {
      const firstStudentIndex = newStudents.findIndex(
        (student) => student.name === relation.firstStudent.name
      );
      const secondStudentIndex = newStudents.findIndex(
        (student) => student.name === relation.secondStudent.name
      );
      if (
        !newStudents[firstStudentIndex].house &&
        !newStudents[secondStudentIndex].house
      ) {
        const house = getRandomAvailableHouse();
        houses[house as House].push(newStudents[firstStudentIndex]);
        houses[house as House].push(newStudents[secondStudentIndex]);
        newStudents[firstStudentIndex].house = house as House;
        newStudents[secondStudentIndex].house = house as House;
      } else if (!newStudents[firstStudentIndex].house) {
        newStudents[firstStudentIndex].house =
          newStudents[secondStudentIndex].house;
      } else if (!newStudents[secondStudentIndex].house) {
        newStudents[secondStudentIndex].house =
          newStudents[firstStudentIndex].house;
      }
    }
  }

  for (const relation of relations) {
    if (relation.relation === "SHOULD_NOT") {
      const firstStudentIndex = newStudents.findIndex(
        (student) => student.name === relation.firstStudent.name
      );
      const secondStudentIndex = newStudents.findIndex(
        (student) => student.name === relation.secondStudent.name
      );

      if (
        !newStudents[firstStudentIndex].house &&
        !newStudents[secondStudentIndex].house
      ) {
        const firstHouse = getRandomAvailableHouse();
        const secondHouse =
          firstHouse === getRandomAvailableHouse()
            ? firstHouse === House.GRYFFINDOR
              ? House.SLYTHERIN
              : firstHouse === House.HUFFLEPUFF
              ? House.RAVENCLAW
              : House.GRYFFINDOR
            : getRandomAvailableHouse();

        houses[firstHouse as House].push(newStudents[firstStudentIndex]);
        houses[secondHouse as House].push(newStudents[secondStudentIndex]);

        newStudents[firstStudentIndex].house = firstHouse as House;
        newStudents[secondStudentIndex].house = secondHouse as House;
      } else if (!newStudents[firstStudentIndex].house) {
        newStudents[firstStudentIndex].house =
          newStudents[secondStudentIndex].house === House.GRYFFINDOR
            ? House.SLYTHERIN
            : newStudents[secondStudentIndex].house === House.HUFFLEPUFF
            ? House.RAVENCLAW
            : House.GRYFFINDOR;
      } else if (!newStudents[secondStudentIndex].house) {
        newStudents[secondStudentIndex].house =
          newStudents[firstStudentIndex].house === House.GRYFFINDOR
            ? House.SLYTHERIN
            : newStudents[firstStudentIndex].house === House.HUFFLEPUFF
            ? House.RAVENCLAW
            : House.GRYFFINDOR;
      }
    }
  }
  const unassignedStudents = newStudents.filter((student) => !student.house);
  unassignedStudents.forEach((student) => {
    const house = getRandomAvailableHouse();
    houses[house as House].push(student);
    student.house = house as House;
  });

  return { houses, students: newStudents };
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
