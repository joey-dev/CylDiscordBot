const Discord = require("discord.js");

module.exports.run = (client, message, command, services, language) => {
    if (client.publicCommands.has(command[0])) {
        command = client.publicCommands.get(command[0]);
    } else if (client.aliases.has(command[0])) {
        command = client.publicCommands.get(client.aliases.get(command[0]))
    } else if (client.publicCommands.has(command[0] + " " + command[1])) {
        command = client.publicCommands.get(command[0] + " " + command[1]);
    } else if (client.aliases.has(command[0] + " " + command[1])) {
        command = client.publicCommands.get(client.aliases.get(command[0] + " " + command[1]))
    } else {
        return null;
    }

    const translatedTextCommand = require("../../data/languages/" + language.name + command.help.location);
    const translatedText = require("../../data/languages/" + language.name + "/services/messages/helpMenu.js");

    if (command.help.event !== "message") return;

    const userPermissions = command.help.userPermissions.join(", ") || "-";
    const botPermissions = command.help.botPermissions.join(", ") || "-";
    const aliases = command.help.alias.join(", ") || "-";
    const commandUsage = translatedTextCommand.help.usage.join("\n");
    const examples = translatedTextCommand.help.example.join("\n") || "-";

    const date = new Date();
    const day = date.getDay();
    const month = date.toLocaleString(language.short_name, { month: 'short' });
    const year = date.getFullYear();
    const hour = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());

    return {
        color: "RANDOM",
        author: {
            name: command.help.cmdName,
            url: client.user.avatarURL,
        },
        description: translatedTextCommand.help.description,
        fields: [
            {
                name: translatedText.userPermissions,
                value: "```css\n" + userPermissions + "```",
                inline: true
            }, {
                name: translatedText.botPermissions,
                value: "```css\n" + botPermissions + "```",
                inline: true
            }, {
                name: translatedText.aliases,
                value: "```css\n" + aliases + "```",
                inline: true
            }, {
                name: translatedText.commandUsage,
                value: "```css\n" + commandUsage + "```"
            }, {
                name: translatedText.examples,
                value: "```css\n" + examples + "```"
            }
        ],
        footer: {
            text: translatedText.footer + ' • ' + hour + ":" + minutes + " " + day + " " + month + " " + year,
        }
    };
}

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}
