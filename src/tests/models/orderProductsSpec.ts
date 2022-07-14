import OrderProduct from "../../models/OrderProducts";
import Product from "./../../models/Product";
import ProductTypes from "./../../types/product.types";
import User from "./../../models/User";
import Order from "./../../models/Order";

describe("OrderProduct Model", () => {
   it("should be defined", () => {
      const orderProduct = new OrderProduct();
      expect(orderProduct).toBeDefined();
   });

   describe("Test Methods exist", () => {
      it("should have a create method", () => {
         expect(OrderProduct.create).toBeDefined();
      });
      it("should have a getOrderProducts method", () => {
         expect(OrderProduct.getOrderProducts).toBeDefined();
      });
   });

   describe("Test OrderProduct Logic", () => {
      let userId: string;
      let productId: string;
      let orderId: string;

      beforeAll(async () => {
         let user = await User.signup({
            first_name: "test_order",
            last_name: "order_product",
            email: "order_product@mail.com",
            password: "12345",
         });

         let product = await Product.create(
            {
               name: "Product 2",
               description: "Product 2 description",
               price: 100,
            } as ProductTypes,
            user.id || ""
         );

         let order = await Order.create(user.id || "");

         userId = user.id || "";
         productId = product.id || "";
         orderId = order.id || "";
      });

      it("create method should add an order product", async () => {
         const orderProduct = await OrderProduct.create(orderId, productId, 1);

         expect(orderProduct.product_id).toEqual(productId);
         expect(orderProduct.quantity).toEqual(1);
      });

      it("getOrderProducts should return all order's products", async () => {
         const orderProducts = await OrderProduct.getOrderProducts(orderId);

         expect(orderProducts.length).toBeGreaterThan(0);
      });
   });
});
