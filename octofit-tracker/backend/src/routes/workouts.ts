import { Router, Request, Response } from 'express';
import { Workout } from '../models/workout';

export const workoutsRouter = Router();

// GET all workouts
workoutsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
      .populate('userId')
      .populate('activityId')
      .sort({ date: -1 });
    res.json({
      message: 'Get all workouts',
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET workout by ID
workoutsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id)
      .populate('userId')
      .populate('activityId');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Get workout ${id}`,
      data: workout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST create workout
workoutsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, activityId, duration, date, distance, calories, notes } = req.body;
    const workout = new Workout({
      userId,
      activityId,
      duration,
      date,
      distance,
      calories,
      notes
    });
    await workout.save();
    await workout.populate('userId');
    await workout.populate('activityId');
    res.status(201).json({
      message: 'Workout created',
      data: workout
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// PUT update workout
workoutsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, activityId, duration, date, distance, calories, notes } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      id,
      { userId, activityId, duration, date, distance, calories, notes },
      { new: true }
    )
      .populate('userId')
      .populate('activityId');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Workout ${id} updated`,
      data: workout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE workout
workoutsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Workout ${id} deleted`,
      data: workout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

// GET workouts by user
workoutsRouter.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId })
      .populate('userId')
      .populate('activityId')
      .sort({ date: -1 });
    res.json({
      message: `Get workouts for user ${userId}`,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});
