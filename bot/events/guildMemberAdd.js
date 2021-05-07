module.exports.run = async (client, services, member) => {
    if (!member.guild) return;

    client.publicGuildMemberAdd.forEach(module => {
        module.run(client, member, services);
    });
};
