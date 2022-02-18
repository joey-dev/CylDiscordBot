import { Client, Message } from 'discord.js';
import { Pool } from 'mysql';
import Language from '../../../services/database/tables/language/Language';
import GetCommandPrefix from '../../../services/database/components/GetCommandPrefix';
import { ICommands } from '../../../types/Commands';
import { DatabaseReturnValue, ILanguage } from '../../../types/Database';
import RunCommand from '../command/RunCommand';


const PublicMessage = async (client: Client, databaseConnection: Pool, message: Message, commands: ICommands): Promise<void> => {
    if (!message.guild) {
        return;
    }

    Promise.all([
        Language.get(message.guild.id, databaseConnection),
        GetCommandPrefix(message.guild.id, databaseConnection),
    ]).then((values) => {
        const languages = values[0] as DatabaseReturnValue<ILanguage>;
        const commandPrefix = values[1];

        const language = languages.results[0];

        if (message.content.indexOf(commandPrefix) === 0) {
            RunCommand(client, message, language, commandPrefix, commands.publicCommands, databaseConnection);
        } else {
            // runMessage(client, message, language, true, prefix);
        }
    }).catch(error => {
        console.error(error);
    });
};

export default PublicMessage;
