import { Request, Response, NextFunction } from "express";

import Product from "../models/Product";
import ProductTypes from "../types/product.types";
import { UserRequest } from "../types/userRequest.types";
import { AppError } from "./../utils/appError";

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

   getOne = async (
      req: UserRequest,
      res: Response,
      next: NextFunction
   ): Promise<Response | void> => {
      try {
         let product = await Product.getOne(req.params.id);

         if (!product) return next(new AppError("Product not found", 404));

         return res.status(200).json({
            status: "success",
            product,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to get product: ${(err as Error).message}`,
         });
      }
   };

   getAll = async (
      req: UserRequest,
      res: Response,
      next: NextFunction
   ): Promise<Response | void> => {
      try {
         let products = await Product.getAll();
         if (!products) return next(new AppError("No products found", 404));

         return res.status(200).json({
            status: "success",
            products,
         });
      } catch (err) {
         return res.status(500).json({
            message: `unable to get products: ${(err as Error).message}`,
         });
      }
   };
}

export default ProductController;
