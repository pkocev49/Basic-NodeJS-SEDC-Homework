import express from "express";
import { isLoggedInValidator } from "./HOME WORK 07/middleware/session.auth.validation.js";
import blogsRouter from "./routes/blogs-routes.js";
import authRouter from "./HOME WORK 07/routes/auth.routes.js";
import { authSession } from "./HOME WORK 07/sessions/auth.session.js";
const app = express();

app.use(express.json());
app.use("/login", authRouter);
app.use("/blogs", blogsRouter);

app.listen(3000, () => {
  console.log("Server is up and running...");
});
// , authSession, isLoggedInValidator,
