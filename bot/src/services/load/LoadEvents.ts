import { Client, GuildMember, Message } from 'discord.js';
import { readdir } from 'fs';
import { Pool } from 'mysql';
import MessageCreate from '../../events/messageCreate/MessageCreate';
import { ICommands } from '../../types/Commands';
import { IEventGuildMemberAdd, IEventMessageCreate, IEventTypes } from '../../types/Event';


const LoadEvents = async (client: Client, databaseConnection: Pool, commands: ICommands): Promise<void> => {
    readdir(`./src/events/`, (error, files) => {
        files.forEach(file => {
            const eventType = file as IEventTypes;

            console.log(`Loading event: ${eventType}`);

            switch (eventType) {
                case 'messageCreate':
                    client.on('messageCreate', (message: Message) => {
                        MessageCreate(client, databaseConnection, message, commands);
                    });
                    break;
            }
        });
    });
};

export default LoadEvents;
