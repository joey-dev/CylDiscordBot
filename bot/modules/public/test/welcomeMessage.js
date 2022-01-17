module.exports.run = async (client, message, args, services, language) => {
    try {
        const member = message.author;
        const guild = message.guild;

        services.modules.public.welcome.createMessage(client, member, guild, services, language, ((publicWelcomeMessage, privateWelcomeMessage, data) => {
            if (!publicWelcomeMessage) return;

            const channel = guild.channels.cache.find(channel => channel.id === data[4]);
            channel.send(publicWelcomeMessage);
        }));
    } catch (e) {
        console.log(e);
    }
};

module.exports.help = {
    name: 'test welcomeMessage',
    cmdName: 'test welcomeMessage',
    alias: [],
    description: 'Send a welcome message',
    ownerOnly: false,
    testersOnly: true,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ['test welcomeMessage'],
    example: ['test welcomeMessage'],
    deleteCommandMessage: false,
    returnMessageOnError: true,
    event: 'message',
};