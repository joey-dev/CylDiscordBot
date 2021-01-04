import fetch from 'node-fetch';
import fs from 'fs';

class ApiRequest {
    static getHeaderInfo(serverId) {
        const dataJson = fs.readFileSync('data/' + serverId + '.json');
        const data = JSON.parse(dataJson);

        const token = data.token;
        const username = data.username;

        return {
            "token": token,
            "username": username,
            "serverId": serverId
        }
    }

    static get(serverId, url, callback)
    {
        fetch("http://localhost:8080/api/" + url, {
            method: "GET",
            headers: this.getHeaderInfo(serverId),
        })
            .then(response => response.json())
            .then(responseInJson => {
                callback(responseInJson);
            });
    }

    static post(serverId, url, callback, body = [])
    {
        fetch("http://localhost:8080/api/" + url, {
            method: "POST",
            headers: this.getHeaderInfo(serverId),
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(responseInJson => {
                callback(responseInJson);
            });
    }
}

export default ApiRequest;
