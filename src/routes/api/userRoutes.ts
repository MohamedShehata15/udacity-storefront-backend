import { Router, IRouter } from "express";

import UserController from "../../controllers/userController";

const userController = new UserController();
const userRoutes: IRouter = Router();

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);

userRoutes.route("/").get(userController.getAll);
userRoutes
   .route("/:id")
   .get(userController.getOne)
   .patch(userController.update);

export default userRoutes;
