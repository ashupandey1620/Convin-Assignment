Here's a `README.md` file that covers all the points you mentioned and provides detailed documentation for your project. 

```markdown
# Convin Assignment - Expense Tracking Backend

## Project Overview

This project, named **Convin Assignment**, is an expense tracking backend built with Express.js. It tracks expenses and splits them according to users in exact numbers, percentages, and equal partitions. The application creates a downloadable balance sheet in CSV and XLSX formats and provides all expense details to the admin. It features an admin panel, user authentication at every route, error handling, input validation, optimized performance for large datasets, and unit and integration testing. MongoDB is used as the database, and JWT is used for authentication.

## File Structure

```plaintext
src/
│
├── controllers/
│   ├── authController.ts
│   └── expenseController.ts
│
├── database/
│   └── index.ts
│
├── middleware/
│   └── authMiddleware.ts
│
├── models/
│   ├── expenseModel.ts
│   └── userModel.ts
│
├── routes/
│   ├── authRoutes.ts
│   └── expenseRoutes.ts
│   └── utils/
│       └── token.ts
│
├── config.ts
├── express.d.ts
├── index.ts
│
└── .env
└── .gitignore
└── package-lock.json
└── package.json
└── tsconfig.json
```

## Detailed Documentation

### Controllers

- **authController.ts**: Handles user authentication (login, signup, logout, etc.).
- **expenseController.ts**: Manages CRUD operations for expenses, including splitting logic and generating balance sheets.

### Database

- **index.ts**: Establishes the connection to the MongoDB database.

### Middleware

- **authMiddleware.ts**: Provides middleware functions for verifying JWT tokens and protecting routes.

### Models

- **expenseModel.ts**: Defines the schema for expenses, including fields for amount, description, date, and related user IDs.
- **userModel.ts**: Defines the schema for users, including fields for username, email, password, and role (admin/user).

### Routes

- **authRoutes.ts**: Contains routes for authentication (e.g., `/login`, `/signup`).
- **expenseRoutes.ts**: Contains routes for managing expenses (e.g., `/expenses`, `/split`).

### Utils

- **token.ts**: Utility functions for generating and verifying JWT tokens.

### Configuration Files

- **config.ts**: Configuration settings for the application (e.g., database URL, JWT secret).
- **express.d.ts**: Type definitions for Express.js.
- **index.ts**: Entry point for the application, setting up Express server and routes.

### Environment and Dependency Files

- **.env**: Environment variables for sensitive configuration (not included in version control).
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package-lock.json**: Lockfile for npm dependencies.
- **package.json**: Project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.

## Features

- **User Authentication**: Secure user authentication using JWT, with middleware to protect routes.
- **Expense Tracking**: CRUD operations for expenses, with advanced splitting logic based on exact numbers, percentages, and equal partitions.
- **Admin Panel**: Provides detailed expense information to the admin, including a downloadable balance sheet in CSV and XLSX formats.
- **Error Handling and Input Validation**: Comprehensive error handling and input validation to ensure data integrity.
- **Optimized Performance**: Designed to handle large datasets efficiently.
- **Testing**: Includes unit and integration tests to ensure code reliability and correctness.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ashupandey1620/convin-assignment.git
    cd convin-assignment
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application:
    ```bash
    npm start
    ```

## Testing

To run the tests, use the following command:
```bash
npm test
```

## Contact

For any questions or feedback, please contact [ashupandey1620@gmail.com](mailto:ashupandey1620@gmail.com).

GitHub: [ashupandey1620](https://github.com/ashupandey1620)
```

This `README.md` provides a comprehensive overview of your project, covering the file structure, features, installation instructions, and contact information.
