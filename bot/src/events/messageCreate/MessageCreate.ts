import { Client, Message } from 'discord.js';
import { Pool } from 'mysql';
import { ICommands } from '../../types/Commands';
import { IEventMessageCreate } from '../../types/Event';
import PublicMessage from './public/PublicMessage';


const MessageCreate: IEventMessageCreate = async (client: Client, databaseConnection: Pool, message: Message, commands: ICommands): Promise<void> => {
    if (message.author.bot) {
        return;
    }

    if (message.guild) {
        await PublicMessage(client, databaseConnection, message, commands);
    } else {
        // PrivateMessage(client, databaseConnection, message);
    }
};

export default MessageCreate;
