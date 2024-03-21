import express, { json } from 'express';
import userRoutes from './routes/userRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cron from 'node-cron';

const app = express();

app.use(json());

app.use('/', userRoutes);

app.use('/', submissionRoutes);

app.use('/auth', authRoutes);


cron.schedule('0 0 1 1 *', async () => {
    try {
      // Perintah SQL untuk mengupdate sisa cuti tahunan berdasarkan masa kerja karyawan
      const sql = `
      update leave_allowance 
      inner join user on leave_allowance.user_id = user.id
      set leave_allowance.leave_allowance =
      CASE
          WHEN TIMESTAMPDIFF(MONTH, join_date, CURDATE()) >= 72 THEN 17
          WHEN TIMESTAMPDIFF(MONTH, join_date, CURDATE()) >= 60 THEN 16
          WHEN TIMESTAMPDIFF(MONTH, join_date, CURDATE()) >= 48 THEN 15
          WHEN TIMESTAMPDIFF(MONTH, join_date, CURDATE()) >= 36 THEN 14
          WHEN TIMESTAMPDIFF(MONTH, join_date, CURDATE()) >= 24 THEN 13
          WHEN TIMESTAMPDIFF(MONTH, join_date, CURDATE()) >= 12 THEN 12
          ELSE 0
      END;
      `;
      // Jalankan perintah SQL
      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Sisa cuti tahunan berhasil diperbarui');
      });
    } catch (error) {
      console.error('Error:', error);
    }
});


const port = 3000 ;
app.listen(port, '192.168.10.91', () => {
  console.log(`Server is running on http://192.168.10.91:${port}`);
});