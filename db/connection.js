// this file creates connection to sql server with credentials

const mysql = require('mysql2');

const connection = mysql.createConnection({
    // server host
    host: 'localhost',
    // MySQL username
    user: 'root',
    // Mysql Password
    password: 'password',
    // database being used
    database: 'company'
});

// this is doing the actual connecting
connection.connect(function(error){
    if (error) throw error;
})
// export the database
module.exports = connection;