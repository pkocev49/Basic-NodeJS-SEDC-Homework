// import fileService from "./file-service.js";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";

// export const createStudent = (
//   studentName,
//   studentLastName,
//   acadmy,
//   subject
// ) => {
//   const students = fileService.readFromFile("./students.json");

//   const student = {
//     id: uuidv4,
//     name: studentName,
//     lastName: studentLastName,
//     acadmy: acadmy,
//     subject: subject,
//   };
//   students.push(student);

//   fileService.writeToFile("./students.json", JSON.stringify(students, null, 2));
// };

// createStudent("Pavel", "Kocev", "SEDC", "BS NODE.JS");
