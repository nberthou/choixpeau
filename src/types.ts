export enum Steps {
  HOME = "Home",
  RELATIONS = "Relations",
  CONFIRMING = "Confirming",
  PRESENTATION = "Presentation",
  SUMMARY = "Summary"
}

export type StoreType = {
  students: Student[];
};

export enum House {
  GRYFFINDOR = "Gryffondor",
  HUFFLEPUFF = "Poufsouffle",
  RAVENCLAW = "Serdaigle",
  SLYTHERIN = "Serpentard"
}

export type Student = {
  name: string;
  house?: House;
};

export type Relation = {
  firstStudent: Student;
  secondStudent: Student;
  relation: "SHOULD" | "SHOULD_NOT";
};
