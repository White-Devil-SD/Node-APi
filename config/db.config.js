const mysql = require('mysql');

const dbConn= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'himpact'
});

dbConn.connect(function(err){
    if(err) throw err;
    console.log("Connected to Mysql Server");
});

module.exports = dbConn;