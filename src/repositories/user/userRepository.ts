// Responsabilidade: acessar o banco de dados.
// Não contém lógica de negócio, só realiza operações CRUD ou consultas complexas.

import prisma from "../../prisma/client";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(name: string, email: string, passwordHashed: string) {
    return prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
      },
    });
  }
}