import { Router } from 'express';
import { body } from 'express-validator/check';
import DailyController from '../controllers/DailyController';
import auth from '../middleware/auth';

const router: Router = Router();

router.get('/',auth, DailyController.getAllDaily);
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

router.get('/posted',auth, DailyController.postedDaily);
router.get('/keyword', auth,DailyController.getTopKeyword);
router.get('/title', auth,DailyController.getAllTitle);
router.get('/:filmId',auth, DailyController.getDaily);
router.delete('/:filmId',auth, DailyController.deleteDaily);

export default router;
