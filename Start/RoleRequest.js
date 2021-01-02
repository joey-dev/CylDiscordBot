import fs from 'fs';

class RoleRequest {
    constructor(client) {
        const guild = client.guilds.cache.first();

        let usersWithRoles = this.getUsersWithCurrentRoles(guild);

        this.getUsersWithReactionRoles(client, guild, usersWithRoles);
    }

    getUsersWithCurrentRoles(guild) {
        const roleRequestSettingsJson = fs.readFileSync('Data/Settings/roleRequest.json');
        const roleRequestSettings = JSON.parse(roleRequestSettingsJson);

        let roleIds = [];

        for (let role in roleRequestSettings.roles) {
            roleIds.push(roleRequestSettings.roles[role].roleId);
        }

        const users = guild.members.cache.filter(user => {
            return !user.user.bot;
        });

        return users.map(user => {
            return {
                'id': user.id,
                'hasRoles': user.roles.cache.filter(role => {
                    return roleIds.includes(role.id);
                }),
            };
        });
    }

    getUsersWithReactionRoles(client, guild, usersWithRoles) {
        const roleRequestSettingsJson = fs.readFileSync('Data/Settings/roleRequest.json');
        const roleRequestSettings = JSON.parse(roleRequestSettingsJson);

        const channel = client.channels.cache.get(process.env.ROLE_REQUEST_CHANNEL_ID);

        return channel.messages.fetch({limit: 1})
            .then(messages => {
                const message = messages.first();
                if (message) {
                    const reactions = message.reactions.cache;

                    reactions.each(reaction => {
                        this.checkUserWithRole(client, guild, usersWithRoles, {
                            emoteId: reaction.emoji.id,
                            users: reaction.users.fetch(),
                        }, roleRequestSettings);
                    });
                }
            });
    }

    checkUserWithRole(client, guild, usersWithRoles, userWithReaction, roleRequestSettings) {
        let currentRole;

        for (let id in roleRequestSettings.roles) {
            let role = roleRequestSettings.roles[id];
            if (role.emoteId === userWithReaction.emoteId) {
                currentRole = role;
            }
        }
        if (currentRole === undefined) {
            return;
        }

        usersWithRoles.forEach(currentUser => {
            userWithReaction.users
                .then(users => {
                    let foundUser = false;
                    users.each(user => {
                        if (!user.bot && user.id === currentUser.id) {
                            foundUser = true;
                            let hasRole = false;
                            currentUser.hasRoles.each(role => {
                                if (!hasRole && role.id === currentRole.roleId) {
                                    hasRole = true;
                                }
                            });
                            if (!hasRole) {
                                guild.roles.fetch(currentRole.roleId)
                                    .then(role => {
                                        guild.member(user).roles.add(role);
                                        console.log(`Added role: '${role.name}' to '${user.username}' automatically.`);
                                    });
                            }
                        }
                    });
                    if (!foundUser) {
                        const userId = currentUser.id;
                        const user = guild.members.cache.get(userId);

                        guild.roles.fetch(currentRole.roleId)
                            .then(role => {
                                guild.member(user).roles.remove(role);
                                console.log(`Removed role: '${role.name}' from '${user.user.username}' automatically, if user had that role.`);
                            });
                    }
                });
        });
    }
}

export default RoleRequest;
