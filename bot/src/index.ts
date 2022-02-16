import { Client, Collection, Intents } from 'discord.js';
import { env } from 'process';
import * as dotenv from 'dotenv';
import { ConnectDatabase } from './services/database/connection/Connect';
import LoadModules from './services/load/LoadModules';
import LoadEvents from './services/load/LoadEvents';

dotenv.config();

const RunBot = async (): Promise<void> => {
    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.GUILD_INVITES,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        ],
        partials: [
            'CHANNEL',
            'MESSAGE',
        ],
    });

    const databaseConnection = await ConnectDatabase({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    })

    client.login(process.env.DISCORD_TOKEN)
        .then(() => {
            console.log('The bot has successfully been logged in!');
        })
        .catch(error => {
            console.error("An unexpected error has occurred while the bot tried to login");
            console.error(error);
        });

    const commands = LoadModules();

    LoadEvents(client, databaseConnection, commands)
        .then(() => console.log('Everything is loaded!'));


    process.on('uncaughtException', (error) => {
        console.error(error);
    });

    process.on('unhandledRejection', (error) => {
        console.error(error);
    });

    return;
}

RunBot()
    .then(() => {
        console.log('Bot has been loaded');
    })
    .catch(error => {
        console.error("An unexpected error has occurred while the bot tried to load");
        console.error(error);
    });
