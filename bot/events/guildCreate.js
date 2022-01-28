module.exports.run = async (client, services, guild) => {
    addBotToDatabase(client, services, guild);
    sendMessageToMainOrFirstChannelOnJoin(guild);
};

function addBotToDatabase(client, services, guild) {
    services.database.tables.server.post(guild.id, guild.name, services, () => {})
}

function sendMessageToMainOrFirstChannelOnJoin(guild) {
    const dashboardUrl = "http://localhost:3000/dashboard/";
    const messageToSend = "Hello, thanks for inviting me! \nTo get the most out of this bot, configure it here: " + dashboardUrl + guild.id;

    if (guild.systemChannelID) {
        let channel = guild.channels.cache.get(guild.systemChannelID);
        channel.send(messageToSend);
    } else {
        let channelID;
        let channels = guild.channels.cache;

        channels.each(channel => {
            if (!channelID && channel.type === "GUILD_TEXT" && channel.permissionsFor(guild.me).has(`SEND_MESSAGES`)) {
                channelID = channel.id;
            }
        });

        let channel = guild.channels.cache.get(channelID);
        channel.send(messageToSend);
    }
}
