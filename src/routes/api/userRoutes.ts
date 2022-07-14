import { Router, IRouter } from "express";

import UserController from "../../controllers/userController";

const userController = new UserController();
const userRoutes: IRouter = Router();

userRoutes.post("/signup", userController.signup);

export default userRoutes;
