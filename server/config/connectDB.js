const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
});

db.on("connection", (connection) => {
  connection.query("SET SESSION auto_increment_increment=1");
  console.log("Connection %d connected", connection.threadId);
});

db.on("acquire", (connection) => {
  console.log("Connection %d acquired", connection.threadId);
});

db.on("release", (connection) => {
  console.log("Connection %d released", connection.threadId);
});

db.on("error", (err) => {
  console.error(err);
  logEvents(`${err.errno}: ${err.code}\t${err.syscall}\t${err.hostname}`, "sqlErrLog.log");
});

module.exports = db;
