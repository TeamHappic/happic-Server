//router index file
import { Router } from 'express';
import DailyRouter from './DailyRouter';
import FileRouter from './FileRouter';
import HomeRouter from './HomeRouter';
import MypageRouter from './MypageRouter';
import SettingRouter from './SettingRouter';
import UserRouter from './UserRouter';

const router = Router();

router.use('/file', FileRouter);
router.use('/home', HomeRouter);
router.use('/mypage', MypageRouter);
router.use('/daily', DailyRouter);
router.use('/user', UserRouter); //로그인, 회원가입
router.use('/setting', SettingRouter);

export default router;
