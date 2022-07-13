import { Router, IRouter } from "express";

const userRoutes: IRouter = Router();

userRoutes.get("/", (req, res, next) => {
   res.status(200).json({
      message: "Hello, World",
   });
});

export default userRoutes;
