module.exports.run = async (client, services, guild) => {
    // services.settings.getLanguage(guild.id, services, (language => {
    //
    // }));

    addBotToDatabase(client, services, guild)
};

function addBotToDatabase(client, services, guild) {
    services.database.tables.server.post(guild.id, guild.name, services, () => {})
}
