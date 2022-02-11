const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');


const Modules = async () => {
    try {
        const publicGuildMemberAdd = new Discord.Collection();
        const publicCommands = new Discord.Collection();
        const privateCommands = new Discord.Collection();
        const aliases = new Discord.Collection();

        const moduleTypes = [
            'public',
            'private',
            'privateAndPublic',
        ];

        const walk = function (directoryName) {
            fs.readdir(directoryName, function (e, files) {
                if (e) {
                    console.error('Error: ', e);
                    return;
                }
                files.forEach(function (file) {
                    const fullPath = path.join(directoryName, file);
                    fs.stat(fullPath, function (error, file) {
                        if (error) {
                            console.error('Error: ', error);
                            return;
                        }
                        if (file.isDirectory()) {
                            walk(fullPath);
                        } else {
                            console.log('- loading: ' + fullPath);
                            const command = require(`../../${fullPath}`);
                            const commandName = command.info.name;

                            switch (command.info.type) {
                                case 'public':
                                    console.log('-- Public Message');
                                    publicCommands.set(commandName, command);
                                    break;
                                case 'private':
                                    console.log('-- Private Message');
                                    privateCommands.set(commandName, props);
                                    break;
                                case 'privateAndPublic':
                                    console.log('-- Private And Public Message');
                                    publicCommands.set(commandName, props);
                                    privateCommands.set(commandName, props);
                                    break;
                                default:
                                    console.error('command.info.type is incorrect for: ' + command.info.name);
                            }
                        }
                    });
                });
            });
        };
        moduleTypes.forEach(moduleType => {
            walk(`./modules/${moduleType}/`);
        });

        return {
            publicGuildMemberAdd,
            publicCommands,
            privateCommands,
            aliases,
        };
    } catch (e) {
        console.error(e);
    }
};

module.exports = Modules;
