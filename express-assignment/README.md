# Express.js Assignment

A RESTful API built with Express.js that provides endpoints for users and products.

## Project Structure

```
express-assignment/
│-- routes/
│    ├── userRoutes.js
│    ├── productRoutes.js
│-- middleware/
│    ├── logger.js
│-- controllers/
│    ├── userController.js
│    ├── productController.js
│-- index.js
│-- package.json
│-- README.md
│-- .env
```

## Setup Instructions

1. **Clone the repository**

```sh
git clone <repository-url>
cd express-assignment
```

2. **Install dependencies**

```sh
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory with the following content:

```
PORT=3000
NODE_ENV=development
```

4. **Run the server**

```sh
node index.js
```

The server will start on the port specified in the `.env` file (default: 3000).

## API Endpoints

### Users

| Method | Endpoint       | Description        | Request Body                            | Query Parameters |
|--------|----------------|--------------------|----------------------------------------|------------------|
| GET    | /api/users     | Get all users      | -                                      | role             |
| GET    | /api/users/:id | Get user by ID     | -                                      | -                |
| POST   | /api/users     | Create a new user  | {name, email, role}                    | -                |
| PUT    | /api/users/:id | Update user by ID  | {name?, email?, role?}                 | -                |
| DELETE | /api/users/:id | Delete user by ID  | -                                      | -                |

### Products

| Method | Endpoint          | Description           | Request Body                         | Query Parameters  |
|--------|-------------------|-----------------------|--------------------------------------|-------------------|
| GET    | /api/products     | Get all products      | -                                    | category, inStock |
| GET    | /api/products/:id | Get product by ID     | -                                    | -                 |
| POST   | /api/products     | Create a new product  | {name, price, category?, inStock?}   | -                 |
| PUT    | /api/products/:id | Update product by ID  | {name?, price?, category?, inStock?} | -                 |
| DELETE | /api/products/:id | Delete product by ID  | -                                    | -                 |

## Examples

### Get all users

```
GET /api/users
```

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "admin"
  }
]
```

### Filter users by role

```
GET /api/users?role=admin
```

Response:
```json
[
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "admin"
  }
]
```

### Create a new product

```
POST /api/products
Content-Type: application/json

{
  "name": "Smartphone",
  "price": 699.99,
  "category": "electronics",
  "inStock": true
}
```

Response:
```json
{
  "id": 4,
  "name": "Smartphone",
  "price": 699.99,
  "category": "electronics",
  "inStock": true
}
```

## Testing with Postman or cURL

### Using cURL

Get all users:
```sh
curl -X GET http://localhost:3000/api/users
```

Create a new user:
```sh
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Brown","email":"alice@example.com","role":"user"}'
```

### Using Postman

1. Open Postman
2. Enter the URL (e.g., `http://localhost:3000/api/users`)
3. Select the HTTP method (GET, POST, PUT, DELETE)
4. For POST/PUT requests, go to the "Body" tab, select "raw" and "JSON"
5. Enter the request body as JSON
6. Click "Send" and view the response