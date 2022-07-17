import {Router} from "express";
import { UserController } from "../controllers";

const router: Router = Router();

router.post('/', UserController.createChar);

export default router;
