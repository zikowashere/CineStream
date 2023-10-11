import { AxiosError, AxiosHeaders } from "axios";
import express, { Request, Response } from "express";
import { User } from "../../../users/user/user";
import UserController from "../../controller/user/userController";
import { userSQLRepository } from "../../repository/user/userSqlRepository";

const routerUser = express.Router();
const userRepository = new userSQLRepository();
const userController = new UserController(userRepository);

routerUser.post("/signup", async (req: Request, res: Response) => {
  try {
    const user = await userController.signUp(req.body);
    if (user) {
      const { firstName, lastName } = user;
      return res.status(200).json({ user: { firstName, lastName } });
    } else {
      throw new Error("user Already exist");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
routerUser.post("/signin", async (req: Request, res: Response) => {
  try {
    const token = await userController.signIn(req.body);
    if (token) {
      return res.status(200).json({ token });
    } else {
      throw new Error("please check your credentials");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export default routerUser;
