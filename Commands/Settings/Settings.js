import fs from "fs";

import RoleRequest from './RoleRequest.js';
import CommandPrefix from './CommandPrefix.js';
import Welcome from './Welcome.js';

class Settings {
    constructor(command, message, args, client) {
        const settingsSettingsJson = fs.readFileSync('Data/Settings/settings.json');
        const settingsSettings = JSON.parse(settingsSettingsJson);

        if (message.channel.id === process.env.SETTINGS_CHANNEL_ID) {
            this.startSettings(message, client, settingsSettings);
        }
    }

    startSettings(message, client, settings) {
        let author = message.author;
        let completed = false;

        message.reply(settings.startingMessage);

        client.on('message', message => {
            if (!completed && message.author.id === author.id) {
                completed = true;

                switch (message.content) {
                    case "role request":
                        new RoleRequest(message, client, settings);
                        break;
                    case "command prefix":
                        new CommandPrefix(message, client, settings);
                        break;
                    case "welcome":
                        new Welcome(message, client, settings);
                        break;
                }
            }


        })
    }
}

export default Settings
