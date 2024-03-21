import db from '../config/dbConfig.js';
import bcrypt from 'bcrypt';

const auth = {
    findByUsername: async (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM user WHERE email = ?';
            db.query(query, [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    getById: (userId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE id = ?', [userId], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]);
                    } else {
                        reject('User not found');
                    }
                }
            });
        });
    },
    comparePassword: async (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    }
};

export default auth;