# Backend Assignment-2

# Introduction

Creating the basic CRUD Todo app API using authentication with Node.js and Express!

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
   - [Pulling the Docker Image](#pulling-the-docker-image)
   - [Running the Docker Container](#running-the-docker-container)
4. [Accessing the API for Authentication](#accessing-the-api-for-authentication)
5. [Accessing the API for ToDo Tasks](#accessing-the-api-for-todo-tasks)

## Features

- Authentication: Users can sign up, log in, and receive JWT tokens for authentication.
- Todo Operations: CRUD operations (Create, Read, Update, Delete) are supported for Todo tasks.
- Security: JWT tokens are used to authenticate and authorize users, ensuring secure access to the API endpoints.

## Prerequisites

You need to have Docker installed on your machine.

## Getting Started

### Pulling the Docker Image

To get started with this application, pull the Docker image from Docker Hub using the following command:

`docker pull bhuwanluffy/node-assignment1`

### Running the Docker Container

Once you have pulled the Docker image, you can run it using the following command:

`docker run -d -p 3000:3000 bhuwanluffy/node-assignment1`

### Accessing the API for authentication

You can now access the Todo app API by opening a web browser or using a tool like curl and navigating to http://localhost:3000/.

Example API Endpoints:

    GET /users: Retrieve all users.
    GET /users/{id}: Retrieve a specific user by ID.
    POST /auth/signup: Create a new user.
        {
            "email":"one@gamil.com",
            "password":"1234",
            "userId":"1"
        }

    POST /auth/login: Log in user.
     {
            "email":"one@gamil.com",
            "password":"1234"
        }

    GET /auth/refresh-token: Refresh token for user.
        put access token in bearer of  auth
        {
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        }

### Accessing the API for todo tasks

You can now access the Todo app API by opening a web browser or using a tool like curl and navigating to http://localhost:3000/.

Example API Endpoints:

    GET /tasks: Retrieve all tasks.
      put access token in bearer of  auth
        {
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        }

    GET /tasks/{id}: Retrieve a specific task by ID.
      put access token in bearer of  auth
        {
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        }

    POST /tasks: Create a new task.
        {

        "todo":"learn java ",
        "userId":"3"
        }

    PUT /tasks/{id}: Update an existing task by ID.
        {
        "todo":"learn js ",
        "userId":"3"
        }
    DELETE /tasks/{id}: Delete a task by ID.
       put access token in bearer of  auth
        {
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        }
