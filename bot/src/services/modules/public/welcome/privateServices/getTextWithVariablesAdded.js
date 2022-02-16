module.exports.run = (text, member, guild) => {
    const variables = {
        'username': member.username,
        'discriminatorNumber': member.discriminator,
        'serverMemberCount': guild.memberCount,
        'serverName': guild.name,
        'yellUser': member,
    };

    for (const variableName in variables) {
        let splitText = text.split('{' + variableName + '}');
        if (splitText.length > 1) {
            text = splitText.join(variables[variableName]);
        }
    }

    return text;
};
