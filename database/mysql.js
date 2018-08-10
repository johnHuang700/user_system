var mysql = require('mysql');
require('dotenv').config()

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
});

connection.connect(err => {
    if (err) {
        console.log('connecting error');
    } else {
        console.log('connecting success');
    }
});

module.exports = connection;