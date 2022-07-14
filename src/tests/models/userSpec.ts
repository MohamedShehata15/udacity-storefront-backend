import User from "../../models/User";
import UserTypes from "./../../types/user.types";

describe("User Model", () => {
   const user = new User();
   it("should be defined", () => {
      expect(user).toBeDefined();
   });
   describe("Test methods exist", () => {
      it("should have a signup method", () => {
         expect(User.signup).toBeDefined();
      });

      it("should have a login method", () => {
         expect(User.login).toBeDefined();
      });

      it("should have a getOne method", () => {
         expect(User.getOne).toBeDefined();
      });

      it("should have a getAll method", () => {
         expect(User.getAll).toBeDefined();
      });

      it("should have an update method", () => {
         expect(User.update).toBeDefined();
      });
   });

   describe("Test User Model Logic", () => {
      let loggedUser: UserTypes;

      it("signup method should add a user", async () => {
         const user = await User.signup({
            first_name: "John",
            last_name: "Doe",
            email: "john@mail.com",
            password: "password",
         });

         loggedUser = user;

         expect(user).toEqual({
            id: user.id,
            first_name: "John",
            last_name: "Doe",
            email: "john@mail.com",
            password: user.password,
         });
      });

      it("login method and should return a user", async () => {
         let email = "john@mail.com";
         const user = await User.login(email);

         expect(user).toEqual({
            id: user.id,
            first_name: "John",
            last_name: "Doe",
            email,
            password: user.password,
         });
      });

      it("getAll method to return all users", async () => {
         const user = await User.getAll();

         expect(user.length).toBeGreaterThan(0);
      });

      it("update method to update a user", async () => {
         const user = await User.update(loggedUser?.id || "", {
            first_name: "John Edit",
         } as UserTypes);

         expect(user.first_name).toEqual("John Edit");
      });
   });
});
