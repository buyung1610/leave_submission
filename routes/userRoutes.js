import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';

router.post('/users', UserController.createUser);

router.get('/users', UserController.getAllUsers);

// router.get('/leave', UserController.getAllleave);

router.get('/users/:id', UserController.getUserById);

router.put('/users1/:id', UserController.updateUser1);

router.put('/users2/:id', UserController.updateUser2);

router.delete('/users/:id', UserController.deleteUser);

export default router;