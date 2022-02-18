import { Message } from 'discord.js';

const ConvertMessageToCommand = (message: Message, prefix: string) => {
    const commandWithoutPrefix = message.content.slice(prefix.length);
    return commandWithoutPrefix.replace(/\s/g, '_').toUpperCase();
};

export default ConvertMessageToCommand;
