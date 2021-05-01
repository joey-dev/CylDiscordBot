module.exports.run = async (client, message, args, services) => {
    try {
        // not working properly
        return;
        console.log('reloading events');
        client.serviceRequires.push(() => {
            services = require('../../../services/index');
        });

        services.load.events(client, services);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.help = {
    name: "refresh eventList",
    cmdName: "refresh eventList",
    alias: [],
    description: "Refreshes the event list, new events will be added and old once will be removed",
    ownerOnly: true,
    testersOnly: false,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["refresh eventList"],
    example: ["refresh eventList"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
}
