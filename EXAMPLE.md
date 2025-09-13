# FlatFinder API - Complete Usage Example

This document shows a complete step-by-step example of how to use the FlatFinder API, from user registration to apartment and message management.

## Prerequisites

1. The server must be running: `npm run dev`
2. MongoDB must be available (local or Atlas)
3. Environment variables configured in `.env`

## Step-by-Step Example

### 1. Check Server Status

**Endpoint:** `GET /health`

```bash
curl http://localhost:3001/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "FlatFinder API is running"
}
```

### 2. Register a New User

**Endpoint:** `POST /users/register`

```bash
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1990-05-15"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1YTU5NTk5ODI1ZjUxNGYzYmM2NGUiLCJpYXQiOjE3NTc3ODM0NDUsImV4cCI6MTc1Nzg2OTg0NX0.p1xC97BVXA5u9C4YSuwxjDJlAjgh_NbRYNWztWvfXhU",
  "user": {
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1990-05-15T00:00:00.000Z",
    "isAdmin": false,
    "favouriteFlats": [],
    "_id": "68c5a59599825f514f3bc64e",
    "createdAt": "2025-09-13T17:10:45.692Z",
    "updatedAt": "2025-09-13T17:10:45.692Z",
    "__v": 0
  }
}
```

**📝 Note:** Save the `token` to use in the following requests.

### 3. Add an Apartment

**Endpoint:** `POST /flats`

```bash
curl -X POST http://localhost:3001/flats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1YTU5NTk5ODI1ZjUxNGYzYmM2NGUiLCJpYXQiOjE3NTc3ODM0NDUsImV4cCI6MTc1Nzg2OTg0NX0.p1xC97BVXA5u9C4YSuwxjDJlAjgh_NbRYNWztWvfXhU" \
  -H "Content-Type: application/json" \
  -d '{
    "city": "New York",
    "streetName": "Broadway",
    "streetNumber": "25",
    "areaSize": 75,
    "hasAc": true,
    "yearBuilt": 2018,
    "rentPrice": 1200,
    "dateAvailable": "2024-01-15"
  }'
```

**Response:**
```json
{
  "_id": "68c5a5aa99825f514f3bc651",
  "city": "New York",
  "streetName": "Broadway",
  "streetNumber": "25",
  "areaSize": 75,
  "hasAc": true,
  "yearBuilt": 2018,
  "rentPrice": 1200,
  "dateAvailable": "2024-01-15T00:00:00.000Z",
  "owner": {
    "_id": "68c5a59599825f514f3bc64e",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "createdAt": "2025-09-13T17:11:06.678Z",
  "updatedAt": "2025-09-13T17:11:06.678Z",
  "__v": 0
}
```

**📝 Note:** Save the apartment `_id` to use in following requests.

### 4. Get All Apartments

**Endpoint:** `GET /flats`

```bash
curl -X GET http://localhost:3001/flats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1YTU5NTk5ODI1ZjUxNGYzYmM2NGUiLCJpYXQiOjE3NTc3ODM0NDUsImV4cCI6MTc1Nzg2OTg0NX0.p1xC97BVXA5u9C4YSuwxjDJlAjgh_NbRYNWztWvfXhU"
```

**Response:**
```json
[
  {
    "_id": "68c5a5aa99825f514f3bc651",
    "city": "New York",
    "streetName": "Broadway",
    "streetNumber": "25",
    "areaSize": 75,
    "hasAc": true,
    "yearBuilt": 2018,
    "rentPrice": 1200,
    "dateAvailable": "2024-01-15T00:00:00.000Z",
    "owner": {
      "_id": "68c5a59599825f514f3bc64e",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "createdAt": "2025-09-13T17:11:06.678Z",
    "updatedAt": "2025-09-13T17:11:06.678Z",
    "__v": 0
  }
]
```

### 5. Add Message to Apartment

**Endpoint:** `POST /flats/:id/messages`

```bash
curl -X POST http://localhost:3001/flats/68c5a5aa99825f514f3bc651/messages \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1YTU5NTk5ODI1ZjUxNGYzYmM2NGUiLCJpYXQiOjE3NTc3ODM0NDUsImV4cCI6MTc1Nzg2OTg0NX0.p1xC97BVXA5u9C4YSuwxjDJlAjgh_NbRYNWztWvfXhU" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello! I am very interested in this apartment. Is it available for viewing?"
  }'
```

**Response:**
```json
{
  "_id": "68c5a5c199825f514f3bc65b",
  "content": "Hello! I am very interested in this apartment. Is it available for viewing?",
  "flat": "68c5a5aa99825f514f3bc651",
  "sender": {
    "_id": "68c5a59599825f514f3bc64e",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "createdAt": "2025-09-13T17:11:29.586Z",
  "updatedAt": "2025-09-13T17:11:29.586Z",
  "__v": 0
}
```

### 6. Get Apartment Messages

**Endpoint:** `GET /flats/:id/messages`

```bash
curl -X GET http://localhost:3001/flats/68c5a5aa99825f514f3bc651/messages \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1YTU5NTk5ODI1ZjUxNGYzYmM2NGUiLCJpYXQiOjE3NTc3ODM0NDUsImV4cCI6MTc1Nzg2OTg0NX0.p1xC97BVXA5u9C4YSuwxjDJlAjgh_NbRYNWztWvfXhU"
```

**Response:**
```json
[
  {
    "_id": "68c5a5c199825f514f3bc65b",
    "content": "Hello! I am very interested in this apartment. Is it available for viewing?",
    "flat": "68c5a5aa99825f514f3bc651",
    "sender": {
      "_id": "68c5a59599825f514f3bc64e",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "createdAt": "2025-09-13T17:11:29.586Z",
    "updatedAt": "2025-09-13T17:11:29.586Z",
    "__v": 0
  }
]
```

## Example Summary

### Created Data

**User:**
- **ID:** `68c5a59599825f514f3bc64e`
- **Email:** `john@example.com`
- **Name:** `John Doe`
- **Birth Date:** `1990-05-15`
- **Is Admin:** `false`

**Apartment:**
- **ID:** `68c5a5aa99825f514f3bc651`
- **Location:** `Broadway 25, New York`
- **Area:** `75 m²`
- **Price:** `$1,200/month`
- **Air Conditioning:** `Yes`
- **Year Built:** `2018`
- **Available from:** `2024-01-15`
- **Owner:** `John Doe`

**Message:**
- **ID:** `68c5a5c199825f514f3bc65b`
- **Content:** `"Hello! I am very interested in this apartment. Is it available for viewing?"`
- **Sender:** `John Doe`
- **Apartment:** `Broadway 25, New York`

### JWT Token Used
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1YTU5NTk5ODI1ZjUxNGYzYmM2NGUiLCJpYXQiOjE3NTc3ODM0NDUsImV4cCI6MTc1Nzg2OTg0NX0.p1xC97BVXA5u9C4YSuwxjDJlAjgh_NbRYNWztWvfXhU
```

**Valid for:** 24 hours (expires: 2025-09-14T17:10:45Z)

## Additional Use Cases

### Login Existing User

```bash
curl -X POST http://localhost:3001/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Update Apartment

```bash
curl -X PATCH http://localhost:3001/flats/68c5a5aa99825f514f3bc651 \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{
    "rentPrice": 1300,
    "hasAc": true
  }'
```

### Get Specific Apartment

```bash
curl -X GET http://localhost:3001/flats/68c5a5aa99825f514f3bc651 \
  -H "Authorization: Bearer [TOKEN]"
```

## Important Notes

1. **Authentication:** All endpoints (except registration and login) require the `Authorization: Bearer [TOKEN]` header
2. **Permissions:** Only the owner can modify/delete their apartments
3. **Messages:** Only the apartment owner can see all messages
4. **Tokens:** Expire in 24 hours, use `/users/login` to get a new one
5. **Date Format:** Use ISO 8601 format (YYYY-MM-DD)

## Server Status

✅ **Server:** Running on port 3001
✅ **Database:** Connected to MongoDB Atlas
✅ **Authentication:** JWT working correctly
✅ **Endpoints:** All endpoints tested and working

**Test Date:** September 13, 2025
**API Version:** 1.0.0