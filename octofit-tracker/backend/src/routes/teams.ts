import { Router, Request, Response } from 'express';

export const teamsRouter = Router();

// GET all teams
teamsRouter.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all teams',
    data: []
  });
});

// GET team by ID
teamsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get team ${id}`,
    teamId: id
  });
});

// POST create team
teamsRouter.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
  res.status(201).json({
    message: 'Team created',
    team: { id: 1, name, description }
  });
});

// PUT update team
teamsRouter.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  res.json({
    message: `Team ${id} updated`,
    team: { id, name, description }
  });
});

// DELETE team
teamsRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Team ${id} deleted`
  });
});
