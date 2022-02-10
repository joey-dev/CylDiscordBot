const ConvertMessageToCommand = require('./ConvertMessageToCommand');


const GetCommandByName = (message, prefix, commands) => {
    const commandNameStart = ConvertMessageToCommand(message, prefix);

    return commands.find(foundCommand => commandNameStart.startsWith(foundCommand.info.name));
};

module.exports = GetCommandByName;
