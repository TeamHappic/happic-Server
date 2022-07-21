import { Router } from 'express';
import UserController  from '../controllers/UserController';

const router: Router = Router();

router.post("/",UserController.registerFcm);
router.post("/signin", UserController.signIn);
router.post('/signup', UserController.signUp);

export default router;