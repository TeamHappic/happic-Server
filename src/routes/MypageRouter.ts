import { Router } from 'express';
import { MypageController } from '../controllers';
import { body } from 'express-validator';
import auth from '../middleware/auth';

const router: Router = Router();

router.get('/:userId',MypageController.getAllRank);
router.get('/keyword/:userId', MypageController.getKeywordRank);
router.get('/category/:userId', MypageController.getKeywordByCategory);
//router.get('/monthly', MypageController.getKeywordByMonth);

export default router;