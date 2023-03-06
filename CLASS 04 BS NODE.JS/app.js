import fileSevice from "./file-sevice.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import emiter from "./event-service.js";
export const addMovie = (movieName) => {
  const movies = fileSevice.readFromFile("./db/movies.json");
  const movie = {
    id: uuidv4(),
    name: movieName,
  };
  movies.push(movie);
  fileSevice.writeToFile("./db/movies.json", JSON.stringify(movies, null, 2));
  emiter.emit("movie_added", movieName);
};
addMovie("DASDASDs");
    