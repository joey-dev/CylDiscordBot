module.exports.run = (table, data = {}, callback, services) => {
    let keys = "";
    let values = "";

    for (const key in data) {
        let value = data[key];
        if (typeof(value) === "string") {
            value = value.replace(/'/g, "&#39;");
        }

        if (keys === "") {
            keys += "`" + key + "`";
            values += "'" + value + "'";
        } else {
            keys += ", `" + key + "`";
            values += ", '" + value + "'";
        }
    }

    services.database.connection.command(services, "INSERT INTO " + table + "(" + keys + ") VALUES (" + values + ")", ((error, result) => {
        callback(error, result);
    }))
}
