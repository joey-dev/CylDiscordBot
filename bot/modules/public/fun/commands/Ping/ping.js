const GetTranslatedText = require('../../../../../services/settings/language/GetTranslatedText');


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
                title: `${client.user.tag} ${GetTranslatedText(language, info.title)}`,
                fields: [
                    {
                        name: GetTranslatedText(language, info.fieldName),
                        value: `${responseMessage.createdTimestamp - message.createdTimestamp}ms`,
                        inline: true,
                    },
                ],
            }],
        });
        return responseMessage;
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    run,
    info,
};
