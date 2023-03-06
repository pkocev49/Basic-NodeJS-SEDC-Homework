import http, { METHODS } from "http";
import fileSevice from "./file-sevice.js";
const server = http.createServer((req, res) => {
  // console.log(req);
  // very basic res
  // res.setHeader("Content-type", "text/html");
  // res.write("<h1>Hello </h1>");
  // res.end();
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<h1>Hello </h1>");
    res.end();
  }
  // if (url === "/contact") {
  //   res.setHeader("Content-type", "text/html");
  //   res.write("<h1>Hello from contact</h1>");
  //   res.end();
  // }
  // if (url === "/about_us") {
  //   res.setHeader("Content-type", "text/html");
  //   res.write("<h1>Hello from about us</h1>");
  //   res.end();
  // }
  // if (url === "/aboutus" && method === "GET") {
  //   res.setHeader("Content-type", "aplication/json");
  //   // res.write(JSON.stringify([{ name: "Pavel" }]));
  //   const movies = fileSevice.readFromFile("./db/movies.json");
  //   res.write(JSON.stringify(movies));
  //   res.end();
  // }
  if (url === "/movies") {
    console.log("I am in movies");
    let body = [];
    req
      .on("data", (dataRecived) => {
        console.log("We resived data");
        body.push(dataRecived);
      })
      .on("end", () => {
        console.log("We are in the end event");
      });
    res.end();
  }
});

server.listen(3000, () => {
  console.log("RUNING...");
});
