import { Router } from 'express';
import { MypageController } from '../controllers';
//import { body } from 'express-validator';
import auth from '../middleware/auth';

const router: Router = Router();

router.get('/:userId', auth, MypageController.getAllRank);
router.get('/keyword/:userId', auth, MypageController.getKeywordRank);
router.get('/category/:userId', auth, MypageController.getKeywordByCategory);
router.get('/monthly/:userId', auth, MypageController.getKeywordByMonth);

export default router;
