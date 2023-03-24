import express from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthModel from "../models/auth.model.js";

const authController = new AuthController();
const authModel = new AuthModel();
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await authController.register(username, password);
    res.status(201).send({ message: "Success registered" });
  } catch (err) {
    res.status(400).send({ message: "Something went wrong", err: err.message });
  }
});

authRouter.post("/login", authModel.loginUser);
authRouter.post("/token", authModel.token);
authRouter.post("/logout", authModel.logout);

export default authRouter;
