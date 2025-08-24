import express from 'express';
import userRoutes from './routes/user/userRoutes';
import taskRoutes from './routes/task/taskRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

// Middleware global de tratamento de erros (deve ser o último)
app.use(errorHandler);

export default app;
