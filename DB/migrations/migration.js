require('dotenv').config();
const execSQL = require('exec-sql');

execSQL.connect({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const sqlFile = './DB/frodid_app/frodid_app_main_file.sql';

execSQL.executeFile(sqlFile, (err) => {
  if (err) throw err;
  execSQL.disconnect();
  console.log('Done!');
});
