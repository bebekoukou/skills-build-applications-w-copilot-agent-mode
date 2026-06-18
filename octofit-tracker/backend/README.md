# Octofit Tracker Backend

Express.js + TypeScript API for the Octofit Tracker multi-tier application.

## Installation

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

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

- `/health` - Health check
- `/api/config` - API configuration (Codespace-aware)
- `/api/users/` - User management
- `/api/teams/` - Team management
- `/api/activities/` - Activity management
- `/api/leaderboard/` - Leaderboard data
- `/api/workouts/` - Workout tracking

## Server

- Port: `8000`
- Codespace Support: Automatic API URL detection via `CODESPACE_NAME` environment variable
