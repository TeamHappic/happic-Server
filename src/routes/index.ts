//router index file
import { Router } from 'express';
import DailyRouter from './DailyRouter';
import FileRouter from './FileRouter';

const router = Router();

router.use('/file', FileRouter);
router.use('/daily', DailyRouter);

export default router;
