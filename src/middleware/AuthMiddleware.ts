import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "../config";
import { JwtPayload } from "../types/jwtPayload.types";
import { UserRequest } from "../types/userRequest.types";
import { AppError } from "../utils/appError";
import User from "./../models/User";

class AuthMiddleware {
   public async auth(req: UserRequest, res: Response, next: NextFunction) {
      let token: string | null = null;

      try {
         if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
         ) {
            token = req.headers.authorization.split(" ")[1];
         }

         if (!token) {
            return next(new AppError("No token provided", 401));
         }

         const decode = jwt.verify(token, config.jwtSecret || "") as JwtPayload;

         const currentUser = await User.getOne(decode.id);
         if (!currentUser) {
            return next(
               new AppError(
                  "The user belonging to this token does no longer exits",
                  401
               )
            );
         }

         req.user = currentUser;
         next();
      } catch (err) {
         return next(new AppError("Invalid credentials", 401));
      }
   }
}

export default AuthMiddleware;
