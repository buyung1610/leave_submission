import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const UserController = {
    createUser: async (req, res) => {
        try {
            const userId = await User.create(req.body);
            res.status(201).json({ userId });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching data :', error);
            res.status(500).send('Internal server error');
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.getById(req.params.id);
            res.json(user);
        } catch (err) {
            console.error('Error:', err);
            res.status(404).json({ error: 'User not found' });
        }
    },
    updateUser1: async (req, res) => {
        try {
            await User.update1(req.params.id, req.body);
            res.json({ message: 'User updated successfully' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateUser2: async (req, res) => {
        try {
            await User.update2(req.params.id, req.body);
            res.json({ message: 'User updated successfully' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.delete(req.params.id);
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


    // getAllleave: async (req, res) => {
    //     try {
    //         const users = await User.get();
    //         res.status(200).json(users);
    //     } catch (error) {
    //         console.error('Error fetching data :', error);
    //         res.status(500).send('Internal server error');
    //     }
    // },
};

export default UserController;