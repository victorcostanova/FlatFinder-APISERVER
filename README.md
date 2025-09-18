# FlatFinder API

Victor Costa Nova | Jose Antonio Cerda Ocejo
A REST API server for a flat finding application built with Node.js, Express, and MongoDB.

## Technologies

- **Server**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Development**: Nodemon

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your configuration:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/flatfinder
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

3. Start MongoDB on your system

4. Run the application:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
All endpoints except register and login require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### User Endpoints

| Method | Endpoint | Description | Permissions |
|--------|----------|-------------|-------------|
| POST | `/users/register` | Register a new user | Public |
| POST | `/users/login` | Login user | Public |
| GET | `/users` | Get all users | Admin only |
| GET | `/users/:id` | Get user by ID | Logged in |
| PATCH | `/users` | Update user | Admin/Owner |
| DELETE | `/users` | Delete user | Admin/Owner |

### Flat Endpoints

| Method | Endpoint | Description | Permissions |
|--------|----------|-------------|-------------|
| GET | `/flats` | Get all flats | Logged in |
| GET | `/flats/:id` | Get flat by ID | Logged in |
| POST | `/flats` | Add new flat | Flat owner |
| PATCH | `/flats/:id` | Update flat | Flat owner |
| DELETE | `/flats/:id` | Delete flat | Flat owner |

### Message Endpoints

| Method | Endpoint | Description | Permissions |
|--------|----------|-------------|-------------|
| GET | `/flats/:id/messages` | Get all messages for flat | Flat owner |
| GET | `/flats/:id/messages/:senderId` | Get user's messages | Message sender |
| POST | `/flats/:id/messages` | Add new message | Logged in |

## Data Models

### User
- id (ObjectId)
- email (String, required, unique)
- password (String, required, hashed)
- firstName (String, required)
- lastName (String, required)
- birthDate (Date, required)
- isAdmin (Boolean, default: false)
- favouriteFlats (Array of Flat ObjectIds)
- timestamps (createdAt, updatedAt)

### Flat
- id (ObjectId)
- city (String, required)
- streetName (String, required)
- streetNumber (String, required)
- areaSize (Number, required, min: 1)
- hasAc (Boolean, default: false)
- yearBuilt (Number, required)
- rentPrice (Number, required, min: 0)
- dateAvailable (Date, required)
- owner (User ObjectId, required)
- timestamps (createdAt, updatedAt)

### Message
- id (ObjectId)
- content (String, required, max: 1000)
- flat (Flat ObjectId, required)
- sender (User ObjectId, required)
- timestamps (createdAt, updatedAt)

## Example Requests

### Register User
```bash
POST /users/register
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-01"
}
```

### Login User
```bash
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Add Flat
```bash
POST /flats
Authorization: Bearer <token>
Content-Type: application/json

{
  "city": "Tel Aviv",
  "streetName": "Dizengoff",
  "streetNumber": "123",
  "areaSize": 85,
  "hasAc": true,
  "yearBuilt": 2020,
  "rentPrice": 5000,
  "dateAvailable": "2024-01-01"
}
```

### Add Message
```bash
POST /flats/:flatId/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Hi, I'm interested in this flat. Is it still available?"
}
```

## Development

The project follows a modular structure:
- `/src/config` - Database configuration
- `/src/models` - Mongoose models
- `/src/controllers` - Request handlers
- `/src/routes` - Route definitions
- `/src/middleware` - Authentication and other middleware

## Testing

Use Postman or Insomnia to test the API endpoints. Make sure to:
1. Register a user
2. Login to get a JWT token
3. Use the token in the Authorization header for protected routes
