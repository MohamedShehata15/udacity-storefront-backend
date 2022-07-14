import { Router, IRouter } from "express";

import userRoutes from "./api/userRoutes";
import productRoutes from "./api/productRoutes";
import orderRoutes from "./api/orderRoutes";

const routes: IRouter = Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/orders", orderRoutes);

export default routes;
