import fs from 'fs';

class Welcome {
    constructor(message, client, settings) {
        const author = message.author;
        let completed = false;

        message.reply(settings.welcome.message);

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

        message.reply(settings.welcome.change.message);

        client.on('message', message => {
            if (!completed && message.author.id === author.id) {
                completed = true;

                this.changeMessage(client, settings, message.content);
                message.reply(settings.welcome.change.finished);
            }
        });
    }

    changeMessage(client, settings, messageContent) {
        const welcomeSettingsJson = fs.readFileSync('Data/Settings/welcome.json');
        const welcomeSettings = JSON.parse(welcomeSettingsJson);

        welcomeSettings.message = messageContent;

        const jsonGeneralSettings = JSON.stringify(welcomeSettings);

        fs.writeFileSync('Data/Settings/welcome.json', jsonGeneralSettings);
    }
}

export default Welcome;
