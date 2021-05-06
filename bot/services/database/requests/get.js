module.exports.run = (table, data = {}, callback, services) => {
    let where = "";

    if (Object.keys(data).length > 0) {
        where = " where"
        Object.keys(data).forEach((index) => {
            const item = data[index];
            where += " " + index + "=" + item;
        });
    }

    services.database.connection.command(services, "select * from " + table + where, ((error, result) => {
        callback(error, result);
    }))
}
