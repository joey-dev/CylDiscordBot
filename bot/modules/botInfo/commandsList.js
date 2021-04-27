const Settings = require('../../services/settings.js');

const fs = require("fs");
const path = require('path');

module.exports.run = async (client, message, args, functions) => {
    let commands = [];
    let fields = [];

    let modules = fs.readdirSync('./modules/').filter(file => fs.statSync(path.join('./modules/', file)).isDirectory());
    for (let module of modules) {
        let commandFiles = fs.readdirSync(path.resolve(`./modules/${module}`)).
            filter(file => !fs.statSync(path.resolve('./modules/', module, file)).isDirectory()).
            filter(file => file.endsWith('.js'));


        commandFiles.forEach(f => {
            var props = require(`../../modules/${module}/${f}`);
            commands += `(${props.help.name}) `;
        });

        fields.push({
            name: module,
            value: `\`\`\`css\n${commands}\`\`\``
        })

        commands = [];

    }

    message.channel.send({
        embed: {
            color: 0xffd700,
            author: {
                name: message.author.tag,
                icon_url:  message.author.avatarURL
            },
            title: 'Bot Commands List',
            description: `Use \`${Settings.getCommandPrefix(message.guild.id)}help <Command Name>\` to learn how to use it.`,
            fields: fields,
            footer: {
                text: `A Total of ${client.commands.size} Commands!`
            }
        }
    });
}

module.exports.help = {
    name: "commands",
    cmdName: "Commands Menu",
    alias: ["cmd"],
    description: "Shows all commands TurkieBot offers.",
    ownerOnly: false,
    testersOnly: false,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["commands"],
    example: ["commands"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
}
