import fs from 'fs';
import Message from './Message.js';
import Notifications from './Notifications.js';
import Reactions from './Reactions.js';

class Host {
    constructor(message, client, settings, author) {
        let hostSettings = settings.host;
        let messageToSend = hostSettings.message;

        const eventsSettingsJson = fs.readFileSync('Data/Settings/hosting.json');
        const eventsSettings = JSON.parse(eventsSettingsJson);
        const eventGamesSettings = eventsSettings['games'];

        for (let eventName in eventGamesSettings) {
            messageToSend += `-${eventName}\n`;
        }

        message.reply(messageToSend);

        this.sendForm(client, author, hostSettings, eventGamesSettings);
    }

    sendForm(client, author, hostSettings, EventsSettings) {
        let game = '';
        let gameSettings;
        let data = {};

        let step = 0;
        let place = 0;

        let messageToSend = '';

        let questionsFinished = false;
        let messageFinished = false;

        client.on('message', message => {
            if (!questionsFinished && message.author.id === author.id) {
                switch (step) {
                    case 0:
                        game = message.content;
                        data['game'] = message.content;
                        gameSettings = EventsSettings[game];
                        message.reply(hostSettings.time);
                        step++;
                        break;
                    case 1:
                        data['time'] = message.content;
                        if (place === 1) {
                            data['username'] = message.content;
                            message.reply(hostSettings.program);
                            place = 0;
                            step++;
                            break;
                        }
                        if (gameSettings.ipRequired) {
                            message.reply(hostSettings.ip);
                            step++;
                        } else if (gameSettings.usernameRequired) {
                            message.reply(hostSettings.username);
                            place = 1;
                        }
                        break;
                    case 2:
                        if (gameSettings.ipRequired) {
                            data['ip'] = message.content;
                        } else if (gameSettings.usernameRequired) {
                            data['program'] = message.content;
                        }
                        message.reply(hostSettings.late);
                        step++;
                        break;
                    case 3:
                        data['late'] = message.content;
                        message.reply(hostSettings.min);
                        step++;
                        break;
                    case 4:
                        data['min'] = message.content;
                        message.reply(hostSettings.max);
                        step++;
                        break;
                    case 5:
                        data['max'] = message.content;
                        message.reply(hostSettings.notification);
                        step++;
                        break;
                    case 6:
                        data['notification'] = message.content;
                        message.reply(hostSettings.earlyNotification);
                        step++;
                        break;
                    case 7:
                        data['earlyNotification'] = message.content;
                        if (message.content === 'no') {
                            questionsFinished = true;
                            step = 0;
                            message.reply(hostSettings.finished);
                            messageToSend = Message.generateMessage(message, client, data);
                        } else {
                            message.reply(hostSettings.earlyNotificationTime);
                            step++;
                        }
                        break;
                    case 8:
                        data['earlyNotificationTime'] = message.content;
                        if (!gameSettings.earlyNotificationToEveryone) {
                            questionsFinished = true;
                            step = 0;
                            message.reply(hostSettings.finished);
                            messageToSend = Message.generateMessage(message, client, data);
                        } else {
                            message.reply(hostSettings.earlyNotificationEveryone);
                            step++;
                        }
                        break;
                    case 9:
                        data['earlyNotificationEveryone'] = message.content;
                        message.reply(hostSettings.finished);
                        questionsFinished = true;
                        step = 0;
                        messageToSend = Message.generateMessage(message, client, data);
                        break;
                }
            }

            if (questionsFinished && !messageFinished && message.author.id === author.id) {
                messageFinished = true
                this.saveAndSendMessage(message, client, data, messageToSend)
            }
        });
    }

    saveAndSendMessage(message, client, data, messageToSend) {
        data['status'] = "Waiting";
        data['defaultMessage'] = messageToSend;
        data['author'] = message.author.username;
        data['join'] = [];
        data['notJoin'] = [];
        if (data['late'] === 'yes') {
            data['late15'] = [];
            data['late30'] = [];
            data['late45'] = [];
        }

        messageToSend = "Status: Waiting \n\n" + messageToSend;

        this.sendMessage(message, client, data, messageToSend);
    }

    sendMessage(message, client, data, messageToSend) {
        const eventsSettingsJson = fs.readFileSync('Data/Settings/hosting.json');
        const eventsSettings = JSON.parse(eventsSettingsJson);
        const eventGamesSettings = eventsSettings['games'][data['game']];

        const channel = client.channels.cache.get(eventGamesSettings.channelId);

        channel.send(messageToSend)
            .then(message => {
                const eventsHostingJson = fs.readFileSync('Data/Events/hosting.json');
                const eventsHosting = JSON.parse(eventsHostingJson);

                eventsHosting[message.id] = data;

                const eventHosting = JSON.stringify(eventsHosting);

                teFileSync('Data/Events/hosting.json', eventHosting);

                message.react('👋');
                message.react('🕒');
                message.react('🕧');
                message.react('🕘');
                message.react('❌');

                this.subscribeToMessage(client, message, data);
            });
    }

    subscribeToMessage(client, message, data) {
        Reactions.reactionsAdd(client, message);
        Reactions.reactionsRemove(client, message);
        if (data['notification'] === 'yes') {
            Notifications.eventStarts(client, message, data);
        }

        if (data['earlyNotification'] === 'yes') {
            Notifications.eventAboutToStart(client, message, data);
        }
    }
}

export default Host;
