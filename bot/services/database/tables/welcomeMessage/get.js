module.exports.run = (server_id, services, callback) => {
    services.database.connection.command(services,
        'SELECT `welcome_messages`.`channel_id`, `welcome_messages`.`messageData`, `welcome_messages`.`elements` ' +
        'FROM `welcome_messages` ' +
        'INNER JOIN `welcome` ON `welcome`.`id` = `welcome_messages`.`id` ' +
        'INNER JOIN `server` ON `server`.`id` = `welcome`.`server_id` ' +
        'WHERE `server`.`server_id` = ' + server_id,
        ((error, result) => {
            callback(error, result[0]);
        }));
};
