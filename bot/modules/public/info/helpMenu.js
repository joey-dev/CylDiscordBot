module.exports.run = async (client, message, args, services, language) => {
    const helpMenu = services.messages.helpMenu(client, message, args, services, language);

    if (helpMenu) {
        message.channel.send({embeds: [helpMenu]}).catch(e => { console.error(e) });
    }
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
    example: ["help ping"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
    event: "message",
}

