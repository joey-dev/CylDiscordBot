import fs from 'fs';

class RoleRequest {
    constructor(message, client, settings) {
        const author = message.author;
        let completed = false;

        message.reply(settings.roleRequest.message);

        client.on('message', message => {
            if (!completed && message.author.id === author.id) {
                completed = true;
                switch (message.content) {
                    case 'message':
                        this.message(message, client, settings, author);
                        break;
                    case 'roles':
                        this.role(message, client, settings, author);
                        break;
                }
            }
        });
    }

    message(message, client, settings, author) {
        message.reply(settings.roleRequest.messageOption.message);

        let completed = false;

        client.on('message', message => {
            if (!completed && message.author.id === author.id) {
                completed = true;
                switch (message.content) {
                    case 'change':
                        this.messageChange(message, client, settings, author);
                        break;
                }
            }
        });
    }

    messageChange(message, client, settings, author) {
        message.reply(settings.roleRequest.messageOption.change.message);

        let completed = false;

        client.on('message', message => {
            if (!completed && message.author.id === author.id) {
                completed = true;

                this.changeMessage(client, settings, message.content);
                message.reply(settings.roleRequest.messageOption.change.finished);
            }
        });
    }

    changeMessage(client, settings, messageContent) {
        const channel = client.channels.cache.get(process.env.ROLE_REQUEST_CHANNEL_ID);

        channel.messages.fetch({limit: 1})
            .then(messages => {
                const message = messages.first();
                message.edit(messageContent)
            })
            .catch(error => {
                console.error(error);
            });

        const roleRequestSettingsJson = fs.readFileSync('Data/Settings/roleRequest.json');
        const roleRequestSettings = JSON.parse(roleRequestSettingsJson);

        roleRequestSettings.message = messageContent;

        const jsonRoleRequestSettings = JSON.stringify(roleRequestSettings);

        fs.writeFileSync('Data/Settings/roleRequest.json', jsonRoleRequestSettings);
    }

    role(message, client, settings, author) {
        message.reply(settings.roleRequest.rolesOption.message);

        let completed = false;

        client.on('message', message => {
            if (!completed && message.author.id === author.id) {
                completed = true;
                switch (message.content) {
                    case 'show all':
                        this.showAll(message, client, settings, author);
                        break;
                    case 'change':
                        this.change(message, client, settings, author);
                        break;
                    case 'remove':
                        this.remove(message, client, settings, author);
                        break;
                    case 'add':
                        this.add(message, client, settings, author);
                        break;
                }
            }
        });
    }

    showAll(message, client, settings, author) {
        const roleRequestSettingsJson = fs.readFileSync('Data/Settings/roleRequest.json');
        const roleRequestSettings = JSON.parse(roleRequestSettingsJson);

        const roles = Object.keys(roleRequestSettings.roles);

        let sendingMessage = 'The following roles are added: ';

        for (let i = 0; i < roles.length; i++) {
            sendingMessage += `\n-${roles[i]}`;
        }

        message.reply(sendingMessage);
    }

    change(message, client, settings, author) {
        message.reply('this is not implemented yet');
    }

    remove(message, client, settings, author) {
        message.reply('this is not implemented yet');
    }

    add(message, client, settings, author) {
        message.reply(settings.roleRequest.rolesOption.add.askName);
        let step = 0;
        let data = {
            'name': '',
            'emojiId': '',
            'roleId': '',
        };

        client.on('message', message => {
            if (message.channel.id === process.env.SETTINGS_CHANNEL_ID && message.author.id === author.id) {
                switch (step) {
                    case 0:
                        data['name'] = message.content;
                        message.reply(settings.roleRequest.rolesOption.add.askEmoji);
                        step++;
                        break;
                    case 1:
                        data['emojiId'] = message.content;
                        message.reply(settings.roleRequest.rolesOption.add.askRole);
                        step++;
                        break;
                    case 2:
                        data['roleId'] = message.content;
                        message.reply(settings.roleRequest.rolesOption.add.finished);
                        step++;
                        this.addRole(data);
                        break;
                }
            }
        });
    }

    addRole(data) {
        const roleRequestSettingsJson = fs.readFileSync('Data/Settings/roleRequest.json');
        const roleRequestSettings = JSON.parse(roleRequestSettingsJson);

        roleRequestSettings.roles[data['name']] = {
            'roleId': data['roleId'],
            'emoteId': data['emojiId'],
        };

        const jsonRoleRequestSettings = JSON.stringify(roleRequestSettings);

        fs.writeFileSync('Data/Settings/roleRequest.json', jsonRoleRequestSettings);
    }
}

export default RoleRequest;
