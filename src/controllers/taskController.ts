import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { createTask } from '../interfaces/task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

export const createTask = async (req: Request<{}, {}, createTask>, res: Response): Promise<void> => {
  const { title, description } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};
