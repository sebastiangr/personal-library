# Personal Library

A full-stack application designed to help you manage your personal book collection. Catalog your books, track who you've loaned them to, and manage your library with a clean, modern interface.

This project is structured as a **pnpm monorepo**, containing the backend API, a web application, and a placeholder for a future mobile app.

---

## 🚀 Core Features

-   **Backend API**: A robust Node.js API to handle all data and business logic.
-   **Web Application**: A responsive and user-friendly SvelteKit frontend.
-   **Book Management**: Full CRUD functionality for your books, authors, genres, and publishers.
-   **Loan System**: Easily track books you've lent to friends and books you've borrowed.
-   **Secure Authentication**: JWT-based authentication to keep your library data safe.

---

## 📂 Monorepo Structure

The project is organized into two main directories:

-   `./packages`: Contains shared code and the main backend API.
    -   `packages/api`: The Node.js/Express backend API.
-   `./apps`: Contains the user-facing applications.
    -   `apps/web`: The SvelteKit web application.
    -   `apps/mobile`: A placeholder for the future Flutter mobile app.

---

## 🛠️ Tech Stack

-   **Monorepo Management**: `pnpm` workspaces
-   **Backend**: Node.js, Express.js, TypeScript
-   **Frontend (Web)**: SvelteKit, TypeScript, Tailwind CSS
-   **Frontend (Mobile)**: Flutter (Planned)
-   **Database**: PostgreSQL with Prisma ORM
-   **Authentication**: JSON Web Tokens (JWT)
-   **Testing**: Jest & Supertest for the API

---

## 🏁 Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   pnpm
-   A running PostgreSQL instance
-   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/<your-username>/personal-library.git
    cd personal-library
    ```

2.  **Install all dependencies from the root:**
    This command will install dependencies for all workspaces (`api`, `web`, etc.).
    ```bash
    pnpm install
    ```

3.  **Set up individual services:**
    Each application (`api`, `web`) has its own `README.md` with detailed setup instructions for environment variables and database configuration. Please follow them to get each service running.

    -   **Backend API Setup**
    -   **Web App Setup**

### Quick Start

1.  **Start the Backend API:**
    ```bash
    # In a new terminal, from the project root
    pnpm --filter api dev
    ```

2.  **Start the Web App:**
    ```bash
    # In another terminal, from the project root
    pnpm --filter web dev
    ```

The web application should now be running and connected to the local API.

---