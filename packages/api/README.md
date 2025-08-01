# Personal Library API

This is the backend API for the Personal Library application -work in progress-. It's a Node.js server built with Express and TypeScript, responsible for managing users, books, authors, genres, publishers, and the book loaning system. It uses a PostgreSQL database via the Prisma ORM and secures endpoints using JWT for authentication.

## ✨ Features

- Secure user registration and login.
- JWT-based authentication for protected routes.
- Full CRUD (Create, Read, Update, Delete) functionality for:
  - Books
  - Authors
  - Genres
  - Publishers
- System for loaning and returning books between users.
- Request data validation using Zod schemas.
- Comprehensive test suite using Jest and Supertest.

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod
- **Testing**: Jest, Supertest
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm
- A running PostgreSQL instance

### Installation & Setup

1.  **Clone the repository** and navigate to the API package:
    ```bash
    git clone <repository-url>
    cd personal-library/packages/api
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the `packages/api` directory by copying the example below. Replace the placeholder values with your actual database configuration.

    ```env
    # .env

    # Connection URL for your PostgreSQL database
    # Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    DATABASE_URL="postgresql://postgres:password@localhost:5432/personal_library"

    # Secret key for signing JWTs. Use a long, random, and secure string.
    JWT_SECRET="your-super-secret-jwt-key"

    # Port for the API server
    PORT=3003
    ```

4.  **Run database migrations**:
    This command will create the necessary tables in your database based on the Prisma schema.
    ```bash
    pnpm prisma migrate dev
    ```

5.  **Start the development server**:
    ```bash
    pnpm dev
    ```
    The server will start on `http://localhost:3003` (or the port you specified) with hot-reloading.

## 🧪 Running Tests

The project includes a full suite of integration tests. To run them, you'll first need a separate test database.

1.  Create a `.env.test` file in `packages/api` and point `DATABASE_URL` to your test database.

    ```env
    # .env.test
    DATABASE_URL="postgresql://postgres:password@localhost:5432/personal_library_test"
    JWT_SECRET="a-different-secret-for-testing"
    ```

2.  Apply the schema to your test database:
    ```bash
    pnpm prisma:test:push
    ```

3.  Run the tests:
    ```bash
    pnpm test
    ```

## 📜 Available Scripts

- `pnpm dev`: Starts the server in development mode with hot-reloading using `nodemon`.
- `pnpm build`: Generates the Prisma client and compiles the TypeScript code to JavaScript in the `dist/` directory.
- `pnpm start`: Starts the production server from the compiled code in `dist/`.
- `pnpm test`: Runs all Jest tests.
- `pnpm prisma:test:migrate`: Runs migrations on the test database.
- `pnpm prisma:test:push`: Pushes the Prisma schema to the test database (useful for quick setup).
- `pnpm prisma:test:reset`: Resets the test database.

## 🔌 API Endpoints

All endpoints are prefixed with `/api`. Routes under `/books`, `/authors`, `/genres`, `/publishers`, and `/loans` require a `Bearer` token in the `Authorization` header.

### Authentication (`/auth`)

- `POST /auth/register`: Register a new user.
  - **Body**: `{ "email": "user@example.com", "password": "yourpassword", "name": "User Name" }`
- `POST /auth/login`: Log in an existing user.
  - **Body**: `{ "email": "user@example.com", "password": "yourpassword" }`
  - **Response**: `{ "token": "...", "user": { ... } }`

### Books (`/books`)

- `POST /`: Create a new book.
- `GET /`: Get all books owned by the authenticated user.
- `GET /:id`: Get a specific book by its ID.
- `PUT /:id`: Update a book by its ID.
- `DELETE /:id`: Delete a book by its ID.
- `POST /:bookId/loan`: Loan a book to another user.
  - **Body**: `{ "borrowerId": "..." }`
- `POST /:bookId/return`: Mark a loaned book as returned.

### Authors (`/authors`)

- `POST /`: Create a new author.
- `GET /`: Get all authors.
- `GET /:id`: Get a specific author by ID.
- `PUT /:id`: Update an author by ID.
- `DELETE /:id`: Delete an author by ID.

### Genres (`/genres`)

- `POST /`: Create a new genre.
- `GET /`: Get all genres.
- `GET /:id`: Get a specific genre by ID.
- `PUT /:id`: Update a genre by ID.
- `DELETE /:id`: Delete a genre by ID.

### Publishers (`/publishers`)

- `POST /`: Create a new publisher.
- `GET /`: Get all publishers.
- `GET /:id`: Get a specific publisher by ID.
- `PUT /:id`: Update a publisher by ID.
- `DELETE /:id`: Delete a publisher by ID.

### Loans (`/loans`)

- `GET /lent`: Get all books the authenticated user has lent out.
- `GET /borrowed`: Get all books the authenticated user has borrowed.
- `GET /lent/history`: Get the history of all books the authenticated user has lent out.