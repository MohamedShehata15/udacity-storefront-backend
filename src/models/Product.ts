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
   public static async getOne(id: string): Promise<ProductTypes> {
      try {
         const connection = await db.connect();
         const sql = `SELECT * FROM products WHERE id = $1`;

         const result = await connection.query(sql, [id]);

         connection.release();

         return result.rows[0];
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }

   // Get All Products
   public static async getAll(): Promise<ProductTypes[]> {
      try {
         const connection = await db.connect();
         const sql = `SELECT * FROM products`;

         const result = await connection.query(sql);

         connection.release();

         return result.rows;
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }
}

export default Product;
