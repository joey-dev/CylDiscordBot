let modules = {};

module.exports.loadModules = (client = undefined, services = undefined) => {
    modules = {};
    const moduleNames = [
        "modules",
        "events",
        "services",
        "files",
    ];

    moduleNames.forEach((moduleName, index) => {
        if (services === undefined) {
            console.log("moduleName1");
            console.log(moduleName);
            console.log(modules);
            modules[moduleName] = require("./" + moduleName);
            console.log(modules);
        } else {
            console.log("moduleName2");
            console.log(moduleName);
            modules[moduleName] = services.files.require(client, "./" + moduleName, services);
        }
    });
}

this.loadModules();

module.exports.modules = (client, services) => {
    console.log(modules);
    modules.modules.run(client, services);
}

module.exports.events = (client, services) => {
    modules.events.run(client, services);
}

module.exports.services = (client, change, services) => {
    modules.services.run(client, change, services);
}

module.exports.files = (client, services) => {
    modules.files.run(client, services);
}
