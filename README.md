## Tecnologias Utilizadas

- **Node.js + TypeScript**  
    Ambiente server-side com tipagem estática para evitar erros e facilitar manutenção.

- **Express**  
    Framework web minimalista para criação de rotas e APIs RESTful.

- **Prisma ORM**  
    Modelagem, migração e acesso ao banco MySQL de forma simples e segura, com suporte a tipos TypeScript.

- **MySQL**  
    Banco relacional para armazenamento das tarefas. Fácil de usar e amplamente adotado.

- **JWT (JSON Web Tokens)**  
    Autenticação (fase 2, opcional).

- **Testes: Jest + Supertest**  
    Garantia de qualidade das APIs.

- **Swagger**  
    Documentação automática da API.

- **Fluxo para executar o servidor**

    npx prisma migrate dev --name sua-migration (Se você mudou o schema)
    npx prisma generate
    npm run dev
    
- **Prisma - Comandos**

    findMany -> é equivalente a um: select * from task

