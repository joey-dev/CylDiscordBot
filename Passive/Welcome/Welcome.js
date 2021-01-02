import fs from "fs";

class Welcome {
    constructor(client) {
        client.on('guildMemberAdd', member => {
            this.sendWelcomeMessage(member, client);
        })
    }

    sendWelcomeMessage(member, client) {
        const welcomeSettingsJson = fs.readFileSync('Data/Settings/welcome.json');
        const welcomeSettings = JSON.parse(welcomeSettingsJson);

        let welcomeMessage = welcomeSettings.message
            .replace('//name//', member)
            .replace('//roleRequestChannel//', `<#${process.env.ROLE_REQUEST_CHANNEL_ID}>`);

        const welcomeChannel = client.channels.cache.get(process.env.WELCOME_CHANNEL_ID);

        welcomeChannel.send(welcomeMessage)
    }
}

export default Welcome;
