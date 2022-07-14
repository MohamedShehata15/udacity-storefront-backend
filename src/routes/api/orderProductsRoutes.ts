import { Router, IRouter } from "express";
import OrderProductsController from "./../../controllers/orderProductsController";
import AuthMiddleware from "./../../middleware/AuthMiddleware";

const orderProducts = new OrderProductsController();

const orderProductsRoutes: IRouter = Router();

orderProductsRoutes.use(new AuthMiddleware().auth);

orderProductsRoutes.post("/", orderProducts.create);

orderProductsRoutes.get("/:order_id", orderProducts.getOrderProducts);

export default orderProductsRoutes;
