# Contacts Management API
This project provides an API to manage user contacts, allowing authenticated users to add, update, retrieve, and delete contacts. It's designed to serve as a backend for applications needing contact management features, with security and data validation built in. The API is built with Next.js API routes and uses middleware for authentication, ensuring that each user only accesses their own data.

## Features
* User Authentication: Securely authenticate users with JSON Web Tokens (JWT).
* Contact Management: Add, update, delete, and retrieve user-specific contacts.
* Data Validation: Validate input to ensure clean and consistent data entries.
* RESTful API: Provides a structured, HTTP-based API for easy integration with front-end applications.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Running the Backend Server](#running-the-backend-server)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pavankumar2431/contact-management.git
   cd contact-management
2. **Environment Variables**:

  Create a .env.local file in the root of your project with the following variables:

    DATABASE_URL=your_database_connection_string
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

3. **Run Migrations (if using a SQL database)**:

   Run migrations to set up the database schema:
   ```bash
    npx sequelize-cli db:migrate
### Running the Server
#### Development Server
To start the server in development mode:

  
    npm run dev
    
### Production Server
To build and start the server in production mode:

    npm run build
    npm start
  
The server will be running at http://localhost:3000.

### Database Schema
Below is the basic schema for the project, showing the relationships and fields in the database:

**Users Table:**

* id: Primary Key
* name: String
* email: String (Unique)
* password: String (hashed)

**Contacts Table:**

* id: Primary Key
* userid: Foreign Key referencing Users table
* name: String
* email: String
* phone: String
* address: String
* timezone: String


# Contacts API Documentation
This documentation provides an overview of the Contacts API endpoints. Each endpoint description includes the URL, HTTP method, request parameters, and response examples.

1. **Authentication**
All endpoints require authentication using a JSON Web Token (JWT) in the headers:

Header: Authorization: Bearer <JWT_TOKEN>
Endpoints
1. **Add Contact(s) - POST /api/contacts**
Adds one or multiple contacts to the database for the authenticated user.

URL: /api/contacts

Method: POST

Headers: Authorization: Bearer <token>

Body (JSON):

    "{
      "contacts": [
        {
          "name": "John Doe",
          "email": "johndoe@example.com",
          "phone": "1234567890",
          "address": "123 Street, City",
          "timezone": "PST"
        },
        {
          "name": "Jane Smith",
          "email": "janesmith@example.com",
          "phone": "0987654321",
          "address": "456 Avenue, City",
          "timezone": "EST"
        }
      ]
    }"
Success Response:

Code: 201 Created

Content

    {
      "message": "Contacts added successfully",
      "contacts": [
        { "id": 1, "name": "John Doe", ... },
        { "id": 2, "name": "Jane Smith", ... }
      ]
    }
Error Response:

Code: 400 Bad Request

Content:

    {
      "message": "Error adding contact(s)",
      "error": "Specific error message"
    }
2. **Update Contact(s) - PUT /api/contacts/{id}**
Updates contact details for an existing contact belonging to the authenticated user.

URL: /api/contacts/{id}

Method: 

Headers: Authorization: Bearer <token>

Parameters: id - the ID of the contact to be updated

Body (JSON):

    {
      "name": "New Name",
      "email": "newemail@example.com",
      "phone": "0987654321",
      "address": "789 New Street, New City",
      "timezone": "CST"
    }
Success Response:

Code: 200 OK

Content:

    {
      "message": "Contact updated successfully"
    }
Error Response:

Code: 404 Not Found

Content:

    {
      "message": "Contact not found",
      "error": "Specific error message"
    }
3. **Delete Contact - DELETE /api/contacts/{id}**
Deletes a specific contact from the database for the authenticated user.

URL: /api/contacts/{id}

Method: DELETE

Headers: Authorization: Bearer <token>

Parameters: id - the ID of the contact to delete

Success Response:

Code: 200 OK

Content:

    {
      "message": "Contact deleted successfully"
    }
Error Response:

Code: 404 Not Found

Content:

    {
      "message": "Contact not found"
    }
4. **Get All Contacts - GET /api/contacts**
Retrieves all contacts for the authenticated user.

URL: /api/contacts

Method: GET

Headers: Authorization: Bearer <token>

Success Response:

Code: 200 OK

Content:

    {
      "contacts": [
        {
          "id": 1,
          "name": "John Doe",
          "email": "johndoe@example.com",
          "phone": "1234567890",
          "address": "123 Street, City",
          "timezone": "PST"
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "janesmith@example.com",
          "phone": "0987654321",
          "address": "456 Avenue, City",
          "timezone": "EST"
        }
      ]
    }
Error Response:

Code: 500 Internal Server Error

Content:

    {
      "message": "Error retrieving contacts",
      "error": "Specific error message"
    }


