import { Router } from 'express';
import { getTasks, createTask } from '../controllers/taskController';
import { validateCreateTask } from '../middlewares/validateTask';

const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks', validateCreateTask, createTask);

export default router;
