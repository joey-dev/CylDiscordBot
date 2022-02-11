const Discord = require('discord.js');
const pkg = require('custom-env');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    ],
    partials: [
        'CHANNEL',
        'MESSAGE',
    ],
});
const mysql = require('mysql');
const databaseConnection = require('./services/database/connection/connect');
const {LoadEvents, LoadModules} = require('./services/load');

client.publicCommands = new Discord.Collection();
client.privateCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.serviceRequires = [];

const {env} = pkg;
env('local');

client.login(process.env.DISCORD_TOKEN);

databaseConnection.pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

databaseConnection.pool.getConnection(function (error, connection) {
    if (error) {
        throw error;
    }

    console.log('Connected!');
    connection.release();

    LoadModules(databaseConnection).then(
        ({
             publicGuildMemberAdd,
             publicCommands,
             privateCommands,
             aliases,
         }) => {
            client.publicGuildMemberAdd = publicGuildMemberAdd;
            client.publicCommands = publicCommands;
            client.privateCommands = privateCommands;
            client.aliases = aliases;

            LoadEvents(client, databaseConnection).then(() => console.log('Everything is loaded!'));
        },
    );
});

process.on('uncaughtException', (error) => {
    console.error(error);
});

process.on('unhandledRejection', (error) => {
    console.error(error);
});
