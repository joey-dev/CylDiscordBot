module.exports.run = async (client, message, args, functions) => {
    message.channel.send(functions.helpMenuBuilder(client, message, args)).catch(e => { });
}

module.exports.help = {
    name: "help",
    cmdName: "Help Menu",
    alias: [],
    description: "Gives more information about a command.",
    ownerOnly: false,
    testersOnly: false,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["help <Command>"],
    example: ["help 8ball"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
}

