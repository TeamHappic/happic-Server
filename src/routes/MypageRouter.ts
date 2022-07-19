import { Router } from 'express';
import { MypageController } from '../controllers';
import { body } from 'express-validator';
import auth from '../middleware/auth';

const router: Router = Router();

router.get('/', MypageController.getAllRank);
router.get('/keyword', MypageController.getKeywordRank);
router.get('/category', MypageController.getKeywordByCategory);
router.get('/monthly', MypageController.getKeywordByMonth);

export default router;
