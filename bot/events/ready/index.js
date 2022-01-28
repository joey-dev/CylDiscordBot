const setStatus = require('./setStatus.js');


module.exports.run = async (client, services) => {
    await setStatus.run(client);

    let date = new Date();
    console.log('\x1b[33m', `${client.user.tag} (${client.user.id}) has started on ${date}.`);
}
