const Discord = require("discord.js");
const pkg = require('custom-env');
const fs = require('fs');
const serviceLoad = require('./services/load/index');

const client = new Discord.Client();

client.publicCommands = new Discord.Collection();
client.privateCommands = new Discord.Collection();
client.aliases = new Discord.Collection();

const { env } = pkg;
env('local');

client.login(process.env.DISCORD_TOKEN);

serviceLoad.modules(client);

serviceLoad.events(client);

process.on("uncaughtException", (error) => {
    console.error(error);
});

process.on("unhandledRejection", (error) => {
    console.error(error);
});
