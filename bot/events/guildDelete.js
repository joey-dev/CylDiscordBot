module.exports.run = async (client, services, guild) => {
    removeBotToDatabase(client, services, guild);
};

function removeBotToDatabase(client, services, guild) {
    services.database.tables.server.delete(guild.id, services, () => {})
}
