import { Router, Request, Response } from 'express';
import { Activity } from '../models/activity';

export const activitiesRouter = Router();

// GET all activities
activitiesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().sort({ points: -1 });
    res.json({
      message: 'Get all activities',
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET activity by ID
activitiesRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Get activity ${id}`,
      data: activity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST create activity
activitiesRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, type, points, description } = req.body;
    const activity = new Activity({ name, type, points, description });
    await activity.save();
    res.status(201).json({
      message: 'Activity created',
      data: activity
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// PUT update activity
activitiesRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, type, points, description } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      id,
      { name, type, points, description },
      { new: true }
    );
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity ${id} updated`,
      data: activity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// DELETE activity
activitiesRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity ${id} deleted`,
      data: activity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});
