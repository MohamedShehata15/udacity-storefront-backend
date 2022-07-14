import supertest from "supertest";

import app from "../../server";
import user from "../../models/User";
import UserTypes from "../../types/user.types";
import ProductTypes from "./../../types/product.types";

const request = supertest(app);

describe("Order API Endpoints", () => {
   let loggedUser: UserTypes;
   let token: string = "";
   let productId: String;

   beforeAll(async () => {
      const response = await request.post("/users/signup").send({
         first_name: "order",
         last_name: "user",
         email: "order@mail.com",
         password: "orderUser",
      } as UserTypes);

      loggedUser = response.body.user;
      token = response.body.token;

      const response2 = await request
         .post("/products")
         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({
            name: "product",
            price: 10,
            description: "product description",
         } as ProductTypes);

      productId = response2.body.product.id;
   });

   it("should be able to create a new order", async () => {
      const response = await request
         .post("/orders")
         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({
            product_id: productId,
            quantity: 1,
         });

      expect(response.status).toBe(201);
   });

   it("should be able to get all user's orders", async () => {
      const response = await request.get("/orders").set({
         Authorization: `Bearer ${token}`,
      });

      expect(response.status).toBe(200);
   });
});
