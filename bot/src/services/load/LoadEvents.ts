import { Client, Guild, Message } from 'discord.js';
import { readdir } from 'fs';
import { Pool } from 'mysql';
import DiscordError from '../../events/error/DiscordError';
import GuildDelete from '../../events/guildDelete/GuildDelete';
import GuildMemberAdd from '../../events/guildMemberAdd/GuildMemberAdd';
import MessageCreate from '../../events/messageCreate/MessageCreate';
import Ready from '../../events/ready/Ready';
import { ICommands } from '../../types/Commands';
import { GuildUnavailable } from '../../types/Discord.ds';
import { IEventTypes } from '../../types/Event';


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
                case 'guildMemberAdd':
                    client.on('guildMemberAdd', (guildMember) => {
                        GuildMemberAdd(client, databaseConnection, guildMember);
                    });
                    break;
                case 'guildDelete':
                    client.on('guildDelete', (guild: GuildUnavailable) => {
                        GuildDelete(client, databaseConnection, guild);
                    });
                    break;
                case 'guildCreate':
                    client.on('guildCreate', (guild: Guild) => {
                        GuildDelete(client, databaseConnection, guild);
                    });
                    break;
                case 'ready':
                    client.on('ready', () => {
                        Ready(client);
                    });
                    break;
                case 'error':
                    client.on('error', (discordError: Error) => {
                        DiscordError(discordError);
                    });
                    break;
                default:
                    console.error('an error has occurred when trying to load an event. event is not stated in the switch statement');
            }
        });
    });
};

export default LoadEvents;
