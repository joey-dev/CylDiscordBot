const Discord = require("discord.js");
const pkg = require('custom-env');
const fs = require('fs');
const path = require('path');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const { env } = pkg;
env('local');

client.login(process.env.DISCORD_TOKEN);

let modules = fs.readdirSync('./modules/').filter(file => fs.statSync(path.join('./modules/', file)).isDirectory());

for (let module of modules) {
    console.log(`Loading module: ${module}`);

    let commandFiles = fs.readdirSync(path.resolve(`./modules/${module}`)).
    filter(file => !fs.statSync(path.resolve('./modules/', module, file)).isDirectory()).
    filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        let index = commandFiles.indexOf(file);
        let props = require(`./modules/${module}/${file}`);
        console.log(props);
        console.log(`- Loaded: ${file} (${index + 1})`);

        client.commands.set(props.help.name, props);

        props.help.alias.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    }
}

fs.readdir("./events/", (error, files) => {
    if (error) console.log(error);

    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        console.log(`Loading event: ${eventName}`);

        console.log(eventFunction)

        client.on(eventName, (...args) => eventFunction.run(client, ...args));

        console.log('test');
    });
});



process.on("uncaughtException", (error) => {
    console.error(error);
});

process.on("unhandledRejection", (error) => {
    console.error(error);
});
