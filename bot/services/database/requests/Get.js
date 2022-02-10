const Command = require('../connection/Command');


const Get = (table, data = {}, databaseConnection, callback) => {
    let where = '';

    if (Object.keys(data).length > 0) {
        where = ' where';
        Object.keys(data).forEach((index) => {
            const item = data[index];
            where += ' ' + index + '=' + item;
        });
    }

    Command('select * from ' + table + where, databaseConnection, ((error, result) => {
        callback(error, result);
    }));
};

module.exports = Get;
