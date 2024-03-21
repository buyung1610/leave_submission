import express from 'express';
const router = express.Router();
import AuthController from '../controllers/authController.js';

router.post('/login', AuthController.login);

router.get('/user', AuthController.getUserById)

export default router;