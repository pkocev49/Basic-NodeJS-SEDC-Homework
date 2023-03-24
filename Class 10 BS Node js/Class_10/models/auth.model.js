import AuthController from "../controllers/auth.controller.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fileService from "../shared-services/file-service.js";

class User {
  constructor(name, password) {
    this.id = uuid();
    this.username = name;
    this.password = password;
    this.refreshToken = [];
  }
}

class AuthModel {
  async registerUser(username, password) {
    const users = await fileService.readFile("./db/users.json");
    console.log(typeof users);
    const userExists = users.some((user) => user.username === username);
    console.log(users);

    if (userExists) {
      throw new Error(`User wiht username:${username} arledy exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User(username, hashedPassword);
    users.push(user);
    await fileService.writeFile(
      "./db/users.json",
      JSON.stringify(user, null, 2)
    );
  }
  async loginUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const users = await fileService.readFile("./db/users.json");

    const userFound = users.find((user) => user.username === username);
    console.log(req.body);
    console.log(userFound);
    if (!userFound) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPassValid = await bcrypt.compare(password, userFound.password);
    if (!isPassValid) {
      return res.status(403).send({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        name: userFound.username,
        id: userFound.id,
      },
      "access_token_secret_key",
      {
        expiresIn: "100s",
      }
    );

    const refreshToken = jwt.sign(
      {
        name: userFound.username,
        id: userFound.id,
      },
      "refresh_token_secret"
    );
    userFound.refreshToken = [refreshToken];
    await fileService.writeFile(
      "./db/users.json",
      JSON.stringify(users, null, 2)
    );
    res.send({ accessToken: accessToken, refreshToken });
  }
  async token(req, res) {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.status(403).send({ message: "No token found" });
    }
    const tokenVerify = jwt.verify(refreshToken, "refresh_token_secret");
    const users = await fileService.readFile("./db/users.json");

    const userFound = users.find((user) => user.id === tokenVerify.id);
    if (!userFound) {
      return res.sendStatus(403);
    }
    if (!userFound.refreshToken.some((token) => token === refreshToken)) {
      return res.status(403).send({ message: "Refresh token is not existing" });
    }
    const newToken = jwt.sign(
      {
        name: userFound.username,
        id: userFound.id,
      },
      "access_token_secret_key",
      { expiresIn: "100s" }
    );

    const newRefreshToken = jwt.sign(
      {
        name: userFound.username,
        id: userFound.id,
      },
      "refresh_token_secret"
    );

    const usersToSave = users.map((user) => {
      if (user.id === tokenVerify.id) {
        return {
          ...user,

          refreshToken: [newRefreshToken],
        };
      } else {
        return user;
      }
    });

    await fileService.writeFile(
      "./db/users.json",
      JSON.stringify(usersToSave, null, 2)
    );

    res.send({ newAcessToken: newToken, newRefreshToken: newRefreshToken });
  }
  async logout(req, res) {
    const refreshToken = req.body.token;

    if (!refreshToken) {
      return res.status(403).send({ message: "No token found" });
    }
    const tokenVerify = jwt.verify(refreshToken, "refresh_token_secret");
    const users = await fileService.readFile("./db/users.json");

    const userToSave = users.map((user) => {
      if (user.id === tokenVerify.id) {
        return {
          ...user,
          refreshToken: [],
        };
      } else {
        return user;
      }
    });

    await fileService.writeFile(
      "./db/users.json",
      JSON.stringify(userToSave, null, 2)
    );
    res.status(200).send({ message: "You have been loged out" });
  }
}

export default AuthModel;
