import { Router } from 'express';
import { body } from 'express-validator/check';
import SettingController from '../controllers/SettingController';
import auth from '../middleware/auth';

const router: Router = Router();

router.patch('/', auth, SettingController.changeChar);

export default router;
