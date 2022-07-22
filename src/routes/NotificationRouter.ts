import { Router } from 'express';
import NotificationService from '../services/NotificationService';

const router: Router = Router();

router.get('/capsule', NotificationService.postCapsuleNotice);
router.get('/check', NotificationService.postCheckNotice);

export default router;
