import { Request, Response, NextFunction } from 'express';
import { createTask, updateTask } from '../interfaces/task';

export function validateCreateTask(req: Request<{}, {}, createTask>, res: Response, next: NextFunction) {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Título é obrigatório e deve ser string' });
  }
  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({ error: 'Título deve ter entre 3 e 100 caracteres' });
  }
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Descrição é obrigatória e deve ser string' });
  }
  if (description && description.length > 255) {
    return res.status(400).json({ error: 'Descrição pode ter no máximo 255 caracteres' });
  }
  next();
}

export function validateUpdateTask(req: Request<{}, {}, updateTask>, res: Response, next: NextFunction) {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Título é obrigatório e deve ser string' });
  }
  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({ error: 'Título deve ter entre 3 e 100 caracteres' });
  }
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Descrição é obrigatória e deve ser string' });
  }
  if (description && description.length > 255) {
    return res.status(400).json({ error: 'Descrição pode ter no máximo 255 caracteres' });
  }
  if (completed !== undefined && typeof completed !== 'number') {
    return res.status(400).json({ error: 'Completed deve ser um número' });
  }
  next();
}
