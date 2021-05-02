import fetch from 'node-fetch';


module.exports.run = (serverId, url, callback, services, body = {}) => {
    fetch("http://localhost:8080/api/" + url, {
        method: "PATCH",
        headers: serverId.api.requests.getHeaderInfo(serverId),
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(responseInJson => {
            callback(responseInJson);
        });
}
