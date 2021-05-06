const Discord = require("discord.js");
const pkg = require('custom-env');
const client = new Discord.Client();
const mysql = require('mysql');


let services = require('./services/index');

client.publicCommands = new Discord.Collection();
client.privateCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.serviceRequires = [];

const { env } = pkg;
env('local');

client.login(process.env.DISCORD_TOKEN);

services.load.modules(client, services);

services.load.events(client, services);

services.database.connection.pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cyl",
});

services.database.connection.pool.getConnection(function(error, connection) {
    if (error) throw error;
    console.log("Connected!");
    connection.release();
});

process.on("uncaughtException", (error) => {
    console.error(error);
});

process.on("unhandledRejection", (error) => {
    console.error(error);
});
