import { Response, NextFunction } from "express";

import { UserRequest } from "../types/userRequest.types";
import Order from "../models/Order";

class OrderController {
   create = async (req: UserRequest, res: Response, next: NextFunction) => {
      try {
         let order = await Order.create(req.body, req.user?.id || "");

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
}

export default OrderController;
