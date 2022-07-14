import { Router, IRouter } from "express";

import userRoutes from "./api/userRoutes";
import productRoutes from "./api/productRoutes";
import orderRoutes from "./api/orderRoutes";
import orderProductsRoutes from "./api/orderProductsRoutes";

const routes: IRouter = Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/orders", orderRoutes);
routes.use("/order-products", orderProductsRoutes);

export default routes;
