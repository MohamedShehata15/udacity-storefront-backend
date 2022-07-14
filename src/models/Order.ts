import db from "../database";
import OrderTypes from "./../types/order.types";

class Order {
   // Create Order
   public static async create(
      order: OrderTypes,
      user_id: string
   ): Promise<OrderTypes> {
      try {
         const connection = await db.connect();
         const sql = `INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;

         const { product_id, quantity } = order;
         const result = await connection.query(sql, [
            user_id,
            product_id,
            quantity,
         ]);

         connection.release();

         return result.rows[0];
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }

   // Get User Orders
}

export default Order;
