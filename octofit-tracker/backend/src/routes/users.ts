import { Router, Request, Response } from 'express';
import { User } from '../models/user';

export const usersRouter = Router();

// GET all users
usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json({
      message: 'Get all users',
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET user by ID
usersRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `Get user ${id}`,
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST create user
usersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, avatar, points } = req.body;
    const user = new User({ name, email, avatar, points });
    await user.save();
    res.status(201).json({
      message: 'User created',
      data: user
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// PUT update user
usersRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, avatar, points } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, avatar, points },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `User ${id} updated`,
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE user
usersRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `User ${id} deleted`,
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
