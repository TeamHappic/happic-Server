import { Router } from 'express';
import { body } from 'express-validator/check';
import SettingController from '../controllers/SettingController';

const router: Router = Router();

router.patch('/', SettingController.changeChar);

export default router;
