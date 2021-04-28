module.exports.run = async (client, message, args, functions) => {
    try {
        console.log('testing');
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.help = {
    name: "refresh modules",
    cmdName: "testing arguments",
    alias: [],
    description: "Refreshes all modules, updates in modules go through and new modules will be added",
    ownerOnly: true,
    testersOnly: false,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["refresh modules"],
    example: ["refresh modules"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
}
