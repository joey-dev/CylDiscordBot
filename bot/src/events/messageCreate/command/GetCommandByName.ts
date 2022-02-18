import { Message } from 'discord.js';
import { ICommandObject, ICommands } from '../../../types/Commands';
import ConvertMessageToCommand from './ConvertMessageToCommand';


const GetCommandByName = (message: Message, prefix: string, commands: ICommandObject[]): ICommandObject | undefined => {
    const commandNameStart = ConvertMessageToCommand(message, prefix);

    return commands.find(foundCommand => commandNameStart.startsWith(foundCommand.name));
};

export default GetCommandByName;
