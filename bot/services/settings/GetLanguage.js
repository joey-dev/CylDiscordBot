const { GetLanguageTable } = require('../database/tables');


const GetLanguage = (serverId, databaseConnection, callback) => {
    GetLanguageTable(serverId, databaseConnection, (error, result) => {
        callback(result);
    });
};

module.exports = GetLanguage;
