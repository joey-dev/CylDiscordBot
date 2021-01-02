import fs from 'fs';

class CommandPrefix {
    constructor(message, client, settings) {
        const author = message.author;
        let completed = false;

        message.reply(settings.commandPrefix.message);

        client.on('message', message => {
            if (!completed && message.author.id === author.id) {
                completed = true;
                switch (message.content) {
                    case 'change':
                        this.change(message, client, settings, author);
                        break;
                }
            }
        });
    }

    change(message, client, settings, author) {
        let completed = false;

        message.reply(settings.commandPrefix.change.message);

        client.on('message', message => {
            if (!completed && message.author.id === author.id) {
                completed = true;

                this.changePrefix(client, settings, message.content);
                message.reply(settings.commandPrefix.change.finished);
            }
        });
    }

    changePrefix(client, settings, messageContent) {
        const generalSettingsJson = fs.readFileSync('Data/Settings/general.json');
        const generalSettings = JSON.parse(generalSettingsJson);

        generalSettings.commandPrefix = messageContent;

        const jsonGeneralSettings = JSON.stringify(generalSettings);

        fs.writeFileSync('Data/Settings/general.json', jsonGeneralSettings);
    }
}

export default CommandPrefix;
