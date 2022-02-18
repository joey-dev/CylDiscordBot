import { Client, Message } from 'discord.js';
import { Pool } from 'mysql';
import GetDataAndTurnedOnForComponent
    from '../../../services/database/components/security/getDataAndTurnedOnForComponent';
import { ICommandObject, IComponent } from '../../../types/Commands';
import { DatabaseReturnValue, ILanguage } from '../../../types/Database';
import AfterCommandFinished from './afterCommandFinished/AfterCommandFinished';
import CommandIsEphemeral from './CommandIsEphemeral';
import GetArgsByCommand from './GetArgsByCommand';
import GetCommandByName from './GetCommandByName';
import CanRunCommand from './security/CanRunCommand';


const RunCommand = async (client: Client, message: Message, language: ILanguage, prefix: string, commands: ICommandObject[], databaseConnection: Pool) => {
    if (!message.guildId) {
        return;
    }

    const command = GetCommandByName(message, prefix, commands);
    if (!command) {
        return;
    }

    try {
        const getDataAndTurnedOnForComponentResponse = await GetDataAndTurnedOnForComponent(message.guildId, command.command.info.name.toLowerCase(), databaseConnection);
        const data = getDataAndTurnedOnForComponentResponse as DatabaseReturnValue<IComponent>;

        const canRunCommand = CanRunCommand(message, data.results[0]);
        if (!canRunCommand) {
            return;
        }

        const args = GetArgsByCommand(message, prefix, command);

        const ephemeral = CommandIsEphemeral(data.results[0]);

        const responseMessage = await command.command.run(client, message, args, language, ephemeral);
        AfterCommandFinished(message, responseMessage, data.results[0]);
    } catch (error) {
        console.error(error);
    }
};

export default RunCommand;
