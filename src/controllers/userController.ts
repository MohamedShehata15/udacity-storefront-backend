import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User";
import config from "../config";
import { AppError } from "./../utils/appError";
import UserTypes from "./../types/user.types";

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

   login = async (req: Request, res: Response, next: NextFunction) => {
      try {
         let { email, password } = req.body;
         let user = await User.login(email, password);

         // Check user exits
         if (!user) return next(new AppError("Invalid credentials", 401));

         // check password is correct
         if (!(await bcrypt.compare(password, user.password)))
            return next(new AppError("Invalid credentials", 401));

         this.createSendToken(user, 200, res);
      } catch (err) {
         return res.status(500).json({
            message: `unable to login: ${(err as Error).message}`,
         });
      }
   };

   getOne = async (req: Request, res: Response, next: NextFunction) => {
      try {
         let user = await User.getOne(req.params.id);

         if (!user) return next(new AppError("User not found", 404));

         let { password, ...userData } = user;

         return res.status(200).json({
            status: "success",
            data: userData,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to get user: ${(err as Error).message}`,
         });
      }
   };

   getAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
         let users = await User.getAll();

         if (!users) return next(new AppError("No users found", 404));

         return res.status(200).json({
            status: "success",
            data: users,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to get users: ${(err as Error).message}`,
         });
      }
   };

   update = async (req: Request, res: Response, next: NextFunction) => {
      try {
         let user = await User.update(req.params.id, req.body);

         if (!user) return next(new AppError("User not found", 404));

         let { password, ...userData } = user;

         return res.status(200).json({
            status: "success",
            data: userData,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to update: ${(err as Error).message}`,
         });
      }
   };

   private createSendToken = (
      user: UserTypes,
      statusCode: number,
      res: Response
   ) => {
      const token: string = this.signToken(user.id || "");

      let { password: _, ...userData } = user;

      return res.status(statusCode).json({
         status: "success",
         token,
         user: userData,
      });
   };

   private signToken = (id: string) => {
      const dates = config.jwtExpiresIn;
      const jwtSecret: string = config.jwtSecret ?? "";

      return jwt.sign(
         {
            id: id,
         },
         jwtSecret,
         {
            expiresIn: dates,
         }
      );
   };
}

export default UserController;
