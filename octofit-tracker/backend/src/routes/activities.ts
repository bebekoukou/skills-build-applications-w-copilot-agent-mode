import { Router, Request, Response } from 'express';

export const activitiesRouter = Router();

// GET all activities
activitiesRouter.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all activities',
    data: []
  });
});

// GET activity by ID
activitiesRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get activity ${id}`,
    activityId: id
  });
});

// POST create activity
activitiesRouter.post('/', (req: Request, res: Response) => {
  const { name, type, points } = req.body;
  res.status(201).json({
    message: 'Activity created',
    activity: { id: 1, name, type, points }
  });
});

// PUT update activity
activitiesRouter.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type, points } = req.body;
  res.json({
    message: `Activity ${id} updated`,
    activity: { id, name, type, points }
  });
});

// DELETE activity
activitiesRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Activity ${id} deleted`
  });
});
