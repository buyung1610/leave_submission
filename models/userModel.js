import db from '../config/dbConfig.js';
import bcrypt from 'bcrypt';

const User = {
    create: (userData) => {
        return new Promise((resolve, reject) => {
            // Hash password sebelum menyimpannya
            bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
                if (err) {
                    reject(err);
                } else {
                    db.query('INSERT INTO user (name, email, password, position, department, join_date, gender) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                        [userData.nama, userData.email, hashedPassword, userData.position, userData.department, userData.join_date, userData.gender], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.insertId);
                        }
                    });
                }
            });
        });
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM user';
            db.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
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
    update1: (userId, userData) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET name = ?, email = ? WHERE id = ?', [userData.name, userData.email, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('User updated successfully');
                }
            });
        });
    },
    update2: (userId, userData) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET position = ?, department = ? WHERE id = ?', [userData.position, userData.department, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('User updated successfully');
                }
            });
        });
    },
    delete: (userId) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM user WHERE id = ?', [userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('User deleted successfully');
                }
            });
        });
    },


    // get: () => {
    //     return new Promise((resolve, reject) => {
    //         const query = 'SELECT * FROM leave_allowance';
    //         db.query(query, (error, results, fields) => {
    //             if (error) {
    //                 reject(error);
    //             } else {
    //                 resolve(results);
    //             }
    //         });
    //     });
    // },
};
export default User;