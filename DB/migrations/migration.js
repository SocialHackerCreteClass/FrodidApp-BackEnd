require('dotenv').config();
const execSQL = require('exec-sql');

execSQL.connect({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

execSQL.executeDirectory('./DB/frodid_app', (err) => {
  if (err) throw err;
  execSQL.disconnect();
  console.log('Done!');
});
