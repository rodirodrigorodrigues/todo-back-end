import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { createTask, updateTask } from '../interfaces/task';

export const createTask = async (req: Request<{}, {}, createTask>, res: Response): Promise<void> => {
  const { title, description } = req.body;

  try {
    await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json({ message: 'Tarefa criada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

export const getTaskById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) }
    });
    if (!task) {
      res.status(404).json({ error: 'Tarefa não encontrada' });
      return;
    }
    return res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  }
};

export const updateTask = async (req: Request<{ id: string }, {}, updateTask>, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) }
    });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed }
    });
    res.status(204).send({ message: 'Tarefa atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

export const deleteTask = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) }
    });
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await prisma.task.delete({
      where: { id: Number(id) }
    });
    res.status(204).send({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};