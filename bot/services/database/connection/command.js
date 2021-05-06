module.exports.run = (services, sql, callback) => {
    const pool = services.database.connection.pool;

    pool.getConnection(function(error, connection) {
        if (error) throw error;
        connection.query(sql, callback);

        connection.release();
    });
}
