import { Request, Response } from "express";
import { UserService } from "../../services/user/userService";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  await userService.register(name, email, password);
  res.status(201).json({ message: "Usuário criado com sucesso!" });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  res.status(200).json({ token });
};
