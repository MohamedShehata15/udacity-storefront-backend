/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE enum_status AS ENUM('active', 'completed');

CREATE TABLE orders (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_id UUID NOT NULL,
   status enum_status DEFAULT 'active',
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
);