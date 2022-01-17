module.exports.run = (serverId, services, callback) => {
    services.database.tables.server.get(serverId, services,  (error, result) => {
        callback(result[0].command_prefix);
    });
}
