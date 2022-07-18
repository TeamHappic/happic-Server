import {Router} from "express";
import { UserController } from "../controllers";
//import { TokenController } from "../controllers";

const router: Router = Router();

router.post("/", UserController.loginUser);
//router.get("/token", TokenController.getToken);

export default router;
