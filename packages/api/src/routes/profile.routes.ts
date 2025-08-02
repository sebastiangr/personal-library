import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import * as profileController from '../controllers/profile.controller';

const router = Router();

// Endpoint protegido para obtener el perfil del usuario autenticado
// router.get('/', isAuthenticated, profileController.getProfile);
router.get('/', isAuthenticated, profileController.getProfile as any);

export default router;
