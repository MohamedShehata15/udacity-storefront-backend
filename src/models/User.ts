import bcrypt from "bcrypt";

import db from "../database";
import UserTypes from "../types/user.types";
import config from "../config";

const hashPassword = async (password: string): Promise<string> => {
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};

class User {
   // Signup
   public static async signup(user: UserTypes): Promise<UserTypes> {
      try {
         // Open Connection
         const connection = await db.connect();
         const sql = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;

         // Run Query
         const { first_name, last_name, email, password } = user;
         const hashedPassword = await hashPassword(password);
         const result = await connection.query(sql, [
            first_name,
            last_name,
            email,
            hashedPassword,
         ]);

         // Close Connection
         connection.release();

         // return created user
         return result.rows[0];
      } catch (err) {
         throw new Error(
            `unable to create (${user.first_name}): ${(err as Error).message}`
         );
      }
   }

   // Login

   // Get User

   // Get All Users

   // Update User

   // Delete User
}

export default User;
