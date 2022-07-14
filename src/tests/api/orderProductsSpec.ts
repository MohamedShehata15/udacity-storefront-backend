import supertest from "supertest";

import app from "../../server";
import UserTypes from "./../../types/user.types";
import ProductTypes from "./../../types/product.types";

const request = supertest(app);

describe("Order API Endpoints", () => {
   let userId: string;
   let token: string;
   let productId: String;
   let orderId: string;

   beforeAll(async () => {
      const response = await request.post("/users/signup").send({
         first_name: "order",
         last_name: "user",
         email: "order_products@mail.com",
         password: "orderUser",
      });

      token = response.body.token;
      userId = response.body.data.id;

      const product = await request
         .post("/products")
         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({
            name: "product",
            price: 10,
            description: "product description",
         });

      const order = await request
         .post("/orders")
         .set({ Authorization: `Bearer ${token}` })
         .send({});

      productId = product.body.product.id;
      orderId = order.body.order.id;
   });

   it("should be able to create a new order", async () => {
      const response = await request
         .post("/order-products")
         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({
            order_id: orderId,
            product_id: productId,
            quantity: 1,
         });

      expect(response.status).toBe(201);
   });

   it("should be able to get all order products", async () => {
      const response = await request.get(`/order-products/${orderId}`).set({
         Authorization: `Bearer ${token}`,
      });

      expect(response.status).toBe(200);
   });
});
