import { Router, IRouter } from "express";
import ProductController from "./../../controllers/productController";
import AuthMiddleware from "./../../middleware/AuthMiddleware";

const productController = new ProductController();
const productRoutes: IRouter = Router();

productRoutes
   .route("/")
   .post(new AuthMiddleware().auth, productController.create)
   .get(productController.getAll);
productRoutes.route("/:id").get(productController.getOne);

export default productRoutes;
