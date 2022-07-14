import Product from "../../models/Product";
import ProductTypes from "./../../types/product.types";
import User from "./../../models/User";
import UserTypes from "./../../types/user.types";

describe("Product Model", () => {
   it("should be defined", () => {
      const product = new Product();
      expect(product).toBeDefined();
   });

   describe("Test Methods exist", () => {
      it("should have a create method", () => {
         expect(Product.create).toBeDefined();
      });
      it("should have a getOne method", () => {
         expect(Product.getOne).toBeDefined();
      });
      it("should have a getAll method", () => {
         expect(Product.getAll()).toBeDefined();
      });
   });

   describe("Test Product Model Logic", () => {
      let loggedUser: UserTypes;
      let productId: string;

      beforeAll(async () => {
         let user = await User.signup({
            first_name: "test",
            last_name: "test",
            email: "test@test.com",
            password: "test",
         });
         loggedUser = user;
      });

      it("create method should add a product", async () => {
         const product = await Product.create(
            {
               name: "Product 1",
               description: "Product 1 description",
               price: 100,
            } as ProductTypes,
            loggedUser.id || ""
         );

         productId = product.id || "";

         expect(product.name).toEqual("Product 1");
      });
      it("getOne Method should return a product", async () => {
         const product = await Product.getOne(productId);

         expect(product.name).toEqual("Product 1");
      });

      it("getAll Method should return all products", async () => {
         const products = await Product.getAll();

         expect(products.length).toBeGreaterThan(0);
      });
   });
});
