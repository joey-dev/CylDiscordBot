const fs = require('fs');


module.exports.run = (server_id, services, callback) => {
    services.database.requests.get("server", {server_id: server_id}, callback, services)
}
