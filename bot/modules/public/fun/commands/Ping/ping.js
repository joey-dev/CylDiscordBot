const info = {
    name: 'PING',
    description: 'PING_DESCRIPTION',
    title: 'PING_TITLE',
    fieldName: 'PING_FIELD_NAME',
    ownerOnly: false,
    testersOnly: true,
    type: 'public',
};

const run = async (client, message, args, language, ephemeral) => {
    const translatedText = {
        'PING': 'ping',
        'PING_TITLE': 'Ping Statistics',
        'PING_FIELD_NAME': 'Response Time',
        'PING_DESCRIPTION': 'Checks the ping of the bot.',
    };

    try {
        const responseMessage = await message.reply({
            embeds: [{
                color: 0xe5cc0b,
                description: 'Pinging!',
            }],
            ephemeral: ephemeral,
        });
        await responseMessage.edit({
            embeds: [{
                color: 0xe5cc0b,
                title: `${client.user.tag} ${translatedText[info.title]}`,
                fields: [
                    {
                        name: translatedText[info.fieldName],
                        value: `${responseMessage.createdTimestamp - message.createdTimestamp}ms`,
                        inline: true,
                    },
                ],
            }],
        });
        return responseMessage;
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    run,
    info,
};
