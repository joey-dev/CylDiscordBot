import fetch from 'node-fetch';


module.exports.run = (serverId, url, callback, body = []) => {
    fetch("http://localhost:8080/api/" + url, {
        method: "PUT",
        headers: serverId.api.requests.getHeaderInfo(serverId),
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(responseInJson => {
            callback(responseInJson);
        });
}
