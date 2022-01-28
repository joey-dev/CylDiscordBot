const tables = require('./../../structure/get');

module.exports.run = (server_id, services, callback) => {
    services.database.connection.command(services,
        'SELECT `welcome`.`' + tables.welcome.channel_id + '`, `welcome`.`' + tables.welcome.message_data + '`, `welcome`.`' + tables.welcome.elements + '`, `welcome`.`' + tables.welcome.private_message_data + '`, `welcome`.`' + tables.welcome.private_elements + '` ' +
        'FROM `welcome` ' +
        'INNER JOIN `server` ON `server`.`id` = `welcome`.`' + tables.welcome.server_id + '` ' +
        'WHERE `server`.`' + tables.server.server_id + '` = ' + server_id,
        ((error, result) => {
            callback(error, result[0]);
        }));
};
