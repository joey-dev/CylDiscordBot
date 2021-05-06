const Discord = require("discord.js");

module.exports.run = (client, message, command, services) => {
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

    const userPermissions = command.help.userPermissions.join(", ") || "-";
    const botPermissions = command.help.botPermissions.join(", ") || "-";
    const aliases = command.help.alias.join(", ") || "-";
    const commandUsage = command.help.usage.join("\n");
    const examples = command.help.example.join("\n") || "-";

    return new Discord.MessageEmbed()
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
}
