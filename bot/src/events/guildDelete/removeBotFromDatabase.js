module.exports.run = (client, services, guild) => {
    services.database.tables.server.delete(guild.id, services, () => {});
};


