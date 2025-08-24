// Responsabilidade: acessar o banco de dados.
// Não contém lógica de negócio, só realiza operações CRUD ou consultas complexas.

import prisma from "../../prisma/client";
import { ICreateTask, IUpdateTask } from '../../interfaces/task/task';

export class TaskRepository {
  async create(data: ICreateTask) {
    return prisma.task.create({ data });
  }

  async findManyByUserId(userId: number) {
    return prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findUniqueByIdAndUserId(id: number, userId: number) {
    return prisma.task.findUnique({
      where: { id, userId },
    });
  }

  async update(id: number, data: IUpdateTask) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.task.delete({
      where: { id },
    });
  }
}
