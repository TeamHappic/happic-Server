import { Router } from 'express';
import { body } from 'express-validator/check';
import DailyController from '../controllers/DailyController';

const router: Router = Router();

router.get('/', DailyController.getAllDaily);

router.post(
  '/',
  [
    body('photo').notEmpty(),
    body('when').notEmpty(),
    body('where').notEmpty(),
    body('who').notEmpty(),
    body('what').notEmpty(),
  ],
  DailyController.createDaily
);

router.delete('/:filmId', DailyController.deleteDaily);

export default router;
