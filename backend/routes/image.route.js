import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createImage, getImages } from '../controllers/image.controller.js';

const router = express.Router();

router.post('/upload/:id',verifyToken, createImage);
router.get('/getImages/:id',verifyToken, getImages);

export default router;