// Responsabilidade: conter lógica de negócio da aplicação.
// Recebe dados do controller, processa regras, validações e decide quais operações chamar no repository.

import { TaskRepository } from "../../repositories/task/taskRepository";
import { NotFoundError } from "../../utils/customError";
import { AppError } from "../../utils/AppError";

const taskRepository = new TaskRepository();

export class TaskService {
  // TODO: adicionar regra de negócio para não permitir tarefas duplicadas (title e description iguais)
  async createTask(title: string, description: string | undefined, userId: number): Promise<void> {
    await taskRepository.create({
      title,
      description,
      userId
    });
  }

  async getTasksByUserId(userId: number): Promise<any[]> {
    return taskRepository.findManyByUserId(userId);
  }

  async getTaskById(id: number, userId: number): Promise<any> {
    const task = await taskRepository.findUniqueByIdAndUserId(id, userId);
    if (!task) {
      throw new AppError("Tarefa não encontrada ou não pertence ao usuário", 404);
    }
    return task;
  }

  async updateTask(id: number, userId: number, data: { title?: string, description?: string, completed?: boolean }): Promise<void> {
    const task = await taskRepository.findUniqueByIdAndUserId(id, userId);
    if (!task) {
      throw new AppError("Tarefa não encontrada ou não pertence ao usuário", 404);
    }
    await taskRepository.update(id, data);
  }

  async deleteTask(id: number, userId: number): Promise<void> {
    const task = await taskRepository.findUniqueByIdAndUserId(id, userId);
    if (!task) {
      throw new AppError("Tarefa não encontrada ou não pertence ao usuário", 404);
    }
    await taskRepository.delete(id);
  }
}