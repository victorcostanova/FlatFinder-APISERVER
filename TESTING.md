# FlatFinder API Testing Guide

## Prerequisites

Before testing the API, you need to:

1. **Install MongoDB**:
   - macOS: `brew install mongodb-community`
   - Ubuntu: `sudo apt-get install mongodb`
   - Windows: Download from MongoDB official website

2. **Start MongoDB**:
   ```bash
   # macOS/Linux
   mongod --dbpath /usr/local/var/mongodb

   # Or as a service
   brew services start mongodb/brew/mongodb-community
   ```

3. **Start the FlatFinder API**:
   ```bash
   npm run dev
   ```

## Test Scenarios

### 1. Health Check
```bash
curl http://localhost:3001/health
```
Expected: `{"status":"OK","message":"FlatFinder API is running"}`

### 2. User Registration
```bash
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1990-01-01"
  }'
```

### 3. User Login
```bash
curl -X POST http://localhost:3001/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the token from the login response for subsequent requests.

### 4. Get All Flats (requires authentication)
```bash
curl -X GET http://localhost:3001/flats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 5. Add a New Flat (requires authentication)
```bash
curl -X POST http://localhost:3001/flats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Tel Aviv",
    "streetName": "Dizengoff",
    "streetNumber": "123",
    "areaSize": 85,
    "hasAc": true,
    "yearBuilt": 2020,
    "rentPrice": 5000,
    "dateAvailable": "2024-01-01"
  }'
```

### 6. Add a Message to a Flat (requires authentication)
```bash
curl -X POST http://localhost:3001/flats/FLAT_ID_HERE/messages \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hi, I am interested in this flat. Is it still available?"
  }'
```

## Test with Postman/Insomnia

1. Import the following collection or create requests manually:

### User Registration
- **POST** `http://localhost:3001/users/register`
- **Body** (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User",
  "birthDate": "1990-01-01"
}
```

### User Login
- **POST** `http://localhost:3001/users/login`
- **Body** (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Get All Users (Admin only)
- **GET** `http://localhost:3001/users`
- **Headers**: `Authorization: Bearer <token>`

### Add Flat
- **POST** `http://localhost:3001/flats`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (JSON):
```json
{
  "city": "Tel Aviv",
  "streetName": "Rothschild",
  "streetNumber": "45",
  "areaSize": 75,
  "hasAc": true,
  "yearBuilt": 2018,
  "rentPrice": 4500,
  "dateAvailable": "2024-02-01"
}
```

### Update Flat
- **PATCH** `http://localhost:3001/flats/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (JSON):
```json
{
  "rentPrice": 4800,
  "hasAc": true
}
```

### Delete Flat
- **DELETE** `http://localhost:3001/flats/:id`
- **Headers**: `Authorization: Bearer <token>`

### Add Message
- **POST** `http://localhost:3001/flats/:id/messages`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (JSON):
```json
{
  "content": "Is this flat pet-friendly?"
}
```

### Get Messages (Flat Owner)
- **GET** `http://localhost:3001/flats/:id/messages`
- **Headers**: `Authorization: Bearer <token>`

## Common Error Responses

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. You can only access your own account."
}
```

### 404 Not Found
```json
{
  "message": "User not found"
}
```

### 400 Bad Request
```json
{
  "message": "User already exists with this email"
}
```

## API Permissions Summary

| Endpoint | Method | Permission Required |
|----------|--------|-------------------|
| `/users/register` | POST | Public |
| `/users/login` | POST | Public |
| `/users` | GET | Admin |
| `/users/:id` | GET | Logged in |
| `/users/:id` | PATCH | Admin or Owner |
| `/users/:id` | DELETE | Admin or Owner |
| `/flats` | GET | Logged in |
| `/flats/:id` | GET | Logged in |
| `/flats` | POST | Logged in |
| `/flats/:id` | PATCH | Flat Owner |
| `/flats/:id` | DELETE | Flat Owner |
| `/flats/:id/messages` | GET | Flat Owner |
| `/flats/:id/messages/:senderId` | GET | Message Sender |
| `/flats/:id/messages` | POST | Logged in |