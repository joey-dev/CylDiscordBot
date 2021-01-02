import fs from 'fs';


class Message {
    static generateMessage(message, client, data) {
        const eventsSettingsJson = fs.readFileSync('Data/Settings/hosting.json');
        const eventsSettings = JSON.parse(eventsSettingsJson);

        let messageToSend = "@everyone " + eventsSettings.messages.eventCreate.game
            .replace('//name//', message.author.username)
            .replace('//game//', data['game']);

        if (data['time'] === 'false') {
            messageToSend += eventsSettings.messages.eventCreate.time.none;
        } else {
            const date = new Date(data['time']);
            messageToSend += eventsSettings.messages.eventCreate.time.set
                .replace('//date//', date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear())
                .replace('//time//', date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes());
        }

        if (data['ip'] !== undefined) {
            messageToSend += eventsSettings.messages.eventCreate.join.ip
                .replace('//ip//', data['ip']);
        } else {
            messageToSend += eventsSettings.messages.eventCreate.join.username
                .replace('//program//', data['program'])
                .replace('//username//', data['username']);
        }

        if (data['min'] === 'false') {
            messageToSend += eventsSettings.messages.eventCreate.min.none;
        } else {
            messageToSend += eventsSettings.messages.eventCreate.min.set
                .replace('//min//', data['min']);
        }

        if (data['max'] === 'false') {
            messageToSend += eventsSettings.messages.eventCreate.max.none;
        } else {
            messageToSend += eventsSettings.messages.eventCreate.max.set
                .replace('//max//', data['max']);
        }

        if (data['late'] === 'yes') {
            messageToSend += eventsSettings.messages.eventCreate.late;
        }

        return messageToSend
    }
}

export default Message;
