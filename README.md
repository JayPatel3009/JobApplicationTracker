# Job Application Tracker

A simple job application tracker built with ASP.NET Core Web API (backend) and Angular (frontend). This project allows users to add, update, view, and delete job applications they have submitted, tracking key details such as the company name, position, status, and the date applied.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Assumptions](#assumptions)
- [Contributing](#contributing)

## Features

- **Backend (ASP.NET Core Web API):**
  - RESTful API endpoints for CRUD operations:
    - `GET /applications` - Retrieve all job applications.
    - `GET /applications/{id}` - Retrieve a specific application.
    - `POST /applications` - Add a new application.
    - `PUT /applications/{id}` - Update an existing application.
    - `DELETE /applications/{id}` - Delete an existing application.
  - Entity Framework Core (Code First) with an in-memory database (or SQLite).
  - Repository Pattern & Dependency Injection for clean and modular code.
  - Asynchronous operations using `async/await`.
  - API error handling and input validation.
  - Input validation and error handling.
  - **Bonus:** Swagger UI for interactive API documentation.

- **Frontend (Angular):**
  - List all job applications in a user-friendly card table displaying:
    - Company Name
    - Position
    - Status
    - Date Applied
    - Actions (Edit & Delete)
  - Form to add new job applications.
  - Input form validation.
  - Dropdown menu to update the job application status (e.g., Applied, Interview, Offer, Rejected).
  - API communication via Angular's HttpClient.
  - **Bonus:** Dynamic pagination to efficiently browse through job applications.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [.NET 6 SDK (or later)](https://dotnet.microsoft.com/download)
- [Node.js (v14 or later)](https://nodejs.org/en/download/)
- [Angular CLI](https://angular.io/cli) (if running the Angular frontend)
- A modern web browser

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/JayPatel3009/JobApplicationTracker.git
    cd JobApplicationTracker
    ```

2. Install dependencies for both the backend and frontend:

    ```sh
    # Make sure you're in the backend directory(JobApplicationTracker) to restore dependencies and build the project
    dotnet restore
    dotnet build

    # Navigate to the frontend directory (ClientApp) and install dependencies
    cd ClientApp
    npm install
    ```

## Running the Backend

The backend is built using C# and .NET Core. Follow these steps to run the backend server:

1. Navigate to the backend directory (JobApplicationTracker):

    ```sh
    cd..
    ```

2. Run the backend server:

    ```sh
    dotnet run
    ```

3. The backend server should now be running at `http://localhost:5042`.

## Running the Frontend

The frontend is built using Angular Framework which uses TypeScript, HTML, and CSS. Follow these steps to run the frontend application:

1. Navigate to the frontend directory (ClientApp):

    ```sh
    cd ClientApp
    ```

2. Start the frontend application:

    ```sh
    ng serve
    ```

3. The frontend application should now be running at `http://localhost:4200`.

## Assumptions

- The backend and frontend will run on `localhost` with the backend on port `5042` and the frontend on port `4200`.
- The backend API endpoints are available at `http://localhost:5042/api`.
- The application assumes a modern web browser with JavaScript enabled.

## Notes

- **User Authentication:** This demo application does not implement user authentication. It is assumed that the tracker is used by a single user or within a trusted environment.
- **Database Choice:** The project is configured to use an in-memory database by default for ease of setup. You can switch to SQLite by updating the EF Core configuration if persistent storage is required.
- **API & UI Integration:** Ensure that CORS is properly configured in the backend if you run the frontend on a different domain or port.
- **Best Practices:** The code is structured following SOLID principles and DRY (Don't Repeat Yourself) practices to ensure maintainability and modularity.

## Implemented Bonuses

- ✅ Swagger UI Documentation (http://localhost:5042/swagger/index.html)
- ✅ Frontend Pagination
- ✅ Clean UI Styling

## Extra Features Implemented

- **Application Deletion:** Empower users with the ability to remove job applications seamlessly.
- **Toast Notifications:** Integrated a JavaScript-based notification system that delivers unobtrusive, real-time alerts.
- **Dynamic Dialog for Add & Update:** Intuitive dialog interfaces streamline the process of adding new applications and updating existing ones.
- **Deletion Confirmation Modal:** Added an extra safeguard by prompting users for confirmation before deleting any application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
