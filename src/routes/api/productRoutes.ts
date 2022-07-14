import { Router, IRouter } from "express";
import ProductController from "./../../controllers/productController";
import AuthMiddleware from "./../../middleware/AuthMiddleware";

const productController = new ProductController();
const productRoutes: IRouter = Router();

productRoutes.use(new AuthMiddleware().auth);

productRoutes.route("/").post(productController.create);
productRoutes.route("/:id").get(productController.getOne);

export default productRoutes;
