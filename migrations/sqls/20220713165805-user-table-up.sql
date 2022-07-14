/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);