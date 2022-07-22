import { Router } from 'express';
import HomeController from '../controllers/HomeController';
//import { body } from 'express-validator';
import auth from '../middleware/auth';
import HomeService from '../services/HomeService';

const router: Router = Router();

router.get('/', auth, HomeController.findCharacter);
router.get('/capsule', auth, HomeController.getRandomCapsule);
// router.get('push/capsule', HomeService.capsulePushAlram);
// router.get('push/check', HomeService.checkPushAlaram);
export default router;
