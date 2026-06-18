import { Router, Request, Response } from 'express';

export const workoutsRouter = Router();

// GET all workouts
workoutsRouter.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all workouts',
    data: []
  });
});

// GET workout by ID
workoutsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get workout ${id}`,
    workoutId: id
  });
});

// POST create workout
workoutsRouter.post('/', (req: Request, res: Response) => {
  const { userId, activity, duration, date } = req.body;
  res.status(201).json({
    message: 'Workout created',
    workout: { id: 1, userId, activity, duration, date }
  });
});

// PUT update workout
workoutsRouter.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, activity, duration, date } = req.body;
  res.json({
    message: `Workout ${id} updated`,
    workout: { id, userId, activity, duration, date }
  });
});

// DELETE workout
workoutsRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Workout ${id} deleted`
  });
});
