const serviceLoad = require('../../../services/load/index');


module.exports.run = async (client, message, args, functions) => {
    try {
        console.log('reloading modules');

        serviceLoad.modules(client);
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
