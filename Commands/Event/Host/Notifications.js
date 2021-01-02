import fs from 'fs';
import Reactions from './Reactions.js';



class Notifications {
    static eventStarts(client, message, data) {
        const startingTimeString = data['time'].replace(' ', 'T') + ":00Z";

        const startingDateInMilliseconds = Date.parse(new Date(startingTimeString).toString());
        const currentDateInMilliseconds = Date.parse(new Date().toString());

        const millisecondsBeforeStarting = startingDateInMilliseconds - currentDateInMilliseconds;

        console.log('a new event has been created: ' + message.id);
        console.log('date filled in: ' + data['time']);
        console.log('millisecondsBeforeStarting: ' + millisecondsBeforeStarting);

        setTimeout(() => {
            this.eventIsStarting(client, message);
        }, millisecondsBeforeStarting);
    }

    static eventIsStarting(client, message) {
        console.log('Starting event of: ' + message.id);
        const guild = client.guilds.cache.first();

        const updatedEventData = this.getUpdatedEventData(message.id);
        const everyoneJoining = [...updatedEventData['join'], ...updatedEventData['late15'], ...updatedEventData['late30'], ...updatedEventData['late45']];

        const settingsHostingJson = fs.readFileSync('Data/Settings/hosting.json');
        const settingsHosting = JSON.parse(settingsHostingJson);
        const eventMessagesSettings = settingsHosting['messages'];

        if (updatedEventData['min'] !== 'false' && everyoneJoining.length < parseInt(updatedEventData['min'])) {
            this.eventStopped(everyoneJoining, eventMessagesSettings, updatedEventData, guild, message)
        } else {
            this.eventStart(everyoneJoining, eventMessagesSettings, updatedEventData, guild, message)
        }
    }

    static eventStopped(everyoneJoining, eventMessagesSettings, updatedEventData, guild, message) {
        console.log('Event ' + message.id + " is stopped, there are not enough players");

        for (let memberIndex = 0; memberIndex < everyoneJoining.length; memberIndex++) {
            let memberId = everyoneJoining[memberIndex]['id'];

            let eventIsStartingMessage = eventMessagesSettings['eventStopped']['notEnoughPlayers']
                .replace("//game//", updatedEventData['game'])
                .replace("//game//", updatedEventData['game'])
                .replace('//name//', updatedEventData['author']);

            guild.members.cache.get(memberId).send(eventIsStartingMessage);
        }

        Reactions.updateUserListOnMessage(updatedEventData, message, "stopped");
    }

    static eventStart(everyoneJoining, eventMessagesSettings, updatedEventData, guild, message) {
        console.log('Event ' + message.id + " is started");

        for (let memberIndex = 0; memberIndex < everyoneJoining.length; memberIndex++) {
            let memberId = everyoneJoining[memberIndex]['id'];

            let eventIsStartingMessage = this.generateEventStartingMessage(updatedEventData, memberId, eventMessagesSettings['eventStarting']);

            guild.members.cache.get(memberId).send(eventIsStartingMessage);
        }

        Reactions.updateUserListOnMessage(updatedEventData, message, "started");
    }

    static generateEventStartingMessage(data, memberId, eventStartingSettings) {
        const memberJoiningTime = this.searchMemberJoiningTimeInEventData(data, memberId);

        const message = eventStartingSettings['start'] + eventStartingSettings[memberJoiningTime];

        return message.replace('//game//', data['game'])
            .replace('//name//', data['author']);
    }

    static searchMemberJoiningTimeInEventData(data, memberId) {
        if (data['join'].find(player => player['id'] === memberId) !== undefined) {
            return 'join';
        }
        if (data['notJoin'].find(player => player['id'] === memberId) !== undefined) {
            return 'notJoin';
        }
        if (data['late15'].find(player => player['id'] === memberId) !== undefined) {
            return 'late15';
        }
        if (data['late30'].find(player => player['id'] === memberId) !== undefined) {
            return 'late30';
        }
        if (data['late45'].find(player => player['id'] === memberId) !== undefined) {
            return 'late45';
        }
    }

    static eventAboutToStart(client, message, data) {
        const startingTimeString = data['time'].replace(' ', 'T') + ":00Z";

        const startingDateInMilliseconds = Date.parse(new Date(startingTimeString).toString());
        const currentDateInMilliseconds = Date.parse(new Date().toString());

        const millisecondsBeforeStarting = startingDateInMilliseconds - currentDateInMilliseconds;
        const millisecondsBeforeEarlyMessage = millisecondsBeforeStarting - (data['earlyNotificationTime'] * 60000);

        console.log('earlyNotificationTime: ' + data['earlyNotificationTime']);
        console.log('millisecondsBeforeEarlyMessage: ' + millisecondsBeforeEarlyMessage);

        setTimeout(() => {
            this.sendEventAboutToStart(client, message, data);
        }, millisecondsBeforeEarlyMessage);
    }

    static sendEventAboutToStart(client, message, data) {
        console.log('send event about to start: ' + message.id);

        const guild = client.guilds.cache.first();

        const updatedEventData = this.getUpdatedEventData(message.id);
        const everyoneJoining = {...updatedEventData['join'], ...updatedEventData['late15'], ...updatedEventData['late30'], ...updatedEventData['late45']};

        const settingsHostingJson = fs.readFileSync('Data/Settings/hosting.json');
        const settingsHosting = JSON.parse(settingsHostingJson);
        const eventStartingSettings = settingsHosting['messages']['eventAboutToStart'];

        for (let memberIndex in everyoneJoining) {
            let memberId = everyoneJoining[memberIndex]['id'];

            let eventIsStartingMessage = this.generateEventAboutToStartMessage(updatedEventData, memberId, eventStartingSettings);

            guild.members.cache.get(memberId).send(eventIsStartingMessage);
        }

        if (data['earlyNotificationEveryone'] === 'yes') {
            this.sendMessageToPlayersThatHaveNotDecided(guild, data, message);
        }
    }

    static generateEventAboutToStartMessage(data, memberId, eventStartingSettings) {
        const memberJoiningTime = this.searchMemberJoiningTimeInEventData(data, memberId);

        const message = eventStartingSettings['start'] + eventStartingSettings[memberJoiningTime];

        return message.replace('//game//', data['game'])
            .replace('//name//', data['author'])
            .replace('//minutes//', data['earlyNotificationTime'])
            .replace('//joiningMinutes//', data['earlyNotificationTime']);
    }

    static sendMessageToPlayersThatHaveNotDecided(guild, data, message) {
        const settingsRoleRequestJson = fs.readFileSync('Data/Settings/roleRequest.json');
        const settingsRoleRequest = JSON.parse(settingsRoleRequestJson);
        const eventRoleId = settingsRoleRequest['roles'][data['game']]['roleId'];

        const settingsHostingJson = fs.readFileSync('Data/Settings/hosting.json');
        const settingsHosting = JSON.parse(settingsHostingJson);

        const messageToSend = settingsHosting['messages']['eventAboutToStart']['notDecided']
            .replace('//game//', data['game'])
            .replace('//name//', data['author'])
            .replace('//minutes//', data['earlyNotificationTime']);

        const updatedEventData = this.getUpdatedEventData(message.id);

        const everyoneJoining = [...updatedEventData['join'], ...updatedEventData['late15'], ...updatedEventData['late30'], ...updatedEventData['late45']];

        guild.members.fetch()
            .then(members => {
                const membersAsArray = members.array();
                for (let i = 0; i < membersAsArray.length; i++) {
                    const member = membersAsArray[i];
                    if (!member.user.bot && member._roles.filter(role => role === eventRoleId).length > 0 && everyoneJoining.findIndex(element => element.name === member.username) === -1) {
                        member.send(messageToSend);
                    }
                }
            })


    }

    static getUpdatedEventData(messageId) {
        const eventsHostingJson = fs.readFileSync('Data/Events/hosting.json');
        const eventsHosting = JSON.parse(eventsHostingJson);

        return eventsHosting[messageId];
    }

}

export default Notifications;
