import { Router } from 'express';
import UserController from '../controllers/UserController';
import auth from '../middleware/auth';

const router: Router = Router();

router.post('/signin', UserController.signIn);
router.post('/signup', UserController.signUp);
router.post('/push', auth, UserController.registerFcm);

export default router;
