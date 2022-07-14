import { Router, IRouter } from "express";

import AuthMiddleware from "./../../middleware/AuthMiddleware";
import OrderController from "../../controllers/orderController";

const orderController = new OrderController();

const orderRoutes = Router();

orderRoutes.use(new AuthMiddleware().auth);

orderRoutes.route("/").post(orderController.create).get(orderController.getAll);

export default orderRoutes;
