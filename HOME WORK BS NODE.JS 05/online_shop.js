import express from "express";
import router from "./routes.js";
import fs from "fs";
const app = express();

app.use((req, res, next) => {
  let timee = new Date().toLocaleString();
  console.log(`Request on route${req.url} products was made at ${timee}`);
  fs.appendFileSync(
    "logs.txt",
    `\n Request on route${req.url} products was made at ${timee}`
  );
  next();
});
app.use(express.json());
app.use(router);
app.listen(3000, () => {
  console.log("Server is up and running...");
});
