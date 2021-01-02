import fs from "fs";

class RoleRequest {
    constructor(client) {
        this.client = client;

        const roleRequestSettingsJson = fs.readFileSync('Data/Settings/roleRequest.json');
        const roleRequestSettings = JSON.parse(roleRequestSettingsJson);

        const channel = client.channels.cache.get(process.env.ROLE_REQUEST_CHANNEL_ID);

        this.sendOrEditMessage(channel, roleRequestSettings);

        this.waitForReactions();
        this.waitForReactionRemove();
    }

    sendOrEditMessage(channel, roleRequestSettings) {
        channel.messages.fetch({limit: 1})
            .then(messages => {
                if (messages.size === 0) {
                    channel.send(roleRequestSettings.message)
                        .then(message => {
                            this.loadRoleEmotionsEveryMinute(message, roleRequestSettings);
                        });
                } else {
                    const message = messages.first();
                    if (message.content !== roleRequestSettings.message) {
                        message.edit(roleRequestSettings.message)
                            .then(() => {
                                this.loadRoleEmotionsEveryMinute(message, roleRequestSettings);
                            });
                    } else {
                        this.loadRoleEmotionsEveryMinute(message, roleRequestSettings);
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    loadRoleEmotionsEveryMinute(message, roleRequestSettings) {
        this.addRoleEmotions(message, roleRequestSettings)

        setInterval(() => {
            this.addRoleEmotions(message)
        }, 60000);
    }

    addRoleEmotions(message) {
        const roleRequestSettingsJson = fs.readFileSync('Data/Settings/roleRequest.json');
        const roleRequestSettings = JSON.parse(roleRequestSettingsJson);

        for (const name in roleRequestSettings.roles) {
            message.react(this.client.emojis.cache.get(roleRequestSettings.roles[name].emoteId));
        }
    }

    waitForReactions() {
        this.client.on('messageReactionAdd', (reaction, user) => {
            const roleRequestSettingsJson = fs.readFileSync('Data/Settings/roleRequest.json');
            const roleRequestSettings = JSON.parse(roleRequestSettingsJson);

            if (user && !user.bot && reaction.message.channel.id === process.env.ROLE_REQUEST_CHANNEL_ID) {
                const roles = roleRequestSettings.roles;
                const roleNames = Object.keys(roles);

                roleNames.forEach((name, index) => {
                    if (roles[name].emoteId === reaction.emoji.id) {
                        reaction.message.guild.roles.fetch(roles[name].roleId)
                            .then(role => {
                                reaction.message.guild.member(user).roles.add(role);
                                console.log(`Added role: '${role.name}' to '${user.username}'.`);
                            });
                    }
                });
            }
        });
    }

    waitForReactionRemove() {
        this.client.on('messageReactionRemove', (reaction, user) => {
            const roleRequestSettingsJson = fs.readFileSync('Data/Settings/roleRequest.json');
            const roleRequestSettings = JSON.parse(roleRequestSettingsJson);

            if (user && !user.bot && reaction.message.channel.id === process.env.ROLE_REQUEST_CHANNEL_ID) {
                const roles = roleRequestSettings.roles;
                const roleNames = Object.keys(roles);

                roleNames.forEach((name, index) => {
                    if (roles[name].emoteId === reaction.emoji.id) {
                        reaction.message.guild.roles.fetch(roles[name].roleId)
                            .then(role => {
                                reaction.message.guild.member(user).roles.remove(role);
                                console.log(`Removed role: '${role.name}' from '${user.username}'.`);
                            });
                    }
                })
            }
        });
    }
}

export default RoleRequest
