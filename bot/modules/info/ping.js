module.exports.run = async (client, message, args, functions) => {
    try {
        let responseMessage = await message.reply({
            embed: {
                color: 0xe5cc0b,
                description: 'Pinging!'
            }
        });
        await responseMessage.edit({
            embed: {
                color: 0xe5cc0b,
                title: `${client.user.tag} Ping Statistics`,
                fields: [
                {
                    name: 'Response Time',
                    value: `${responseMessage.createdTimestamp - message.createdTimestamp}ms`,
                    inline: true
                }
            ]}
        });
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.help = {
    name: "ping",
    cmdName: "Ping",
    alias: [],
    description: "Checks the ping of the bot.",
    ownerOnly: true,
    testersOnly: false,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["ping"],
    example: [ "ping" ],
    deleteCommandMessage: true,
    returnMessageOnError: true,
}
