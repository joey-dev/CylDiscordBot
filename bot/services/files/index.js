let modules = {};

module.exports.loadModules = (client = undefined, services = undefined) => {
    modules = {};

    const moduleNames = [
        "require",
        "watch",
    ];

    moduleNames.forEach((moduleName, index) => {
        if (services === undefined) {
            modules[moduleName] = require("./" + moduleName);
        } else {
            modules[moduleName] = services.files.require(client, "./" + moduleName, services);
        }
    });
}


this.loadModules();

module.exports.require = (client, fileName, services) => {
    console.log("1");
    console.log(fileName);
    modules.require.run(client, fileName, services);
}

module.exports.watch = (client, fileName, change, services) => {
    modules.watch.run(client, fileName, change, services);
}
