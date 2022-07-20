import { Router } from 'express';
import { UserController }  from '../controllers';

const router: Router = Router();

router.post("/signin", UserController.loginUser);
router.post('/', UserController.signUp);

export default router;