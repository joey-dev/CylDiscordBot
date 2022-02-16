import { ICommandRun } from '../../../../../types/Commands';

const GetTranslatedText = require('../../../../../services/settings/language/GetTranslatedText');


export const info = {
    name: 'PING',
    description: 'PING_DESCRIPTION',
    title: 'PING_TITLE',
    fieldName: 'PING_FIELD_NAME',
    ownerOnly: false,
    testersOnly: true,
    type: 'public',
};

export const run: ICommandRun = async (client, message, args, language, ephemeral) => {
    try {
        const responseMessage = await message.reply({
            embeds: [{
                color: 0xe5cc0b,
                description: 'Pinging!',
            }],
        });
        if (!client.user) {
            return responseMessage;
        }

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
