/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users(
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL
);