const Settings = require('../services/settings.js');

const {
    msgAlert,
    helpMenuBuilder
} = require("../utility/functions.js");

const questions = require('../services/questions/index');

module.exports.run = async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) {
        // private message here
        return;
    }

    let prefix = Settings.getCommandPrefix(message.guild.id);

    if (message.content.indexOf(prefix) !== 0) {
        questions.askQuestions(message);
        return;
    }
    let splitCommandMessage = message.content.split(' ');

    let command = splitCommandMessage[0];
    let commandFile = command.slice(prefix.length);
    let args = splitCommandMessage.slice(1);

    let executeCommand;
    if (client.commands.has(commandFile)) {
        executeCommand = client.commands.get(commandFile);
    } else if (client.aliases.has(commandFile)) {
        executeCommand = client.commands.get(client.aliases.get(commandFile));
    } else if (client.commands.has(commandFile + " " + splitCommandMessage[1])) {
        args.shift();
        executeCommand = client.commands.get(commandFile + " " + splitCommandMessage[1]);
    } else if (client.aliases.has(commandFile + " " + splitCommandMessage[1])) {
        args.shift();
        executeCommand = client.commands.get(client.aliases.get(commandFile + " " + splitCommandMessage[1]));
    } else {
        return;
    }

    if (!executeCommand) {
        return;
    }


    if (executeCommand.help.deleteCommandMessage) {
        message.delete().catch(error => {
        });
    }

    if (executeCommand.help.ownerOnly && process.env.OWNER_ID !== message.author.id) {
        if (executeCommand.help.returnMessageOnError) {
            return msgAlert(message, 'Denied', 'You are not this bot\'s owner.');
        }
        return;
    }

    if (executeCommand.help.testersOnly && process.env.TESTER_IDS.split(',').indexOf(message.author.id) !== -1) {
        if (executeCommand.help.returnMessageOnError) {
            return msgAlert(message, 'Denied', 'You are not a tester of this bot\'s.');
        }
        return;
    }

    if (executeCommand.help.userPermissions) {
        if (!message.channel.permissionsFor(message.member) || !message.channel.permissionsFor(message.member).has(executeCommand.help.userPermissions)) {
            if (executeCommand.help.returnMessageOnError) {
                return msgAlert(message, 'Denied', 'You do not have the permissions needed to run this command.');
            }
            return;
        }
    }

    if (executeCommand.help.botPermissions) {
        if (!message.channel.permissionsFor(message.guild.me) || !message.channel.permissionsFor(message.guild.me).has(executeCommand.help.botPermissions)) {
            if (executeCommand.help.returnMessageOnError) {
                return msgAlert(message, 'Denied', 'I cannot run the command due to limited permissions.');
            }
            return;
        }
    }

    if (args.length < executeCommand.help.minAmountOfArguments) {
        return message.channel.send(helpMenuBuilder(client, message, commandFile));
    }

    const functions = require('../utility/functions');
    return executeCommand.run(client, message, args, functions);
};
