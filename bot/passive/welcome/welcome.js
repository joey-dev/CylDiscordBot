import { Data as WelcomeChannel } from '../../services/api/welcome/data.js';

class Welcome {
    constructor(client) {
        client.on('guildMemberAdd', member => {
            this.sendWelcomeMessage(member, client);
        });
    }

    sendWelcomeMessage(member, client) {
        WelcomeChannel.getWelcomeData(member.guild.id, (response) => {
            const welcomeChannel = client.channels.cache.get(response.channelId);
            const totalWelcomeMessages = response.messages.length;
            const welcomeMessageUsingIndex = this.getRandomInt(totalWelcomeMessages);

            const welcomeMessage = response.messages[welcomeMessageUsingIndex].replace("//name//", member);

            for (let roleIndex = 0; roleIndex < response.roles.length; roleIndex++) {
                member.guild.roles.fetch(response.roles[roleIndex])
                    .then(role => {
                        member.roles.add(role);
                    });
            }

            welcomeChannel.send(welcomeMessage);
        });
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

export default Welcome;
