import { readdirSync, statSync } from 'fs';
import path from 'path';
import { ICommand, ICommands } from '../../types/Commands';

const LoadModules = (): ICommands => {
    const moduleTypes = [
        'public',
        'private',
        'privateAndPublic',
    ];

    let commands: ICommands = {
        publicCommands: [],
        privateCommands: [],
    };


    for (const moduleType of moduleTypes) {
        const walkCommands = walk(`./src/modules/${moduleType}/`, commands);
        if (walkCommands) {
            commands = walkCommands;
        }
    }

    return commands;
};

const walk = function (directoryName: string, commands: ICommands): ICommands | void {
    const files = readdirSync(directoryName);

    files.forEach((file) => {
        const fullPath = path.join(directoryName, file);
        const statFile = statSync(fullPath);

        if (statFile.isDirectory()) {
            walk(fullPath, commands);
        } else {
            console.log('- loading: ' + fullPath);
            const command = require(`../../../${fullPath}`) as ICommand;
            const commandName = command.info.name;
            const commandObject = {
                name: commandName,
                command: command,
            };

            switch (command.info.type) {
                case 'public':
                    console.log('-- Public Message');
                    commands.publicCommands.push(commandObject);
                    break;
                case 'private':
                    console.log('-- Private Message');
                    commands.privateCommands.push(commandObject);
                    break;
                case 'privateAndPublic':
                    console.log('-- Private And Public Message');
                    commands.publicCommands.push(commandObject);
                    commands.privateCommands.push(commandObject);
                    break;
                default:
                    console.error('command.info.type is incorrect for: ' + command.info.name);
            }

            return commands;
        }
    });
};

export default LoadModules;
