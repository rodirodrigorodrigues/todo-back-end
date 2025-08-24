// o Prisma cria um cliente (biblioteca personalizada) para acessar o banco com base no seu schema.prisma. Esse cliente é a classe PrismaClient.
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export default prisma;
