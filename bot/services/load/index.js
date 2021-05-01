module.exports.modules = (client, services) => {
    const modules = require("./modules");
    modules.run(client, services);
}

module.exports.events = (client, services) => {
    const events = require("./events");
    events.run(client, services);
}

module.exports.services = (client, services) => {
    const servicesFile = require("./services");
    servicesFile.run(client, services);
}

module.exports.files = (client, services) => {
    const files = require("./files");
    files.run(client, services);
}
