module.exports.run = async (client) => {
    let date = new Date();
    console.log('\x1b[33m', `${client.user.tag} (${client.user.id}) has started on ${date}.`);
    await client.user.setActivity(
        client.guilds.cache.size + ' servers', {
            type: 'WATCHING'
        });
    await client.user.setStatus('online');
}
