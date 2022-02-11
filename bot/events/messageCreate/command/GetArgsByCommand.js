const ConvertMessageToCommand = require('./ConvertMessageToCommand');


const GetArgsByCommand = (message, prefix, command) => {
    const commandNameStart = ConvertMessageToCommand(message, prefix);
    const commandName = command.info.name;

    const unconvertedArgs = commandNameStart.replace(commandName, '');


    return unconvertedArgs.replace(/_/g, ' ').replace(/\s/, '');
};

module.exports = GetArgsByCommand;
