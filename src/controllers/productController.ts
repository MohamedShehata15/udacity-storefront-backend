import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
import ProductTypes from "../types/product.types";
import { UserRequest } from "../types/userRequest.types";

class ProductController {
   create = async (
      req: UserRequest,
      res: Response,
      next: NextFunction
   ): Promise<Response> => {
      try {
         let product = await Product.create(req.body, req.user?.id || "");

         return res.status(201).json({
            status: "success",
            product,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to create: ${(err as Error).message}`,
         });
      }
   };
}

export default ProductController;
