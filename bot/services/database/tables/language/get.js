const tables = require('./../../structure/get');

module.exports.run = (server_id, services, callback) => {
    services.database.connection.command(services,
        'SELECT `language`.`' + tables.language.name + '`, `language`.`' + tables.language.small_name + '`' +
        'FROM `language` ' +
        'INNER JOIN `server` ON `server`.`' + tables.server.language_id +'` = `language`.`' + tables.language.id + '` ' +
        'WHERE `server`.`' + tables.server.server_id + '` = ' + server_id,
        ((error, result) => {
            callback(error, result[0]);
        }));
};
