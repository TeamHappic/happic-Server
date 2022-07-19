import { Router } from 'express';
import { MypageController } from '../controllers';
//import { body } from 'express-validator';
import auth from '../middleware/auth';

const router: Router = Router();

router.get('/', auth, MypageController.getAllRank);
router.get('/keyword', auth, MypageController.getKeywordRank);
router.get('/category', auth, MypageController.getKeywordByCategory);
router.get('/monthly', auth, MypageController.getKeywordByMonth);

export default router;
