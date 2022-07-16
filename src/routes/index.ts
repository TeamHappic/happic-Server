//router index file
import { Router } from 'express';
import FileRouter from './FileRouter';

const router = Router();

router.use('/file', FileRouter);

export default router;
