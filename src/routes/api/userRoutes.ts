import { Router, IRouter } from "express";

import UserController from "../../controllers/userController";

const userController = new UserController();
const userRoutes: IRouter = Router();

userRoutes.get("/", (req, res, next) => {
   res.status(200).json({
      message: "Hello, World",
   });
});

export default userRoutes;
