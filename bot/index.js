import * as Discord from "discord.js";
import pkg from 'custom-env';
import fetch from'node-fetch';

class Cyl {
    constructor() {
        const client = new Discord.Client();

        const { env } = pkg;
        env('local');

        client.on('ready', () => {
            console.log('bot is loaded!');
        })

        client.on('message', message => {
            const serverId = message.guild.id;

            let generalSettings = [];
            generalSettings['commandPrefix'] = "!"

            if (!message.content.startsWith(generalSettings['commandPrefix']) || message.author.bot) return;

            const args = message.content.slice(generalSettings['commandPrefix'].length).trim().split(' ');
            const fullCommand = args.shift().toLowerCase();
            const directory = fullCommand.split('-', 1)[0];
            const command = fullCommand.replace(directory + '-', '', 1);

            this.commandSwitchCase(directory, command, message, args, client);
        });


        client.login(process.env.DISCORD_TOKEN);
    }

    commandSwitchCase(directory, command, message, args, client) {
        switch (directory) {
            case 'ping':
                message.reply("pong");
                break;
            case 'user':
                this.getUser(1, (user) => {
                    message.reply(user.username)
                })
                break;
            case 'server':
                this.getServer(1, (server) => {
                    message.reply("\nname: " + server.name + "\nId: " + server.serverId)
                })
                break;
        }
    }

    getUser(id, callback) {
        fetch("http://localhost:8080/api/users/" + id, {
            method: "GET",
            headers: {
                "token": "8u47r3439ojewd7h84ye9289u32rjklrej89fds7932874342ijrldklfj8ef9j",
                "username": "test",
                "serverId": "794988966590808124"
            }
        })
            .then(res => res.json())
            .then(user => {
                console.log(user);
                callback(user);
            });
    }

    getServer(id, callback) {
        fetch("http://localhost:8080/api/servers/this", {
            method: "GET",
            headers: {
                "token": "8u47r3439ojewd7h84ye9289u32rjklrej89fds7932874342ijrldklfj8ef9j",
                "username": "test",
                "serverId": "794988966590808124"
            }
        })
            .then(res => res.json())
            .then(user => {
                console.log(user);
                callback(user);
            });
    }
}

new Cyl();
