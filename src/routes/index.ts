//router index file
import { Router } from 'express';
import AuthRouter from "./AuthRouter"
import CharRouter from './CharRouter';


const router: Router = Router();

router.use("/auth", AuthRouter);
router.use("/character", CharRouter);

export default router;