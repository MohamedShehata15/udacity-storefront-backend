# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-  Index
-  Show
-  Create [token required]
-  [OPTIONAL] Top 5 most popular products
-  [OPTIONAL] Products by category (args: product category)

#### Users

-  Index [token required]
-  Show [token required]
-  Create N[token required]

#### Orders

-  Current Order by user (args: user id)[token required]
-  [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

-  id
-  name
-  price
-  [OPTIONAL] category

#### User

-  id
-  firstName
-  lastName
-  password

#### Orders

-  id
-  id of each product in the order
-  quantity of each product in the order
-  user_id
-  status of order (active or complete)

## Data Shapes

### users

| Column     | Type         | constraints |
| ---------- | ------------ | ----------- |
| id         | uuid         | Primary Key |
| first_name | varchar(50)  | NOT NULL    |
| last_name  | varchar(50)  | NOT NULL    |
| email      | varchar(50)  | UNIQUE      |
| password   | varchar(255) | NOT NULL    |

### products

| Column      | Type          | Constraints |
| ----------- | ------------- | ----------- |
| id          | uuid          | Primary Key |
| name        | varchar(50)   | NOT NULL    |
| description | varchar(255)  |             |
| price       | decimal(10,2) | NOT NULL    |
| user_id     | uuid          | Foreign-Key |

### orders

| Column  | Type                        | Constraints |
| ------- | --------------------------- | ----------- |
| id      | uuid                        | Primary Key |
| user_id | uuid                        | Foreign-Key |
| status  | ENUM('active', 'completed') |             |

### order_products

| Column     | Type    | Constraints |
| ---------- | ------- | ----------- |
| id         | uuid    | Primary Key |
| order_id   | uuid    | Foreign-Key |
| product_id | uuid    | Foreign-Key |
| quantity   | integer | NOT NULL    |

## API Endpoints (Routes)

### User

-  **Create User** <br>
   <span style="background: #27ae60; padding: 2px 8px; border-radius: 5px">POST</span> /users/signup
-  **Login** <br>
   <span style="background: #27ae60; padding: 2px 8px; border-radius: 5px">POST</span> /users/login
-  **Get User** <br>
   <span style="background: #2980b9; padding: 2px 8px; border-radius: 5px">GET</span> /users/:id
-  **Get All Users** <br>
   <span style="background: #2980b9; padding: 2px 8px; border-radius: 5px">GET</span> /users/

### Product

-  **Create Product** <br>
   <span style="background: #27ae60; padding: 2px 8px; border-radius: 5px">POST</span> /products/
-  **Get Product** <br>
   <span style="background: #2980b9; padding: 2px 8px; border-radius: 5px">GET</span> /products/:id
-  **Get All Products** <br>
   <span style="background: #2980b9; padding: 2px 8px; border-radius: 5px">GET</span> /products/

### Order

-  **Create Order** <br>
   <span style="background: #27ae60; padding: 2px 8px; border-radius: 5px">POST</span> /orders/
-  **Get User Orders** <br>
   <span style="background: #2980b9; padding: 2px 8px; border-radius: 5px">GET</span> /orders/

### Order Products

-  **Create Order Product** <br>
   <span style="background: #27ae60; padding: 2px 8px; border-radius: 5px">POST</span> /order-products/
-  **Get Order Products** <br>
   <span style="background: #2980b9; padding: 2px 8px; border-radius: 5px">GET</span> /order-products/
