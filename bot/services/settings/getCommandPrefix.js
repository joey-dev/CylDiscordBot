module.exports.run = (serverId, services, callback) => {
    services.database.tables.server(serverId, services,  (error, result) => {
        callback(result[0].commandPrefix);
    });
}