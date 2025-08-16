import { Router } from 'express';
import { getTasks, getTaskById, createTask, deleteTask, updateTask } from '../controllers/taskController';
import { validateCreateTask, validateUpdateTask } from '../middlewares/validateTask';

const router = Router();

router.post('/tasks', validateCreateTask, createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', validateUpdateTask, updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
