import { Guild, GuildBasedChannel, TextChannel } from 'discord.js';


const SendMessageToMainOrFirstChannelOnJoin = (guild: Guild): void => {
    const messageToSend = `Hello, thanks for inviting me! \nTo get the most out of this bot, configure it here: ${process.env.DASHBOARD_URL}${guild.id}`;

    if (guild.systemChannelId) {
        const channel = guild.channels.cache.get(guild.systemChannelId);
        if (channel && channel instanceof TextChannel) {
            channel.send(messageToSend)
                .catch(error => {
                    console.error(error);
                });
        }
    } else {
        const channels = guild.channels.cache.filter(searchChannel => {
            return (searchChannel.type === 'GUILD_TEXT' && hasPermissions(searchChannel, guild));
        });

        const channel = channels.first();

        if (!channel) {
            return;
        }

        if (channel && channel instanceof TextChannel) {
            channel.send(messageToSend)
                .catch(error => {
                    console.error(error);
                });
        }
    }
};

const hasPermissions = (channel: GuildBasedChannel, guild: Guild): boolean => {
    return !!(guild.me && channel.permissionsFor(guild.me).has(`SEND_MESSAGES`));
};

export default SendMessageToMainOrFirstChannelOnJoin;
