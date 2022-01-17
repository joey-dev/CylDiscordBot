module.exports.run = (serverId, services, callback) => {
    services.database.tables.language.get(serverId, services,  (error, result) => {
        callback(result);
    });
}
