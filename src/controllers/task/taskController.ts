// Responsabilidade: lidar com requisições HTTP e enviar respostas.

import { Request, Response, NextFunction } from 'express';
import { IAuthRequest } from '../../interfaces/auth/auth';
import { ICreateTask, IUpdateTask } from '../../interfaces/task/task';
import { TaskService } from '../../services/task/taskService';

const taskService = new TaskService();

export const createTask = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const { title, description } = req.body as ICreateTask;
  const userId = req.user?.userId;
  await taskService.createTask(title, description, userId);
  res.status(201).json({ message: 'Tarefa criada com sucesso!' });
};

export const getTasks = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;
  const tasks = await taskService.getTasksByUserId(userId);
  res.json(tasks);
};

export const getTaskById = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const task = await taskService.getTaskById(Number(id), userId);
  res.json(task);
};

export const updateTask = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { title, description, completed } = req.body as IUpdateTask;
  const userId = req.user?.userId;
  await taskService.updateTask(Number(id), userId, { title, description, completed });
  res.status(204).json({ message: 'Tarefa atualizada com sucesso!' });
};

export const deleteTask = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.userId;
  await taskService.deleteTask(Number(id), userId);
  res.status(204).json({ message: 'Tarefa deletada com sucesso!' });
};