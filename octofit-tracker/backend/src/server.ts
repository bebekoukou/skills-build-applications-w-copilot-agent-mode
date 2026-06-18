import express, { Express, Request, Response } from 'express';
import { usersRouter } from './routes/users';
import { teamsRouter } from './routes/teams';
import { activitiesRouter } from './routes/activities';
import { leaderboardRouter } from './routes/leaderboard';
import { workoutsRouter } from './routes/workouts';

const app: Express = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API URL helper endpoint for Codespaces
app.get('/api/config', (req: Request, res: Response) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  
  res.json({
    apiUrl,
    environment: codespaceName ? 'codespace' : 'local'
  });
});

// Route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Octofit Tracker API running on port ${PORT}`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  if (process.env.CODESPACE_NAME) {
    console.log(`🌐 Codespace: https://${process.env.CODESPACE_NAME}-8000.app.github.dev`);
  }
});
