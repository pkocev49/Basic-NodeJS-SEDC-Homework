import http from "http";
import fileService from "./file-service.js";

const server = http.createServer((req, res) => {
  const url = req.url;
  //   const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hello my name is Pavel Kocev</h1>");
    res.end();
  }
  if (url === "/student") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<h2>Student Name:Pavel Kocev</h2><h2>Acadmy:SEDC</h2><h2>Subject:BS NODE JS</h2>"
    );
    res.end();
  }
});
server.listen(3000, () => {
  console.log("Server is up and running...");
});
