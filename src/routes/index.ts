//router index file
import { Router } from 'express';
import HomeRouter from './HomeRouter';
import MypageRouter from './MypageRouter';


const router = Router();

router.use('/home', HomeRouter);
router.use('/mypage', MypageRouter);


export default router;