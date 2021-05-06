import fetch from 'node-fetch';

const fs = require('fs');


module.exports.run = (serverId, url, callback, services) => {
    fetch("http://localhost:8080/api/" + url, {
        method: "GET",
        headers: serverId.api.requests.getHeaderInfo(serverId),
    })
        .then(response => response.json())
        .then(responseInJson => {
            callback(responseInJson);
        });
}
