# Storefront Backend Project

## Getting Started

### Create .env file

```sh
PORT=4000
ENV=dev # [dev or test]

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
POSTGRES_DB=storefront
POSTGRES_DB_TEST=storefront_test


JWT_SECRET=
JWT_EXPIRES_IN=190D
```

### Create database

```sh
psql -u YOUR_USERNAME -p YOUR_PASSWORD
CREATE DATABASE storefront;
```

### Run Migrations

```sh
npm run migrate:run
```

### Install packages

```bash
npm install
```

### Run server

```bash
npm run watch
```

### Run tests

```bash
npm run test
```

## Endpoint

### User

#### Signup

-  `/users/signup` <br>
-  Method: POST <br>
-  Body:

   ```json
   { "first_name": "", "last_name": "", "email": "", "password": "" }
   ```

-  Response:
   ```json
   {
      "status": "",
      "token": "",
      "data": { "id": "", "first_name": "", "last_name": "", "email": "" }
   }
   ```

#### Login

-  `/users/login` <br>
-  Method: POST <br>
-  Body:
   ```json
   { "email": "", "password": "" }
   ```
-  Response:

   ```json
   {
      "status": "",
      "token": "",
      "data": { "id": "", "first_name": "", "last_name": "", "email": "" }
   }
   ```

#### Get User

-  `/users/:id` <br>
-  Method: GET <br>
-  Header:

   ```json
   { "Authorization": "Bearer TOKEN" }
   ```

-  Response:

   ```json
   {
      "status": "",
      "data": { "id": "", "first_name": "", "last_name": "", "email": "" }
   }
   ```

#### Get All Users

-  `/users/` <br>
-  Method: GET <br>
-  Header:

   ```json
   { "Authorization": "Bearer TOKEN" }
   ```

-  Response:

   ```json
   {
      "status": "",
      "data": [{ "id": "", "first_name": "", "last_name": "", "email": "" }]
   }
   ```

### Product

#### Create Product

-  `/products/` <br>
-  Method: POST <br>
-  Header:

   ```json
   { "Authorization": "Bearer TOKEN" }
   ```

-  Body:
   ```json
   { "name": "", "description": "", "price": "" }
   ```
-  Response:

   ```json
   {
      "status": "",
      "product": { "id": "", "name": "", "description": "", "price": "" }
   }
   ```

#### Create Product

-  `/products/:id` <br>
-  Method: GET <br>
-  Header:

   ```json
   { "Authorization": "Bearer TOKEN" }
   ```

-  Response:
   ```json
   {
      "status": "",
      "product": { "id": "", "name": "", "description": "", "price": "" }
   }
   ```

#### Create All Products

-  `/products/` <br>
-  Method: GET <br>
-  Header:

   ```json
   { "Authorization": "Bearer TOKEN" }
   ```

-  Response:
   ```json
   {
      "status": "",
      "product": [{ "id": "", "name": "", "description": "", "price": "" }]
   }
   ```

### Order

#### Create Order

-  `/orders/` <br>
-  Method: POST <br>
-  Header:

   ```json
   { "Authorization": "Bearer TOKEN" }
   ```

-  Body:
   ```json
   {}
   ```
-  Response:

   ```json
   { "status": "", "product": { "id": "", "user_id": "", "status": "" } }
   ```

#### Get User Orders

-  `/orders/` <br>
-  Method: GET <br>
-  Header:

   ```json
   { "Authorization": "Bearer TOKEN" }
   ```

-  Response:

   ```json
   {
      "status": "",
      "product": {
         "id": "",
         "user_id": "",
         "status": ""
      }
   }
   ```

### Order Products

#### Create Order Product

-  `/order-products/` <br>
-  Method: POST <br>
-  Header:

   ```json
   { "Authorization": "Bearer TOKEN" }
   ```

-  Body:
   ```json
   { "order_id": "", "product_id": "", "quantity": "" }
   ```
-  Response:

   ```json
   {
      "status": "",
      "product": { "id": "", "product_id": "", "order_id": "", "quantity": "" }
   }
   ```

#### Get Order Products

-  `/order-products/:order_id` <br>
-  Method: GET <br>
-  Header:

   ```json
   { "Authorization": "Bearer TOKEN" }
   ```

   ```

   ```

-  Response:

   ```json
   {
      "status": "",
      "product": [
         {
            "id": "",
            "product_id": "",
            "order_id": "",
            "quantity": "",
            "name": "",
            "description": "",
            "price": ""
         }
      ]
   }
   ```
