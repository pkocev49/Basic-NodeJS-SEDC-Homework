import { EventEmitter } from "events";
import fileSevice from "./file-sevice.js";

const emiter = new EventEmitter();
emiter.on("movie_added", (movieName) => {
  console.log("Movie added event...");
  const currntTime = new Date().toLocaleString();
  const logMesage = `
        Movie with name ${movieName} was added at ${currntTime}
        _______________________________________________________________
    `;
  fileSevice.appendToFile("./db/add_movie_logs.txt", logMesage);
});

export default emiter;
