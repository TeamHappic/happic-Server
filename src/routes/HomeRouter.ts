import { Router } from 'express';
import HomeController from '../controllers/HomeController';
//import { body } from 'express-validator';
import auth from '../middleware/auth';

const router: Router = Router();

router.get('/', auth, HomeController.findCharacter);
router.get('/capsule', HomeController.getRandomCapsule);

export default router;
