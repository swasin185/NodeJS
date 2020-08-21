const mysql = require('mysql2/promise')

const config = {
    host: '192.168.1.9', // process.env.DB_HOST,
    user: 'admin', // process.env.DB_USER,
    password: 'tommy', // process.env.DB_PASSWORD,
    database: 'test', // process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}
const pool = mysql.createPool(config)

exports.selectUser = async function (userName) {
    let  conn = await pool.getConnection();
    let [rows, fields] = await conn.query("select * from appuser where userName='"+userName+"'");
    conn.release()
    return rows
}