import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { ICreateTask, IUpdateTask } from '../../interfaces/task/task';

export function validateCreateTask(req: Request<{}, {}, ICreateTask>, res: Response, next: NextFunction) {
  const { title, description } = req.body;

  if (!title || !validator.isLength(title, { min: 3, max: 100 })) {
    return res.status(400).json({ error: 'Título é obrigatório e deve ter entre 3 e 100 caracteres' });
  }

  if (!description || !validator.isLength(description, { max: 255 })) {
    return res.status(400).json({ error: 'Descrição é obrigatória e deve ter no máximo 255 caracteres' });
  }

  next();
}

export function validateUpdateTask(req: Request<{}, {}, IUpdateTask>, res: Response, next: NextFunction) {
  const { title, description, completed } = req.body;

  if (!title || !validator.isLength(title, { min: 3, max: 100 })) {
    return res.status(400).json({ error: 'Título é obrigatório e deve ter entre 3 e 100 caracteres' });
  }

  if (!description || !validator.isLength(description, { max: 255 })) {
    return res.status(400).json({ error: 'Descrição é obrigatória e deve ter no máximo 255 caracteres' });
  }

  if (completed !== undefined && !validator.isInt(String(completed))) {
    return res.status(400).json({ error: 'Completed deve ser um número inteiro' });
  }

  next();
}
