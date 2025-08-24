import { Router } from "express";
import { registerUser, loginUser } from "../../controllers/user/userController";
import { validateRegister, validateLogin } from "../../middlewares/auth/validateAuthMiddleware";

const router = Router();

router.post("/auth/register", validateRegister, registerUser);
router.post("/auth/login", validateLogin, loginUser);

export default router;
