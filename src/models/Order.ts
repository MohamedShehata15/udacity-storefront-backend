import db from "../database";
import OrderTypes from "./../types/order.types";

class Order {
   // Create Order
   public static async create(user_id: string): Promise<OrderTypes> {
      try {
         const connection = await db.connect();
         const sql = `INSERT INTO orders (user_id) VALUES ($1) RETURNING *`;

         const result = await connection.query(sql, [user_id]);

         connection.release();

         return result.rows[0];
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }

   // Get User Order
   public static async getUserOrder(user_id: string, order_id: string) {
      try {
         const connection = await db.connect();
         const sql = `SELECT * FROM orders WHERE user_id = $1 AND id = $2`;
         const result = await connection.query(sql, [user_id, order_id]);
         connection.release();
         return result.rows[0];
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }

   // Get User Orders
   public static async getUserOrders(user_id: string): Promise<OrderTypes[]> {
      try {
         const connection = await db.connect();
         const sql = `SELECT * FROM orders WHERE user_id = $1`;
         const result = await connection.query(sql, [user_id]);
         connection.release();
         return result.rows;
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }
}

export default Order;
