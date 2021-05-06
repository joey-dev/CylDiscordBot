module.exports.run = async (client, message, services) => {
    let isPublic = true;

    if (message.author.bot) return;
    let prefix = '!';

    if (!message.guild) {
        isPublic = false;
        return runCommand(client, message, services, isPublic, prefix);
    }

    services.settings.getCommandPrefix(message.guild.id, services, (prefix => {
        runCommand(client, message, services, isPublic, prefix);
    }));
};

function runCommand(client, message, services, isPublic, prefix) {
    if (message.content.indexOf(prefix) !== 0) {
        services.questions.askQuestions(message);
        return;
    }
    let splitCommandMessage = message.content.split(' ');

    let command = splitCommandMessage[0];
    let commandFile = command.slice(prefix.length);
    let args = splitCommandMessage.slice(1);

    let clientCommands;

    if (isPublic) {
        clientCommands = client.publicCommands;
    } else {
        clientCommands = client.privateCommands;
    }

    let executeModuleCommand;
    if (clientCommands.has(commandFile)) {
        executeModuleCommand = clientCommands.get(commandFile);
    } else if (client.aliases.has(commandFile)) {
        executeModuleCommand = clientCommands.get(client.aliases.get(commandFile));
    } else if (clientCommands.has(commandFile + ' ' + splitCommandMessage[1])) {
        args.shift();
        executeModuleCommand = clientCommands.get(commandFile + ' ' + splitCommandMessage[1]);
    } else if (client.aliases.has(commandFile + ' ' + splitCommandMessage[1])) {
        args.shift();
        executeModuleCommand = clientCommands.get(client.aliases.get(commandFile + ' ' + splitCommandMessage[1]));
    } else {
        return;
    }

    if (!executeModuleCommand) {
        return;
    }


    if (executeModuleCommand.help.deleteCommandMessage) {
        message.delete().catch(error => {
        });
    }

    if (executeModuleCommand.help.ownerOnly && process.env.OWNER_ID !== message.author.id) {
        if (executeModuleCommand.help.returnMessageOnError) {
            return services.message.alert(message, 'Denied', 'You are not this bot\'s owner.', true);
        }
        return;
    }

    if (executeModuleCommand.help.testersOnly && process.env.TESTER_IDS.split(',').indexOf(message.author.id) !== -1) {
        if (executeModuleCommand.help.returnMessageOnError) {
            return services.message.alert(message, 'Denied', 'You are not a tester of this bot\'s.', true);
        }
        return;
    }

    if (isPublic) {
        if (executeModuleCommand.help.userPermissions) {
            if (!message.channel.permissionsFor(message.member) || !message.channel.permissionsFor(message.member).has(executeModuleCommand.help.userPermissions)) {
                if (executeModuleCommand.help.returnMessageOnError) {
                    return services.message.alert(message, 'Denied', 'You do not have the permissions needed to run this command.', true);
                }
                return;
            }
        }

        if (executeModuleCommand.help.botPermissions) {
            if (!message.channel.permissionsFor(message.guild.me) || !message.channel.permissionsFor(message.guild.me).has(executeModuleCommand.help.botPermissions)) {
                if (executeModuleCommand.help.returnMessageOnError) {
                    return services.message.alert(message, 'Denied', 'I cannot run the command due to limited permissions.', true);
                }
                return;
            }
        }
    }

    if (args.length < executeModuleCommand.help.minAmountOfArguments) {
        return message.reply(services.message.helpMenu(client, message, commandFile));
    }

    return executeModuleCommand.run(client, message, args, services);
}
