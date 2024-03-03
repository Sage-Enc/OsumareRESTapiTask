# Task Management API Documentation

This API provides endpoints for managing tasks.

## Base URL

http://localhost:3000


## Endpoints

### GET /

- **Description:** Returns a welcome message.
- **URL:** `/`
- **Method:** GET
- **Response:**
  - Status: 200 OK
  - Body: `"Hello World!"`

### GET /tasks

- **Description:** Retrieves paginated list of tasks.
- **URL:** `/tasks`
- **Method:** GET
- **Query Parameters:**
  - `page` (optional): Page number for pagination (default: 1)
  - `limit` (optional): Number of tasks per page (default: 5)
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "status": "Success",
      "response": {
        "data": { /* Paginated tasks data */ },
        "currentPage": /* Current page number */,
        "totalPages": /* Total number of pages */
      }
    }
    ```

### GET /tasks/:id

- **Description:** Retrieves details of a specific task by ID.
- **URL:** `/tasks/:id`
- **Method:** GET
- **Path Parameters:**
  - `id`: Unique identifier of the task
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
      "status": "Success",
      "response": { /* Task details */ }
    }
    ```
  - Status: 404 Not Found
    - Body:
      ```json
      {
        "status": "Failure",
        "response": "Task not found"
      }
      ```

### POST /tasks

- **Description:** Creates a new task.
- **URL:** `/tasks`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
- **Response:**
  - Status: 200 OK
  - Body: 
  ```json
  {
    "status": "Success",
    "response": "Task is added"
  }
  
### PUT /tasks/:id

- **Description:** Updates an existing task by ID.
- **URL:** `/tasks/:id`
- **Method:** PUT
- **Path Parameters:** 
   -id: Unique identifier of the task
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description"
  }
- **Response:**
  - Status: 200 OK
  - Body: 
  ```json
  {
    "status": "Success",
    "response": "Task is updated"
  }
  
### DELETE /tasks/:id

- **Description:** Deletes an existing task by ID.
- **URL:** `/tasks/:id`
- **Method:** DELETE
- **Path Parameters:** 
   -id:Unique identifier of the task
- **Response:**
  - Status: 200 OK
  - Body: 
  ```json
  {
    "status": "Success",
    "response": "Task is Deleted"
  }
  ```
  - Status: 404 Not Found
   - Body: 
  ```json
        {
            "status": "failure",
            "response": "Task not found"
        }
    ```