// This is the universal functions file.
// Use this to store functions you will be using across a bunch of commands.
// Will be easier for you to manage.
const Discord = require("discord.js");
const fs = require("fs");

/**
 * @param client
 * @param message {Message}
 * @param command
 */
module.exports.helpMenuBuilder = (client, message, command) => {
    if (client.publicCommands.has(command[0])) {
        command = client.publicCommands.get(command[0]);
    } else if (client.aliases.has(command[0])) {
        command = client.publicCommands.get(client.aliases.get(command[0]))
    } else if (client.publicCommands.has(command[0] + " " + command[1])) {
        command = client.publicCommands.get(command[0] + " " + command[1]);
    } else if (client.aliases.has(command[0] + " " + command[1])) {
        command = client.publicCommands.get(client.aliases.get(command[0] + " " + command[1]))
    } else {
        return;
    }

    const userPermissions = command.help.userPermissions.join(", ") || "-";
    const botPermissions = command.help.botPermissions.join(", ") || "-";
    const aliases = command.help.alias.join(", ") || "-";
    const commandUsage = command.help.usage.join("\n");
    const examples = command.help.example.join("\n") || "-";

    const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(command.help.cmdName, client.user.avatarURL)
        .setColor("RANDOM")
        .setDescription(command.help.description)
        .setFooter("<> Indicate Required. [] Indicate Optional.")
        .addField(`User Permissions`, "```css\n" + userPermissions + "```", true)
        .addField(`Bot Permissions`, "```css\n" + botPermissions + "```", true)
        .addField(`Arguments Required`, "```css\n" + command.help.argsLength + "```", true)
        .addField(`Aliases`, "```css\n" + aliases + "```", true)
        .addField(`Command Usage`, "```css\n" + commandUsage + "```")
        .addField(`Examples`, "```css\n" + examples + "```")
        .setTimestamp()

    return helpEmbed;
}

/**
 * @param message {Message}
 * @param title {String}
 * @param description {String}
 */
module.exports.msgAlert = (message, title, description) => {
    return message.reply({
        embed: {
            color: 0xe5cc0b,
            title: title,
            description: description
        }
    }).then(msg => msg.delete({ timeout: 5000 }));
}

/**
 *
 * @param arr
 * @returns {*}
 */
module.exports.randArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 *
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
module.exports.randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

