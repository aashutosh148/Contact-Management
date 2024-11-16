# Contact Management Backend

## Project Setup
1. Clone the repository:
   ```bash
    git clone https://github.com/aashutosh148/contact-management.git
    ```
2. Navigate to the backend directory:
    ```bash
        cd backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
   Create a .env file in the backend directory with the following:

    ```
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    ```

5. Start the server:
    ```bash
    npm run dev
    ```
   The server will start on `http://localhost:3000`.


## API Endpoints
1. **Create a New Contact**
- Endpoint: `POST /api/contacts`
- Request Body:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "company": "Acme Inc.",
    "jobTitle": "Software Engineer"
  }
  ```

2. **Get All Contacts**
- Endpoint: `GET /api/contacts`

3. **Update a Contact**
- Endpoint: `PUT /api/contacts/:id`
- Request Body:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phoneNumber": "0987654321",
    "company": "Globex Corp.",
    "jobTitle": "Product Manager"
  }
  ```

4. **Delete a Contact**
- Endpoint: `DELETE /api/contacts/:id`

## Data Model
The `Contact` model is defined in `models/Contact.js`.

## Error Handling
The backend provides appropriate error messages for validation errors, duplicate email addresses, not found errors, and general server errors.

## Why I chose MongoDB
* Easily compatible with  JSON Response.
* Faster Read operation.
* built in Support for pagination which was needed in this, Although it was easily doable with just frontend
* Natural compatibility with NodeJS and ReactJS
* As simple CRUD operation were only thing needed. 