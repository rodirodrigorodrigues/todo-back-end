// Responsabilidade: conter lógica de negócio da aplicação.
// Recebe dados do controller, processa regras, validações e decide quais operações chamar no repository.

import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../repositories/user/userRepository";
import { AppError } from "../../utils/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const userRepository = new UserRepository();

export class UserService {
  async register(name: string, email: string, passwordPlain: string): Promise<void> {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("Email já cadastrado", 400);
    }

    const hashedPassword = await hash(passwordPlain, 10);
    await userRepository.create(name, email, hashedPassword);
  }

  async login(email: string, passwordPlain: string): Promise<string> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email ou senha inválidos", 401);
    }

    const isPasswordValid = await compare(passwordPlain, user.password);
    if (!isPasswordValid) {
      throw new AppError("Email ou senha inválidos", 401);
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    return token;
  }
}