const fs = require("fs");
const path = require("path");
let pathSave = path.join(__dirname, "homework.txt");
console.log(pathSave);
fs.writeFileSync(pathSave, "Homework 02 in Basic Node");

fs.appendFileSync(pathSave, "\n FINISHED!!");

const fileContent = fs.readFileSync(pathSave, "utf-8");
console.log(fileContent);
