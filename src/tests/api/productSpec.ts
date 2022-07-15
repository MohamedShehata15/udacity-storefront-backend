import supertest from "supertest";

import app from "../../server";
import User from "../../models/User";
import UserTypes from "../../types/user.types";

const request = supertest(app);

describe("Product API Endpoints", () => {
   let loggedUser: UserTypes;
   let token: string = "";
   let productId: string;
   beforeAll(async () => {
      const response = await request.post("/users/signup").send({
         first_name: "product",
         last_name: "user",
         email: "productuser@mail.com",
         password: "productUser",
      } as UserTypes);

      token = response.body.token;
      loggedUser = response.body.user;
   });

   it("should be able create a product", async () => {
      const response = await request
         .post("/products")
         .set({
            Authorization: `Bearer ${token}`,
         })
         .send({
            name: "product",
            price: 10,
            description: "product description",
         });

      productId = response.body.product.id;

      expect(response.status).toBe(201);
   });

   it("should be able to get a product", async () => {
      const response = await request.get(`/products/${productId}`);

      expect(response.status).toBe(200);
   });

   it("should be able to get all products", async () => {
      const response = await request.get("/products");

      expect(response.status).toBe(200);
   });
});
