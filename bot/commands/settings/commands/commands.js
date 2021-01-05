import StatusAll from '../../../services/api/commands/statusAll.js';

export class Commands {
    static command(message, args, client) {
        StatusAll.command(message.guild.id, (statusAll) => {
            let rows = [];
            rows[0] = ['name', 'status', 'roles with permissions'];
            rows[1] = ['--- ---', '-------', '----------------------'];

            for (let statusIndex = 0; statusIndex < statusAll.length; statusIndex++) {
                let status = statusAll[statusIndex];

                let roles = status.roles[0];
                status.roles.shift();

                for (let roleIndex = 0; roleIndex < status.roles.length; roleIndex++) {
                    let role = status.roles[roleIndex]
                    roles += ", " + role;
                }

                rows.push([status.commandName, status.status, roles]);
            }

            let reply = '\nHere you can see all the commands, if you want to edit one them just add type `!settings commands nameOfTheCommand`\n';

            rows.forEach(row => {
                reply += "\n" + row[0] + ' | ' + row[1] + ' | ' + row[2];
            });

            message.reply(reply);
        });
    }
}

export default Commands;
