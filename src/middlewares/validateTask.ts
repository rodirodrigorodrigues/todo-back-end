import { Request, Response, NextFunction } from 'express';
import { createTask } from '../interfaces/task';

export function validateCreateTask(req: Request<{}, {}, createTask>, res: Response, next: NextFunction) {
  const { title, description, completed, createdAt, updatedAt } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Título é obrigatório e deve ser string' });
  }
  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({ error: 'Título deve ter entre 3 e 100 caracteres' });
  }
  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'Descrição deve ser string' });
  }
  if (description && description.length > 255) {
    return res.status(400).json({ error: 'Descrição pode ter no máximo 255 caracteres' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed deve ser boolean' });
  }
  if (createdAt !== undefined) {
    return res.status(400).json({ error: 'createdAt não deve ser enviado' });
  }
  if (updatedAt !== undefined) {
    return res.status(400).json({ error: 'updatedAt não deve ser enviado' });
  }

  next();
}
