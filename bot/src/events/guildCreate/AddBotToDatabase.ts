import { Client, Guild } from 'discord.js';
import { Pool } from 'mysql';
import Server from '../../services/database/tables/server/Server';

const AddBotToDatabase = (client: Client, databaseConnection: Pool, guild: Guild): void => {
    Server.Post(guild.id, guild.name, databaseConnection)
        .catch(error => {
            console.error(error);
        });
};

export default AddBotToDatabase;


