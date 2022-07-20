import { Router } from 'express';
import { UserController } from '../controllers';
//import { TokenController } from "../controllers";

const router: Router = Router();

router.post('/', UserController.loginUser);
//router.get("/token", TokenController.getToken);

// 유저에 FcmToken 등록
router.post('/', UserController.RegisterFcm);

export default router;
