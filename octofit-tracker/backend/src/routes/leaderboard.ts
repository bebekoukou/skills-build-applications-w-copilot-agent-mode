import { Router, Request, Response } from 'express';

export const leaderboardRouter = Router();

// GET global leaderboard
leaderboardRouter.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get global leaderboard',
    leaderboard: []
  });
});

// GET team leaderboard
leaderboardRouter.get('/team/:teamId', (req: Request, res: Response) => {
  const { teamId } = req.params;
  res.json({
    message: `Get leaderboard for team ${teamId}`,
    teamId,
    leaderboard: []
  });
});

// GET user ranking
leaderboardRouter.get('/user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  res.json({
    message: `Get ranking for user ${userId}`,
    userId,
    rank: 0,
    points: 0
  });
});
