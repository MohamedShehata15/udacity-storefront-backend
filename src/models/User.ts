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
   public static async login(
      email: string,
      password: string
   ): Promise<UserTypes> {
      try {
         const connection = await db.connect();
         const sql = `SELECT * FROM users WHERE email = $1`;

         const result = await connection.query(sql, [email]);

         connection.release();

         return result.rows[0];
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }

   // Get User
   public static async getOne(id: string): Promise<UserTypes> {
      try {
         const connection = await db.connect();
         const sql = `SELECT * FROM users WHERE id = $1`;

         const result = await connection.query(sql, [id]);

         connection.release();

         return result.rows[0];
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }

   // Get All Users
   public static async getAll(): Promise<UserTypes[]> {
      try {
         const connection = await db.connect();
         const sql = `SELECT first_name, last_name, email FROM users`;

         const result = await connection.query(sql);

         connection.release();

         return result.rows;
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }

   // Update User
   public static async update(id: string, user: UserTypes): Promise<UserTypes> {
      try {
         const connection = await db.connect();
         let str = "";
         Object.entries(user).forEach(([key, value], index) => {
            if (index === 0) {
               str += `${key} = '${value}'`;
            } else {
               if (typeof value === "string") {
                  value = value.replace("'", '"');
                  value = `'${value}'`;
               }

               str += `, ${key} = ${value}`;
            }
         });

         const sql = `update users set ${str} where user_id = '${id}'  RETURNING *`;

         const result = await connection.query(sql);

         connection.release();

         return result.rows[0];
      } catch (err) {
         throw new Error(`Something went wrong: ${(err as Error).message}`);
      }
   }
}

export default User;
