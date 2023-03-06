import fs from "fs";
import path from "path";

const writeToFile = (path, data) => {
  fs.writeFileSync(path, data);
};

const readFromFile = (path) => {
  const content = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
  return content;
};

const apendToFile = (path, data) => {
  fs.appendFileSync(path, data);
};

export default {
  writeToFile,
  readFromFile,
  apendToFile,
};
