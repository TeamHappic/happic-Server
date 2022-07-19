import { Router } from 'express';
import { body } from 'express-validator/check';
import DailyController from '../controllers/DailyController';

const router: Router = Router();

router.get('/', DailyController.getAllDaily);
router.get('/:filmId', DailyController.getDaily);

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
router.get('/posted', DailyController.postedDaily);
router.get('/keyword', DailyController.getTopKeyword);
router.get('/title', DailyController.getAllTitle);
router.delete('/:filmId', DailyController.deleteDaily);

export default router;
