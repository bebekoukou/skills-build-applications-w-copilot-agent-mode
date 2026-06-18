# Octofit Tracker Backend

Express.js + TypeScript + MongoDB API for the Octofit Tracker multi-tier application.

## Installation

```bash
npm install
```

## Prerequisites

- MongoDB running on `localhost:27017` (or set `MONGODB_URI` environment variable)

## Development

Run the development server:

```bash
npm run dev
```

## Seed Database

Populate the database with test data:

```bash
npm run seed
```

This seeds the octofit_db database with realistic sample data:
- 6 users
- 3 teams
- 6 activities
- 8 workouts
- 6 leaderboard entries

## Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

## Production

Start the production server:

```bash
npm run start
```

## API Endpoints

### System
- `GET /health` - Health check
- `GET /api/config` - API configuration (Codespace-aware)

### Users
- `GET /api/users/` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Teams
- `GET /api/teams/` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams/` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Activities
- `GET /api/activities/` - Get all activities
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities/` - Create activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Workouts
- `GET /api/workouts/` - Get all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `GET /api/workouts/user/:userId` - Get workouts by user
- `POST /api/workouts/` - Create workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Leaderboard
- `GET /api/leaderboard/` - Get global leaderboard
- `GET /api/leaderboard/team/:teamId` - Get team leaderboard
- `GET /api/leaderboard/user/:userId` - Get user ranking

## Database

- **Connection String**: `mongodb://localhost:27017/octofit_db`
- **Collections**: users, teams, activities, workouts, leaderboards

## Server Configuration

- **Port**: 8000
- **Codespace Support**: Automatic API URL detection via `CODESPACE_NAME` environment variable
