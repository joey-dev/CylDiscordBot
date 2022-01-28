module.exports.run = (table, data = {}, callback, services) => {
    let values = "";

    for (const key in data) {
        let value = data[key];
        if (typeof(value) === "string") {
            value = value.replace(/'/g, "&#39;");
        }

        if (values === "") {
            values += "`" + key + "` = " + value;
        } else {
            values += ", `" + key + "` = " + value;
        }
    }

    services.database.connection.command(services, "DELETE FROM " + table + " WHERE " + values, ((error, result) => {
        callback(error, result);
    }))
}

// DELETE FROM `server` WHERE `server`.`id` = 7;
