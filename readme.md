# Wide Test Service

This project is a REST API built using Node.js for a simple mobile order placement system. It provides endpoints for Product Listing and Order Cart use cases.

## Initial Setup

Before running the service, ensure you have Docker and Docker Compose installed on your system.

### Environment Configuration

1.  **Duplicate Environment File:** Copy the `env.example` file and rename it to `.env`.
    ```bash
    cp env.example .env
    ```
2.  **Configure Variables:** Open the `.env` file and adjust the values of the variables inside according to your system configuration. Pay attention to the database configuration, ports, and other important variables.

## Running the Service with Docker Compose

To run the service, use the following command:

```bash
docker compose up --build
```

### Database Migration

After the service is running, you need to perform a database migration to create the necessary tables.

1.  **Enter the Container:** Access the shell inside the wide-test-service container using the following command:

    ```bash
    docker exec -it wide-test-service sh
    ```

2.  **Run the Migration:** Inside the container shell, run the following command to execute the migration:
    ```bash
    npm run migration
    ```


## API Endpoints

Below is a list of available API endpoints for the Wide Test Service:

### Categories
| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/categories`           | Retrieve a list of all categories    |
| POST   | `/categories`           | Create a new category                |
| PUT    | `/categories/:id`       | Update a category by ID              |
| DELETE | `/categories/:id`       | Delete a category by ID              |
| GET    | `/categories/:id`       | Retrieve a category by ID            |

### Products
| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/products`             | Retrieve a list of all products      |
| POST   | `/products`             | Create a new product                 |
| PUT    | `/products/:id`         | Update a product by ID               |
| DELETE | `/products/:id`         | Delete a product by ID               |
| GET    | `/products/:id`         | Retrieve a product by ID             |

### Cart
| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| POST   | `/cart`                 | Add an item to the cart              |
| GET    | `/cart`                 | Retrieve all items in the cart       |
| DELETE | `/cart/:id`             | Delete an item from the cart by ID   |

### Orders
| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| POST   | `/orders`               | Create a new order                   |