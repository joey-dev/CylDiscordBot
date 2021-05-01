const Discord = require("discord.js");
const fs = require('fs');
const path = require('path');


module.exports.run = async (client, services) => {
    try {
        client.publicCommands = new Discord.Collection();
        client.privateCommands = new Discord.Collection();
        client.aliases = new Discord.Collection();

        const moduleTypes = [
            "public",
            "private",
            "privateAndPublic"
        ];

        moduleTypes.forEach(moduleType => {
            let modules = fs.readdirSync(`./modules/${moduleType}/`).filter(file => fs.statSync(path.join(`./modules/${moduleType}/`, file)).isDirectory());

            for (let module of modules) {
                console.log(`Loading module: ${module}`);

                let commandFiles = fs.readdirSync(path.resolve(`./modules/${moduleType}/${module}`)).
                filter(file => !fs.statSync(path.resolve(`./modules/${moduleType}/`, module, file)).isDirectory()).
                filter(file => file.endsWith('.js'));

                for (const file of commandFiles) {
                    let index = commandFiles.indexOf(file);
                    let props = require(`../../modules/${moduleType}/${module}/${file}`);
                    console.log(`- Loaded: ${file} (${index + 1})`);

                    switch (moduleType) {
                        case 'public':
                            client.publicCommands.set(props.help.name, props);
                            break;
                        case 'private':
                            client.privateCommands.set(props.help.name, props);
                            break;
                        case 'privateAndPublic':
                            client.publicCommands.set(props.help.name, props);
                            client.privateCommands.set(props.help.name, props);
                            break;
                    }

                    props.help.alias.forEach(alias => {
                        client.aliases.set(alias, props.help.name);
                    });
                }
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}
