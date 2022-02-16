const Command = (sql, databaseConnection, callback) => {
    const pool = databaseConnection.pool;

    pool.getConnection(function (error, connection) {
        if (error) throw error;
        connection.query(sql, callback);

        connection.release();
    });
};

module.exports = Command;
