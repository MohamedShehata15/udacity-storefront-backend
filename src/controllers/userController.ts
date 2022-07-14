import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";
import config from "../config";

class UserController {
   signup = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<Response> => {
      try {
         let user = await User.signup(req.body);
         let jwtSecret: string = config.jwtSecret || "";
         let token = jwt.sign({ id: user.id }, jwtSecret);
         let { password, ...userData } = user;

         return res.status(201).json({
            status: "success",
            data: userData,
            token,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to create: ${(err as Error).message}`,
         });
      }
   };
}

export default UserController;
