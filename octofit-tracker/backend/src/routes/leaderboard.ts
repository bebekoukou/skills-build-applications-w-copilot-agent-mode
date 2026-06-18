import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/leaderboard';

export const leaderboardRouter = Router();

// GET global leaderboard
leaderboardRouter.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId')
      .sort({ rank: 1 });
    res.json({
      message: 'Get global leaderboard',
      count: leaderboard.length,
      leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET team leaderboard
leaderboardRouter.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ teamId })
      .populate('userId')
      .sort({ rank: 1 });
    res.json({
      message: `Get leaderboard for team ${teamId}`,
      teamId,
      count: leaderboard.length,
      leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET user ranking
leaderboardRouter.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const entry = await Leaderboard.findOne({ userId }).populate('userId');
    if (!entry) {
      return res.status(404).json({ error: 'User not found in leaderboard' });
    }
    res.json({
      message: `Get ranking for user ${userId}`,
      rank: entry.rank,
      points: entry.points,
      workoutCount: entry.workoutCount,
      data: entry
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user ranking' });
  }
});
