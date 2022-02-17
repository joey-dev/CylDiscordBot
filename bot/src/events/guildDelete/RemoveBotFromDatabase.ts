import { Client, GuildUnavailable } from 'discord.js';
import { Pool } from 'mysql';
import Server from '../../services/database/tables/server/Server';


const RemoveBotFromDatabase = (client: Client, databaseConnection: Pool, guild: GuildUnavailable): void => {
    Server.delete(guild.id, databaseConnection).catch(error => {
        console.error(error);
    });
};

export default RemoveBotFromDatabase;
