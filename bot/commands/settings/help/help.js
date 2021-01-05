class Help {
    static commands = [
        {
            'command': 'commands',
            'description': 'gives you a list of the command you can enable/disable or change it\'s permissions',
        },
    ];

    static command(message, args, client) {
        let reply = 'Hi, \nyou can use the following commands for settings:\n';

        this.commands.forEach(command => {
            reply += '\r-' + command.command + ' (' + command.description + ').';
        });

        message.reply(reply);
    }
}

export default Help;
