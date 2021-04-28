module.exports.modules = (client) => {
    const modules = require("./modules");
    modules.run(client);
}

module.exports.events = (client) => {
    const events = require("./events");
    events.run(client);
}
