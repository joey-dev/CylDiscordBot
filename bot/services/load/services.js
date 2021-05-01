const fs = require('fs');


module.exports.run = async (client, services) => {
    try {
        console.log(client.serviceRequires);
        client.serviceRequires.forEach(serviceRequire => serviceRequire());
    }
    catch (e) {
        console.log(e);
    }
}
