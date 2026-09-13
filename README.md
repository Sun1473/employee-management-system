# Employee Management System (Full Stack CRUD App)

# Employee Management System

> **Live Demo:** [Click here to view live application](https://your-app-name.vercel.app)  
> **Backend API:** https://employee-management-backend-1cyi.onrender.com

A full-stack web application to manage employee records — built with **Spring Boot** (Java) on the backend, **React** on the frontend, and **MySQL** as the database. Supports full CRUD operations (Create, Read, Update, Delete), search, and filtering by department.

## Tech Stack

**Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate, MySQL, Maven, Lombok, Bean Validation
**Frontend:** React 18, Axios, CSS

## Features

- Add, view, update, and delete employee records
- Search employees by name
- Filter employees by department
- Server-side validation (required fields, email format, positive salary) with clean error messages
- Global exception handling (custom 404s instead of raw stack traces)
- REST API following standard HTTP verb conventions

## Project Structure

```
employee-management-system/
├── backend/                     # Spring Boot REST API
│   ├── src/main/java/com/ems/employeemanagement/
│   │   ├── controller/           # REST endpoints
│   │   ├── service/               # Business logic
│   │   ├── repository/            # Data access (Spring Data JPA)
│   │   ├── entity/                 # JPA entities
│   │   └── exception/            # Custom exceptions + global handler
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                    # React app
│   ├── src/
│   │   ├── components/           # EmployeeForm, EmployeeList
│   │   ├── services/               # Axios API calls
│   │   └── App.js
│   └── package.json
└── README.md
```

## How to Run Locally

### 1. Backend (Spring Boot)

Prerequisites: Java 17+, Maven, MySQL running locally.

```bash
cd backend

# Create the database (or let the app auto-create it, see application.properties)
# Update src/main/resources/application.properties with your MySQL username/password

mvn spring-boot:run
```
The API will start at `http://localhost:8080`.

> No MySQL installed? Run with the H2 in-memory profile instead:
> `mvn spring-boot:run -Dspring-boot.run.profiles=h2`

### 2. Frontend (React)

Prerequisites: Node.js 18+

```bash
cd frontend
npm install
npm start
```
The app will open at `http://localhost:3000` and talk to the backend at `http://localhost:8080`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by id |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/{id}` | Update an employee |
| DELETE | `/api/employees/{id}` | Delete an employee |
| GET | `/api/employees/department/{dept}` | Get employees by department |
| GET | `/api/employees/search?name=xyz` | Search employees by name |

## Possible Future Improvements

- Add authentication (Spring Security + JWT)
- Add pagination and sorting on the employee list
- Add a department management module
- Dockerize the app for easier deployment
- Add file upload for employee profile pictures

## Running Tests

```bash
cd backend
mvn test
```
 