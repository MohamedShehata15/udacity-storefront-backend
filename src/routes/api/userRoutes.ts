import { Router, IRouter } from "express";

import UserController from "../../controllers/userController";
import AuthMiddleware from "../../middleware/AuthMiddleware";

const userController = new UserController();
const userRoutes: IRouter = Router();

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);

userRoutes.use(new AuthMiddleware().auth);

userRoutes.route("/").get(userController.getAll);
userRoutes
   .route("/:id")
   .get(userController.getOne)
   .patch(userController.update);

export default userRoutes;
