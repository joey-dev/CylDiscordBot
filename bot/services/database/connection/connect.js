const mysql = require('mysql');

let pool;

module.exports.run = () => {
    if (pool) {
        return pool;
    }

    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cyl',
    });

    pool.getConnection(function (error, connection) {
        if (error) throw error;
        console.log('Connected!');
        connection.release();
    });

    return pool;
};
