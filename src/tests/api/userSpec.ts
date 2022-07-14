import supertest from "supertest";

import app from "../../server";
import User from "./../../models/User";
import UserTypes from "./../../types/user.types";

const request = supertest(app);

let token = "";

describe("User API Endpoints", () => {
   let loggedUser: UserTypes;
   beforeAll(async () => {
      const response = await User.signup({
         first_name: "user",
         last_name: "test",
         email: "user@mail.com",
         password: "user",
      } as UserTypes);
   });

   it("should be able to login and get token", async () => {
      const response = await request.post("/users/login").send({
         email: "user@mail.com",
         password: "user",
      });

      expect(response.status).toBe(200);
      token = response.body.token;
      loggedUser = response.body.user;
   });

   it("should be able to get a user", async () => {
      const response = await request.get(`/users/${loggedUser.id}`).set({
         Authorization: `Bearer ${token}`,
      });

      expect(response.status).toBe(200);
   });

   it("should be able to get all users", async () => {
      const response = await request.get("/users").set({
         Authorization: `Bearer ${token}`,
      });

      expect(response.status).toBe(200);
   });
});
