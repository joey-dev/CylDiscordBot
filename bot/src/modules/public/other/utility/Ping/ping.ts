import { getItemTranslate, ILanguages } from '@cylbot/cyldiscordbotlanguage/index';
import { Message } from 'discord.js';
import { ICommandRun, IInfo } from '../../../../../types/Commands';

export const info: IInfo = {
    name: 'PING',
    description: 'PING_DESCRIPTION',
    title: 'PING_TITLE',
    fieldName: 'PING_FIELD_NAME',
    ownerOnly: false,
    testersOnly: true,
    type: 'public',
};

export const run: ICommandRun = async (client, message, args, language, ephemeral): Promise<Message> => {
    return new Promise((async (resolve, reject) => {
        try {
            const languageKey = language.small_name.replace('-', '') as keyof ILanguages;
            const responseMessage = await message.reply({
                embeds: [{
                    color: 0xe5cc0b,
                    description: 'Pinging!',
                }],
            });
            if (!client.user) {
                resolve(responseMessage);
                return;
            }

            await responseMessage.edit({
                embeds: [{
                    color: 0xe5cc0b,
                    title: `${client.user.tag} ${getItemTranslate(languageKey, info.title)}`,
                    fields: [
                        {
                            name: getItemTranslate(languageKey, info.fieldName),
                            value: `${responseMessage.createdTimestamp - message.createdTimestamp}ms`,
                            inline: true,
                        },
                    ],
                }],
            });
            resolve(responseMessage);
        } catch (error) {
            reject(error)
            console.error(error);
        }
    }));
};
