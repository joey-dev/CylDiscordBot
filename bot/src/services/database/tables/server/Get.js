const {GetRequest} = require('../../requests');


const Get = (server_id, databaseConnection, callback) => {
    GetRequest('server', {server_id: server_id}, databaseConnection, callback);
};

module.exports = Get;
