import { addStudents, readStudents } from "./file_service.js";
readStudents("./students.json");

addStudents("./students.json", "Pavel Kocev", "pkocev@gmail.com", "12323");
