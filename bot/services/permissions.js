class Permissions {
    static FLAGS = {
        'ADMINISTRATOR': 'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE': 'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS': 'KICK_MEMBERS',
        'BAN_MEMBERS': 'BAN_MEMBERS',
        'MANAGE_CHANNELS': 'MANAGE_CHANNELS',
        'MANAGE_GUILD': 'MANAGE_GUILD',
        'ADD_REACTIONS': 'ADD_REACTIONS',
        'VIEW_AUDIT_LOG': 'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER': 'PRIORITY_SPEAKER',
        'STREAM': 'STREAM',
        'VIEW_CHANNEL': 'VIEW_CHANNEL',
        'SEND_MESSAGES': 'SEND_MESSAGES',
        'SEND_TTS_MESSAGES': 'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES': 'MANAGE_MESSAGES',
        'EMBED_LINKS': 'EMBED_LINKS',
        'ATTACH_FILES': 'ATTACH_FILES',
        'READ_MESSAGE_HISTORY': 'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE': 'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS': 'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS': 'VIEW_GUILD_INSIGHTS',
        'CONNECT': 'CONNECT',
        'SPEAK': 'SPEAK',
        'MUTE_MEMBERS': 'MUTE_MEMBERS',
        'DEAFEN_MEMBERS': 'DEAFEN_MEMBERS',
        'MOVE_MEMBERS': 'MOVE_MEMBERS',
        'USE_VAD': 'USE_VAD',
        'CHANGE_NICKNAME': 'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES': 'MANAGE_NICKNAMES',
        'MANAGE_ROLES': 'MANAGE_ROLES',
        'MANAGE_WEBHOOKS': 'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS': 'MANAGE_EMOJIS',
    };

    static checkForFlag(member, flag) {
        const roles = member.roles;
        let hasPermissions = false;

        roles.cache.each(role => {
            if (role.permissions.any(flag)) {
                hasPermissions = true;
            }
        });

        return hasPermissions;
    }

    static isAdmin(member) {
        return this.checkForFlag(member, this.FLAGS.ADMINISTRATOR);
    }
}

export default Permissions
