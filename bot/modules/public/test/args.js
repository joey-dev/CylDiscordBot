module.exports.run = async (client, message, args, services) => {
    try {
        let fields = [];
        args.forEach((argument, key) => {
            fields.push({
                name: 'Argument ' + key,
                value: argument,
                inline: true
            });
        });

        message.reply({
            embed: {
                color: 0xe5cc0b,
                title: `Here are the args: `,
                fields: fields
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.help = {
    name: "test args",
    cmdName: "testing arguments",
    alias: [],
    description: "Checks if the bot is able to handle arguments",
    ownerOnly: false,
    testersOnly: true,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["test args"],
    example: ["test args"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
    event: "message",
}
