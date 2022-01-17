module.exports.run = async (client, member, services, language) => {
    try {
        services.modules.public.welcome.createMessage(client, member.user, member.guild, services, language, ((publicWelcomeMessage, privateWelcomeMessage, data) => {
            if (publicWelcomeMessage) {
                services.modules.public.welcome.giveRolesToUser(member, data[2].roles);

                const channel = member.guild.channels.cache.find(channel => channel.id === data[4]);
                channel.send(publicWelcomeMessage);
            }

            if (privateWelcomeMessage) {
                member.send(privateWelcomeMessage);
            }

        }));
    } catch (e) {
        console.log(e);
    }
};

module.exports.help = {
    name: 'welcome message',
    description: 'Send a welcome message',
    event: 'guildMemberAdd',
};
