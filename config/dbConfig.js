import { createConnection } from 'mysql';

const db = createConnection({
  // host: process.env.HOST,
  // user: process.env.USERNAME,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cuti'
});

// Koneksi ke MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

export default db;