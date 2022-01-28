module.exports.run = (server_id, name, services, callback) => {
    services.database.requests.post("server", {
        server_id: server_id,
        name: name,
        command_prefix: "!",
        language_id: 1
    }, callback, services)
}
