import { Request, Response, NextFunction } from "express";
import OrderProduct from "../models/OrderProducts";
import { UserRequest } from "../types/userRequest.types";
import Order from "./../models/Order";
import { AppError } from "./../utils/appError";

class OrderProductsController {
   create = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<Response> => {
      try {
         const orderProducts = await OrderProduct.create(
            req.body.order_id,
            req.body.product_id,
            req.body.quantity
         );

         return res.status(201).json({
            status: "success",
            orderProducts,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to create: ${(err as Error).message}`,
         });
      }
   };

   // Get Order Products
   getOrderProducts = async (
      req: UserRequest,
      res: Response,
      next: NextFunction
   ) => {
      try {
         // check if order exists and if user is owner of order
         const order = await Order.getUserOrder(
            req.user?.id || "",
            req.params.order_id
         );

         if (!order) return next(new AppError("No order found", 404));

         const orderProducts = await OrderProduct.getOrderProducts(
            req.params.order_id
         );

         if (!orderProducts)
            return next(new AppError("No order products found", 404));

         return res.status(200).json({
            status: "success",
            orderProducts,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to get orders: ${(err as Error).message}`,
         });
      }
   };
}

export default OrderProductsController;
