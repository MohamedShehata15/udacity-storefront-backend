import { Response, NextFunction } from "express";

import { UserRequest } from "../types/userRequest.types";
import Order from "../models/Order";
import { AppError } from "./../utils/appError";

class OrderController {
   create = async (req: UserRequest, res: Response, next: NextFunction) => {
      try {
         let order = await Order.create(req.user?.id || "");

         return res.status(201).json({
            status: "success",
            order,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to create: ${(err as Error).message}`,
         });
      }
   };

   getAll = async (req: UserRequest, res: Response, next: NextFunction) => {
      try {
         let orders = await Order.getUserOrders(req.user?.id || "");
         if (!orders) return next(new AppError("No orders found", 404));

         return res.status(200).json({
            status: "success",
            orders,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to get orders: ${(err as Error).message}`,
         });
      }
   };
}

export default OrderController;
