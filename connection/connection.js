const mysql = require('mysql');

const pool = mysql.createPool({
  host: "nodedock_mysql_1",
  port: 3306,
  user: "default",
  password: "secret",
  database: "default",
  multipleStatements: true,
});

module.exports = pool;
