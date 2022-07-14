import Order from "../../models/Order";
import User from "../../models/User";
import Product from "../../models/Product";
import ProductTypes from "../../types/product.types";
import OrderTypes from "../../types/order.types";

describe("Order MOdel", () => {
   it("should be defined", () => {
      const order = new Order();
      expect(order).toBeDefined();
   });

   describe("Test Methods exist", () => {
      it("should have a create method", () => {
         expect(Order.create).toBeDefined();
      });
      it("should have a getUserOrders method", () => {
         expect(Order.getUserOrders).toBeDefined();
      });
   });

   describe("Test Order Logic", () => {
      let userId: string;
      let productId: string;

      beforeAll(async () => {
         let user = await User.signup({
            first_name: "test",
            last_name: "test",
            email: "test2@mail.com",
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

         userId = user.id || "";
         productId = product.id || "";
      });

      it("create method should add an order", async () => {
         const order = await Order.create(
            {
               product_id: productId,
               quantity: 1,
            } as OrderTypes,
            userId
         );

         expect(order.product_id).toEqual(productId);
      });

      it("getUserOrders should return all user's orders", async () => {
         const orders = await Order.getUserOrders(userId);

         expect(orders.length).toEqual(1);
      });
   });
});
