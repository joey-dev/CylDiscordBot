const Discord = require("discord.js");
const pkg = require('custom-env');
const client = new Discord.Client();

let services = require('./services/index');

client.publicCommands = new Discord.Collection();
client.privateCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.serviceRequires = [];

// client.serviceRequires.push(() => {
//     services = require('./services/index');
// });

// console.log(client.serviceRequires);

const { env } = pkg;
env('local');

client.login(process.env.DISCORD_TOKEN);

services.load.modules(client, services);

services.load.events(client, services);

services.load.services(client, requiredFile => {
    if (requiredFile === undefined) return;
    services = require("./services/" + requiredFile);
}, services);

process.on("uncaughtException", (error) => {
    console.error(error);
});

process.on("unhandledRejection", (error) => {
    console.error(error);
});
