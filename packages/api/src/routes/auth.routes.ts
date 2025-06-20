import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
// Podríamos añadir validación de Zod aquí también para el email y la contraseña

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;