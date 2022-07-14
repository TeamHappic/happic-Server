import { Router } from 'express';
import { FileController } from '../controllers';
import upload from '../config/multer';

const router: Router = Router();

router.post('/upload', upload.single('file'), FileController.uploadFileToS3);

export default router;
