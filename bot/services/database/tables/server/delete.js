module.exports.run = (server_id, services, callback) => {
    services.database.requests.delete('user_server', {
        server_id: server_id,
    }, callback, services);

    services.database.requests.delete('server', {
        server_id: server_id,
    }, callback, services);
};
