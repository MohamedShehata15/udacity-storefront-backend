import dotenv from "dotenv";

dotenv.config();

const {
   PORT,
   ENV,
   POSTGRES_HOST,
   POSTGRES_PORT,
   POSTGRES_DB,
   POSTGRES_DB_TEST,
   POSTGRES_USER,
   POSTGRES_PASSWORD,
   JWT_SECRET,
   JWT_EXPIRES_IN,
} = process.env;

export default {
   port: PORT,
   host: POSTGRES_HOST,
   dbPort: POSTGRES_PORT,
   database: ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
   user: POSTGRES_USER,
   password: POSTGRES_PASSWORD,
   jwtSecret: JWT_SECRET,
   jwtExpiresIn: JWT_EXPIRES_IN,
};
