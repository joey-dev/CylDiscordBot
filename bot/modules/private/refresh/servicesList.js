module.exports.run = async (client, message, args, services) => {
    try {
        console.log('reloading services');
        client.serviceRequires.push(() => {
            services = require('../../../services/index');
        });
        services.load.services(client, services);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.help = {
    name: "refresh servicesList",
    cmdName: "refresh servicesList",
    alias: [],
    description: "Refreshes the services list, new services will be added, old once will be removed, and all services will be updated",
    ownerOnly: true,
    testersOnly: false,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["refresh servicesList"],
    example: ["refresh servicesList"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
}
