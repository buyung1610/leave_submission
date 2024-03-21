import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import verifyToken from '../middleware/verifyToken.js'; 
import auth from '../models/authModel.js';

const AuthController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await auth.findByUsername(email);

            if (!user) {
                return res.status(401).json({ message: 'Email atau password salah' });
            }

            const passwordMatch = await auth.comparePassword(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Email atau password salah' });
            }

            const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });
           
            const headers = {
                Authorization: `Bearer ${token}`
            };
            res.json({ token });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getUserById: async (req, res) => {
        try {
            // Menambahkan middleware verifyToken di sini
            verifyToken(req, res, async () => {
                const userId = req.userId; 
                const submission = await auth.getById(userId);
                res.json(submission);
            });
        } catch (err) {
            console.error('Error:', err);
            res.status(404).json({ error: 'Submission not found' });
        }
    },
};

export default AuthController;
