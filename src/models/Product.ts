import db from "../database";
import ProductTypes from "./../types/product.types";

class Product {
   // Create Product
   public static async create(
      product: ProductTypes,
      user_id: string
   ): Promise<ProductTypes> {
      try {
         const connection = await db.connect();
         const sql = `INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;

         console.log(sql);

         const { name, description, price } = product;
         const result = await connection.query(sql, [
            name,
            description,
            price,
            user_id,
         ]);

         connection.release();

         return result.rows[0];
      } catch (err) {
         console.log(err);
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }

   // Get Product
   // Get All Products
}

export default Product;
