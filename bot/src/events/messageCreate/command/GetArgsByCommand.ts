import { Message } from 'discord.js';
import { ICommandObject } from '../../../types/Commands';
import ConvertMessageToCommand from './ConvertMessageToCommand';


const GetArgsByCommand = (message: Message, prefix: string, command: ICommandObject) => {
    const commandNameStart = ConvertMessageToCommand(message, prefix);
    const commandName = command.command.info.name;

    const unconvertedArgs = commandNameStart.replace(commandName, '');


    return unconvertedArgs.replace(/_/g, ' ').replace(/\s/, '');
};

export default GetArgsByCommand;
