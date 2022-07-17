//router index file
import { Router } from 'express';
import AuthRouter from "./AuthRouter"


const router: Router = Router();

router.use("/auth", AuthRouter);
router.use("/a", router);

export default router;