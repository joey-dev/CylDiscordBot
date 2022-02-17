import { Client } from 'discord.js';
import { IEventReact } from '../../types/Event';
import SetStatus from './SetStatus';


const Ready: IEventReact = async (client: Client): Promise<void> => {
    await SetStatus(client);

    const date = new Date();

    if (client.user) {
        console.log(`${client.user.tag} (${client.user.id}) has started on ${date}.`);
    }
};

export default Ready;
