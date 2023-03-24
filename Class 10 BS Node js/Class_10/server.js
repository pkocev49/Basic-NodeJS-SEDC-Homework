import express from "express";

import router from "./consts/routes.consts.js";
const app = express();

app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  res.send("SERVER IS GOOD");
});
app.listen(3000, () => {
  console.log("Server is up and running");
});
