import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export function validateRegister(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;

  if (!name || validator.isEmpty(name.trim())) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email é obrigatório e deve ser válido' });
  }

  if (!password || validator.isEmpty(password)) {
    return res.status(400).json({ error: 'Senha é obrigatória' });
  }

  const isStrong = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  if (!isStrong) {
    return res.status(400).json({
      error: 'Senha fraca. A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um símbolo.',
    });
  }

  next();
}


export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email é obrigatório e deve ser válido' });
  }

  if (!password || validator.isEmpty(password.trim())) {
    return res.status(400).json({ error: 'Senha é obrigatória' });
  }

  next();
}
