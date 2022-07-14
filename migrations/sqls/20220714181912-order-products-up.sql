/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   order_id UUID NOT NULL,
   product_id UUID NOT NULL,
   quantity INTEGER NOT NULL,
   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);