import fs from 'fs';


class Reactions {
    static reactionsAdd(client, message) {
        client.on('messageReactionAdd', (reaction, user) => {
            if (!user.bot && reaction.message.id === message.id) {
                const eventsHostingJson = fs.readFileSync('Data/Events/hosting.json');
                const eventsHosting = JSON.parse(eventsHostingJson);
                let event = eventsHosting[message.id];

                const allPlayersThatJoin = [...event['join'], ...event['late15'], ...event['late30'], ...event['late45']];
                if (event['max'] !== 'false' && parseInt(event['max']) <= allPlayersThatJoin.length && reaction.emoji.name !== '❌') {
                    this.removeUserFromOtherJoins('none', event, user, message)
                } else {
                    this.addReaction(event, reaction, user, message, eventsHosting);
                }
            }
        });
    }

    static addReaction(event, reaction, user, message, eventsHosting) {
        if (event === undefined) {
            event = {};
        }

        switch (reaction.emoji.name) {
            case '👋':
                event = this.removeUserFromOtherJoins('join', event, user, message);
                event['join'].push({'name': user.username, 'id': user.id});
                break;
            case '🕒':
                event = this.removeUserFromOtherJoins('late15', event, user, message);
                event['late15'].push({'name': user.username, 'id': user.id});
                break;
            case '🕧':
                event = this.removeUserFromOtherJoins('late30', event, user, message);
                event['late30'].push({'name': user.username, 'id': user.id});
                break;
            case '🕘':
                event = this.removeUserFromOtherJoins('late45', event, user, message);
                event['late45'].push({'name': user.username, 'id': user.id});
                break;
            case '❌':
                event = this.removeUserFromOtherJoins('notJoin', event, user, message);
                event['notJoin'].push({'name': user.username, 'id': user.id});
                break;
        }
        this.updateUserListOnMessage(event, message, "waiting");

        eventsHosting[message.id] = event;

        const eventHosting = JSON.stringify(eventsHosting);

        teFileSync('Data/Events/hosting.json', eventHosting);
    }

    static reactionsRemove(client, message) {
        client.on('messageReactionRemove', (reaction, user) => {
            if (!user.bot && reaction.message.id === message.id) {
                const eventsHostingJson = fs.readFileSync('Data/Events/hosting.json');
                const eventsHosting = JSON.parse(eventsHostingJson);
                let event = eventsHosting[message.id];

                if (event === undefined) {
                    event = {};
                }

                switch (reaction.emoji.name) {
                    case '👋':
                        const joinIndex = event['join'].findIndex(element => element.name === user.username);
                        if (joinIndex > -1) {
                            event['join'].splice(joinIndex, 1);
                        }
                        break;
                    case '🕒':
                        const late15Index = event['late15'].findIndex(element => element.name === user.username);
                        if (late15Index > -1) {
                            event['late15'].splice(late15Index, 1);
                        }
                        break;
                    case '🕧':
                        const late30Index = event['late30'].findIndex(element => element.name === user.username);
                        if (late30Index > -1) {
                            event['late30'].splice(late30Index, 1);
                        }
                        break;
                    case '🕘':
                        const late45Index = event['late45'].findIndex(element => element.name === user.username);
                        if (late45Index > -1) {
                            event['late45'].splice(late45Index, 1);
                        }
                        break;
                    case '❌':
                        const notJoinIndex = event['notJoin'].findIndex(element => element.name === user.username);
                        if (notJoinIndex > -1) {
                            event['notJoin'].splice(notJoinIndex, 1);
                        }
                        break;
                }
                this.updateUserListOnMessage(event, message, "Waiting");

                eventsHosting[message.id] = event;

                const eventHosting = JSON.stringify(eventsHosting);

                teFileSync('Data/Events/hosting.json', eventHosting);
            }
        });
    }

    static removeUserFromOtherJoins(reactionType, event, user, message) {
        if (reactionType !== 'join') {
            const joinIndex = event['join'].indexOf(user.username);
            if (joinIndex > -1) {
                event['join'].splice(joinIndex, 1);
            }
            if (message.reactions.resolve("👋")) {
                message.reactions.resolve("👋").users.remove(user.id);
            }
        }

        if (reactionType !== 'late15') {
            const late15Index = event['late15'].indexOf(user.username);
            if (late15Index > -1) {
                event['late15'].splice(late15Index, 1);
            }
            if (message.reactions.resolve("🕒")) {
                message.reactions.resolve("🕒").users.remove(user.id);
            }
        }

        if (reactionType !== 'late30') {
            const late30Index = event['late30'].indexOf(user.username);
            if (late30Index > -1) {
                event['late30'].splice(late30Index, 1);
            }
            if (message.reactions.resolve("🕧")) {
                message.reactions.resolve("🕧").users.remove(user.id);
            }
        }

        if (reactionType !== 'late45') {
            const late45Index = event['late45'].indexOf(user.username);
            if (late45Index > -1) {
                event['late45'].splice(late45Index, 1);
            }
            if (message.reactions.resolve("🕘")) {
                message.reactions.resolve("🕘").users.remove(user.id);
            }
        }

        if (reactionType !== 'notJoin') {
            const notJoinIndex = event['notJoin'].indexOf(user.username);
            if (notJoinIndex > -1) {
                event['notJoin'].splice(notJoinIndex, 1);
            }
            if (message.reactions.resolve("❌")) {
                message.reactions.resolve("❌").users.remove(user.id);
            }
        }

        return event;
    }

    static updateUserListOnMessage(event, message, status) {
        let updatedMessage = "Status: "+ status +" \n\n" + event.defaultMessage + "\n";

        if (event.join.length > 0) {
            updatedMessage += "\n\nThe following people will join on time:"
            for (let joiningId in event.join) {
                updatedMessage += "\n- " + event.join[joiningId]['name'];
            }
        }
        if (event.late15.length > 0) {
            updatedMessage += "\n\nThe following people will join but will be 15 mins late:"
            for (let late15Id in event.late15) {
                updatedMessage += "\n- " + event.late15[late15Id]['name'];
            }
        }
        if (event.late30.length > 0) {
            updatedMessage += "\n\nThe following people will join but will be 30 mins late:"
            for (let late30Id in event.late30) {
                updatedMessage += "\n- " + event.late30[late30Id]['name'];
            }
        }
        if (event.late45.length > 0) {
            updatedMessage += "\n\nThe following people will join but will be 45 mins late:"
            for (let late45Id in event.late45) {
                updatedMessage += "\n- " + event.late45[late45Id]['name'];
            }
        }
        if (event.notJoin.length > 0) {
            updatedMessage += "\n\nThe following people will not join:"
            for (let notJoinId in event.notJoin) {
                updatedMessage += "\n- " + event.notJoin[notJoinId]['name'];
            }
        }

        message.edit(updatedMessage);
    }
}

export default Reactions;
