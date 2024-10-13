# Profile Management App

A simple profile management application built with React. This app allows users to manage their profiles easily and efficiently.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Download and install Node.js from the [official website](https://nodejs.org/). npm (Node Package Manager) is included with Node.js.

## Installation Instructions

Follow these steps to set up and run the application locally:

1. **Fork and Clone the Repository**

    First, fork the repository on GitHub, then clone it to your local machine using:

    ```bash
    git clone {repository-url}
    ```

    Replace {repository-url} with the URL of your forked repository.

2. **Navigate into the Project Directory:**

    ```bash
    cd profile-management-app
    ```

3. **Install Dependencies Install the required dependencies by running:**

    ```bash
    npm install
    ```

4. **Create Environment Files:**

    Create the following .env files in the root of the project:

    - .env
    - .env.production

5. **Set Environment Variables Inside each .env file:**
   Set the VITE_API_URL variable:

    - For .env (development):

        ```bash
        VITE_API_URL=http://localhost:3001
        ```

    - For .env.production (production):

        ```bash
        VITE_API_URL={your_production_api_url}
        ```

        Replace {your_production_api_url} with your actual production API URL.

6. **Running the Application:**

    To start the application, follow these steps:

    - Start the JSON Server. This command starts a mock data server using json-server:

        ```bash
        npm run start-json-server
        ```

    - Start the React Application. In a new terminal window, run the following command to start the React application:

        ```bash
        npm run dev
        ```

    Access the Application Open your web browser and navigate to http://localhost:5173 to view your application in action.
