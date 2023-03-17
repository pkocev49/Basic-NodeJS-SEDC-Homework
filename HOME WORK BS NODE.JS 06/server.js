import express from "express";
import blogsRouter from "./routes/blogs-routes.js";
const app = express();

app.use(express.json());
app.use("/blogs", blogsRouter);
app.listen(3000, () => {
  console.log("Server is up and running...");
});
