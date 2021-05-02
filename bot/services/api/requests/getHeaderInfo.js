const fs = require('fs');


module.exports.run = (serverId) => {
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
