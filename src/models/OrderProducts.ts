import db from "../database";

class OrderProduct {
   // Create Order Product
   public static async create(
      order_id: string,
      product_id: string,
      quantity: number
   ) {
      try {
         const connection = await db.connect();
         const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;

         const result = await connection.query(sql, [
            order_id,
            product_id,
            quantity,
         ]);

         connection.release();

         return result.rows[0];
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }

   // Get Order Products
   public static async getOrderProducts(order_id: string) {
      try {
         const connection = await db.connect();
         const sql = `SELECT * FROM order_products, products WHERE product_id = products.id AND order_id = $1`;
         const result = await connection.query(sql, [order_id]);
         connection.release();
         return result.rows;
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }
}

export default OrderProduct;
