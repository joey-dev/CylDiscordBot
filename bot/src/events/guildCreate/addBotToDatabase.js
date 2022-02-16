module.exports.run = (client, services, guild) => {
    services.database.tables.server.post(guild.id, guild.name, services, () => {})
};


