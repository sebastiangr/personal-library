# Personal Library Web App

This is the frontend for the Personal Library application, built with SvelteKit and Tailwind CSS. It provides a user-friendly interface to interact with the backend API, allowing users to manage their personal book collection, loans, and more.

## Features

- **Authentication**: Secure user login and registration.
- **Dashboard**: A central hub to view your library at a glance.
- **Book Management**: Full CRUD (Create, Read, Update, Delete) for your books.
- **Library Organization**: Manage authors, genres, and publishers.
- **Loan System**: Track books you've lent to friends and books you've borrowed.
- **Responsive Design**: A clean and modern UI that works on all screen sizes, powered by Tailwind CSS.

##  Technologies Used

- **Framework**: SvelteKit
- **UI**: Svelte 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm
- A running instance of the Personal Library API.

### Installation & Setup

1.  **Navigate to the web app package** from the project root:
    ```bash
    cd apps/web
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the `apps/web` directory. You'll need to point it to your running backend API instance.

    ```env
    # .env

    # The full URL to the backend API
    PUBLIC_API_URL="http://localhost:3003/api"
    ```

4.  **Start the development server**:
    ```bash
    pnpm dev
    ```
    The app will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

- `pnpm dev`: Starts the development server with hot-reloading.
- `pnpm build`: Builds the app for production.
- `pnpm preview`: Runs a local server to preview the production build.
- `pnpm check`: Runs `svelte-check` to validate Svelte components and TypeScript code.
- `pnpm lint`: Lints the codebase using ESLint.
- `pnpm format`: Formats the code using Prettier.
