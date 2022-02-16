const Command = require('../../connection/Command');
const tables = require('../../structure');

const Get = (server_id, databaseConnection, callback) => {
    Command(
        'SELECT `language`.`' + tables.Language.name + '`, `language`.`' + tables.Language.small_name + '`' +
        'FROM `language` ' +
        'INNER JOIN `server` ON `server`.`' + tables.Server.language_id + '` = `language`.`' + tables.Language.id + '` ' +
        'WHERE `server`.`' + tables.Server.server_id + '` = ' + server_id,
        databaseConnection,
        ((error, result) => {
            callback(error, result[0]);
        }));
};

module.exports = Get;
