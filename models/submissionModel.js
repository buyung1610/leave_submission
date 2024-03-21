import db from '../config/dbConfig.js';

const Submission = {
    create: (userData, selectedOption) => {
        return new Promise((resolve, reject) => {
            const startDate = new Date(userData.startDate);
            const endDate = new Date(userData.endDate);
    
            const timeDifference = endDate.getTime() - startDate.getTime();
    
            const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
            // Query untuk memeriksa nilai jatah cuti dari leave_allowance
            db.query('SELECT leave_allowance FROM leave_allowance WHERE user_id = ?', [userData.userId], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
    
                // Memeriksa apakah nilai jatah_cuti = 0
                if (rows.length === 0 || rows[0].leave_allowance === 0) {
                    reject('Jatah cuti tidak cukup');
                    return;
                }
    
                // Melakukan operasi INSERT jika jatah cuti cukup
                db.query('INSERT INTO leave_submission (user_id, leave_id, long_leave, start_date, end_date, emergency_call, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                    [userData.userId, userData.leaveId, numberOfDays, userData.startDate, userData.endDate, userData.emergencyCall, userData.description, userData.status], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.insertId);
                        }
                    });
            });
        });
    },    
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM leave_submission';
            db.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getAllAccepted: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM leave_submission where status = 'diterima'";
            db.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }, 
    getAllRejected:() => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM leave_submission where status = 'ditolak'";
            db.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getAllProcess: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM leave_submission where status = 'dalam proses'";
            db.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getById: (submissionId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM leave_submission WHERE id = ?', [submissionId], (err, results) => {
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
    update: (submissionId, userData) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE leave_submission SET start_date = ?, end_date = ?, emergency_call = ?, description = ? WHERE id = ?', 
            [userData.startDate, userData.endDate, userData.emergencyCall, userData.description, submissionId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('User updated successfully');
                }
            });
        });
    },  
    updateStatus: (buttonClicked, id) => {
        return new Promise((resolve, reject) => {
            db.query("UPDATE leave_submission SET status = ? WHERE id = ?", [buttonClicked.status, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (buttonClicked.status === 'diterima') {
                        // Dapatkan userId terkait dengan pengajuan cuti
                        db.query('SELECT user_id FROM leave_submission WHERE id = ?', [id], (err, rows) => {
                            if (err) {
                                reject(err);
                                return;
                            }
    
                            if (rows.length === 0) {
                                reject(new Error('Leave submission not found'));
                                return;
                            }
    
                            const userId = rows[0].user_id;
    
                            // Kurangi jatah cuti di leave_allowance
                            db.query('UPDATE leave_allowance SET leave_allowance = leave_allowance - 1 WHERE user_id = ?', [userId], (err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve('User updated successfully');
                                }
                            });
                        });
                    } else {
                        resolve('User updated successfully');
                    }
                }
            });
        });
    },
    
    delete: (submissionId) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM leave_submission WHERE id = ?', [submissionId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('User deleted successfully');
                }
            });
        });
    }
}

export default Submission;


