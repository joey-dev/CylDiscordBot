import { Client, Message } from 'discord.js';
import { Pool } from 'mysql';
import { ICommands } from '../../types/Commands';
import PublicMessage from './public/PublicMessage';

const PrivateMessage = require('./private/PrivateMessage');


const MessageCreate = async (client: Client, databaseConnection: Pool, message: Message, commands: ICommands) => {
    if (message.author.bot) {
        return;
    }

    if (message.guild) {
        PublicMessage(client, databaseConnection, message, commands);
    } else {
        // PrivateMessage(client, databaseConnection, message);
    }
};

export default MessageCreate
