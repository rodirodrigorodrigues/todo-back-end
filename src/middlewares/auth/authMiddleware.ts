// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest } from "../../interfaces/auth/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticate = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };

    if (!decoded.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
