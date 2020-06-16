const mysql = require('mysql');

const pool = mysql.createPool({
  host: "ec2-18-185-118-132.eu-central-1.compute.amazonaws.com",
  port: 3306,
  user: "default",
  password: "secret",
  database: "default",
  multipleStatements: true,
});

module.exports = pool;
