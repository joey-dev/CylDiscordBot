module.exports.run = async (client) => {
    await client.user.setActivity(
        client.guilds.cache.size + ' servers', {
            type: 'WATCHING'
        });
    await client.user.setStatus('online');
};


