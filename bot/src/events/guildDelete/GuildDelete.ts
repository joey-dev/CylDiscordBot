import { Client, GuildUnavailable } from 'discord.js';
import { Pool } from 'mysql';
import { IEventGuildRemove } from '../../types/Event';
import RemoveBotFromDatabase from './RemoveBotFromDatabase';


const GuildDelete: IEventGuildRemove = async (client: Client, databaseConnection: Pool, guild: GuildUnavailable): Promise<void> => {
    RemoveBotFromDatabase(client, databaseConnection, guild);
};

export default GuildDelete;
