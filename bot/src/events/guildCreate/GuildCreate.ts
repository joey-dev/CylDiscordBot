import { Client, Guild } from 'discord.js';
import { Pool } from 'mysql';
import { IEventGuildCreate } from '../../types/Event';
import AddBotToDatabase from './AddBotToDatabase';
import SendMessageToMainOrFirstChannelOnJoin from './SendMessageToMainOrFirstChannelOnJoin';


const GuildCreate: IEventGuildCreate = async (client: Client, databaseConnection: Pool, guild: Guild): Promise<void> => {
    AddBotToDatabase(client, databaseConnection, guild);
    SendMessageToMainOrFirstChannelOnJoin(guild);
};

export default GuildCreate;
