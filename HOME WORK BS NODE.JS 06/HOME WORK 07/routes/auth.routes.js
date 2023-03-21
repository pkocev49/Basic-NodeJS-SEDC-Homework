import express from "express";
import session from "express-session";
import { authSession } from "../sessions/auth.session.js";
import fileService from "../../shared-services/file-service.js";

const authRouter = express.Router();

authRouter.post("/", authSession, async (req, res) => {
  const session = req.session;

  const users = JSON.parse(
    await fileService.readFile("./HOME WORK 07/db/users.json", {
      encoding: "utf-8",
    })
  );
  // console.log(users);

  const username = req.body.username;
  const password = req.body.password;

  let loginUser = users.find(
    (user) => user.username === username && user.password === password
  );
  if (loginUser === undefined) {
    res.status(404).send({ message: "Wrong username or password." });
  } else {
    req.session.user = {
      user: username,
      isLoggedIn: true,
    };
    res.status(201).send({ message: "Logged in successfully" });
  }
  console.log("session", session);
});

authRouter.post("/logout", authSession, (req, res) => {
  req.session.destroy();
  res.send({ message: "Logout success" });
});
export default authRouter;
