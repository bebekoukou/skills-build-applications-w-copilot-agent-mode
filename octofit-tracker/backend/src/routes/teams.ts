import { Router, Request, Response } from 'express';
import { Team } from '../models/team';

export const teamsRouter = Router();

// GET all teams
teamsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('members')
      .sort({ totalPoints: -1 });
    res.json({
      message: 'Get all teams',
      count: teams.length,
      data: teams
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// GET team by ID
teamsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Get team ${id}`,
      data: team
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// POST create team
teamsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, members, totalPoints } = req.body;
    const team = new Team({ name, description, members, totalPoints });
    await team.save();
    await team.populate('members');
    res.status(201).json({
      message: 'Team created',
      data: team
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// PUT update team
teamsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, members, totalPoints } = req.body;
    const team = await Team.findByIdAndUpdate(
      id,
      { name, description, members, totalPoints },
      { new: true }
    ).populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Team ${id} updated`,
      data: team
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team' });
  }
});

// DELETE team
teamsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Team ${id} deleted`,
      data: team
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});
