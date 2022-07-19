import { Router } from 'express';
import { body } from 'express-validator/check';
import DailyController from '../controllers/DailyController';
import auth from '../middleware/auth';

const router: Router = Router();

router.get('/', auth, DailyController.getAllDaily);

router.post(
  '/',
  [
    body('photo').notEmpty(),
    body('when').notEmpty(),
    body('where').notEmpty(),
    body('who').notEmpty(),
    body('what').notEmpty(),
  ],
  auth,
  DailyController.createDaily
);

router.delete('/:filmId', auth, DailyController.deleteDaily);

export default router;
