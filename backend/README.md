# Hydro360 Backend

This is the backend server for the Hydro360 water management system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a .env file with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hydro360
JWT_SECRET=your_jwt_secret_here
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/verify - Verify JWT token

### Reports
- POST /api/reports - Create a new report
- GET /api/reports - Get all reports
- GET /api/reports/:id - Get a specific report
- PATCH /api/reports/:id - Update a report
- DELETE /api/reports/:id - Delete a report

## Database

The application uses MongoDB as its database. Make sure you have MongoDB installed and running locally, or update the MONGODB_URI in .env to point to your MongoDB instance.
