# Backend Assignment-1

### Creating the basic CRUD ToDo app API with Node.js and Express

## Prerequisites

You need to have Docker installed on your machine.

## Getting Started

### Pulling the Docker Image

To get started with this application, pull the Docker image from Docker Hub using the following command:

`docker pull bhuwanluffy/node-assignment1`

### Running the Docker Container

Once you have pulled the Docker image, you can run it using the following command:

`docker run -d -p 3000:3000 bhuwanluffy/node-assignment1`

### Accessing the API

You can now access the Todo app API by opening a web browser or using a tool like curl and navigating to http://localhost:3000/tasks.

Example API Endpoints:

    GET /tasks: Retrieve all tasks.
    GET /tasks/{id}: Retrieve a specific task by ID.
    POST /tasks: Create a new task.
    PUT /tasks/{id}: Update an existing task by ID.
    DELETE /tasks/{id}: Delete a task by ID.
