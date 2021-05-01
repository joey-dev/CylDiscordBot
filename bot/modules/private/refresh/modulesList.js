module.exports.run = async (client, message, args, services) => {
    try {
        console.log('reloading modules');
        // client.serviceRequires.push(() => {
        //     services = require('../../../services/index');
        // });

        services.load.modules(client, services);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.help = {
    name: "refresh moduleList",
    cmdName: "refresh moduleList",
    alias: [],
    description: "Refreshes the module list, new modules will be added and old once will be removed",
    ownerOnly: true,
    testersOnly: false,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["refresh moduleList"],
    example: ["refresh moduleList"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
}
