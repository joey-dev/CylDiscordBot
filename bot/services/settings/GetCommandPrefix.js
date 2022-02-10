const {GetServerTable} = require('../database/tables');


const GetCommandPrefix = (serverId, databaseConnection, callback) => {
    GetServerTable(serverId, databaseConnection, (error, result) => {
        callback(result[0].command_prefix);
    });
};

module.exports = GetCommandPrefix;
