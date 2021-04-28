const serviceLoad = require('../../../services/load/index');


module.exports.run = async (client, message, args, functions) => {
    try {
        console.log('reloading events');

        serviceLoad.events(client);
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
