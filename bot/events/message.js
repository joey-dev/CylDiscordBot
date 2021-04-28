const Settings = require('../services/settings.js');

const {
    msgAlert,
    helpMenuBuilder
} = require("../utility/functions.js");

const questions = require('../services/questions/index');

module.exports.run = async (client, message) => {
    let isPublic = true;

    if (message.author.bot) return;
    let prefix = "!";

    if (!message.guild) {
        isPublic = false;
    } else {
        prefix = Settings.getCommandPrefix(message.guild.id);
    }

    if (message.content.indexOf(prefix) !== 0) {
        questions.askQuestions(message);
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
    } else if (clientCommands.has(commandFile + " " + splitCommandMessage[1])) {
        args.shift();
        executeModuleCommand = clientCommands.get(commandFile + " " + splitCommandMessage[1]);
    } else if (client.aliases.has(commandFile + " " + splitCommandMessage[1])) {
        args.shift();
        executeModuleCommand = clientCommands.get(client.aliases.get(commandFile + " " + splitCommandMessage[1]));
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
            return msgAlert(message, 'Denied', 'You are not this bot\'s owner.');
        }
        return;
    }

    if (executeModuleCommand.help.testersOnly && process.env.TESTER_IDS.split(',').indexOf(message.author.id) !== -1) {
        if (executeModuleCommand.help.returnMessageOnError) {
            return msgAlert(message, 'Denied', 'You are not a tester of this bot\'s.');
        }
        return;
    }

    if (isPublic) {
        if (executeModuleCommand.help.userPermissions) {
            if (!message.channel.permissionsFor(message.member) || !message.channel.permissionsFor(message.member).has(executeModuleCommand.help.userPermissions)) {
                if (executeModuleCommand.help.returnMessageOnError) {
                    return msgAlert(message, 'Denied', 'You do not have the permissions needed to run this command.');
                }
                return;
            }
        }

        if (executeModuleCommand.help.botPermissions) {
            if (!message.channel.permissionsFor(message.guild.me) || !message.channel.permissionsFor(message.guild.me).has(executeModuleCommand.help.botPermissions)) {
                if (executeModuleCommand.help.returnMessageOnError) {
                    return msgAlert(message, 'Denied', 'I cannot run the command due to limited permissions.');
                }
                return;
            }
        }
    }

    if (args.length < executeModuleCommand.help.minAmountOfArguments) {
        return message.reply(helpMenuBuilder(client, message, commandFile));
    }

    const functions = require('../utility/functions');
    return executeModuleCommand.run(client, message, args, functions);
};
