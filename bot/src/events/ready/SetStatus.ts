import { Client } from 'discord.js';

const SetStatus = (client: Client) => {
    if (!client.user) {
        return;
    }
    client.user.setActivity(
        client.guilds.cache.size + ' servers', {
            type: 'WATCHING',
        });
    client.user.setStatus('online');
};

export default SetStatus;
