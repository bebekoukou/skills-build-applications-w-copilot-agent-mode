import { Router, Request, Response } from 'express';

export const usersRouter = Router();

// GET all users
usersRouter.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all users',
    data: []
  });
});

// GET user by ID
usersRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get user ${id}`,
    userId: id
  });
});

// POST create user
usersRouter.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.status(201).json({
    message: 'User created',
    user: { id: 1, name, email }
  });
});

// PUT update user
usersRouter.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({
    message: `User ${id} updated`,
    user: { id, name, email }
  });
});

// DELETE user
usersRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} deleted`
  });
});
