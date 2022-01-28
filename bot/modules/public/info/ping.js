module.exports.run = async (client, message, args, services, language) => {
    const translatedText = require("../../../data/languages/" + language.name + "/modules/public/info/ping.js");
    services.database.tables.server.post(message.guild.id, message.guild.name, services, () => {});

    try {
        let responseMessage = await message.channel.send({
            embeds: [{
                color: 0xe5cc0b,
                description: 'Pinging!'
            }]
        });
        await responseMessage.edit({
            embeds: [{
                color: 0xe5cc0b,
                title: `${client.user.tag} ${translatedText.title}`,
                fields: [
                {
                    name: translatedText.fields_name,
                    value: `${responseMessage.createdTimestamp - message.createdTimestamp}ms`,
                    inline: true
                }
            ]}]
        });
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.help = {
    name: "ping",
    cmdName: "ping",
    alias: [],
    description: "Checks the ping of the bot.",
    ownerOnly: false,
    testersOnly: true,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["ping"],
    example: [ "ping" ],
    deleteCommandMessage: true,
    returnMessageOnError: true,
    event: "message",
    location: "/modules/public/info/ping.js"
}
