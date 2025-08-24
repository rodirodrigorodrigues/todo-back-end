import { Router } from "express";
import { authenticate } from "../../middlewares/auth/authMiddleware";
import { validateCreateTask, validateUpdateTask } from "../../middlewares/task/validateTaskMiddleware";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../../controllers/task/taskController";

const router = Router();

router.post("/tasks", authenticate, validateCreateTask, createTask);
router.get("/tasks", authenticate, getTasks);
router.get("/tasks/:id", authenticate, getTaskById);
router.put("/tasks/:id", authenticate, validateUpdateTask, updateTask);
router.delete("/tasks/:id", authenticate, deleteTask);

export default router;
