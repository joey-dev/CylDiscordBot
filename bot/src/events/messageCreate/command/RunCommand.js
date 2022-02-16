const GetCommandByName = require('./GetCommandByName');
const GetArgsByCommand = require('./GetArgsByCommand');
const CanRunCommand = require('./security/CanRunCommand');
const GetDataAndTurnedOnForComponent = require('../../../services/database/messageCreate/commands/security/getDataAndTurnedOnForComponent');
const CommandIsEphemeral = require('./CommandIsEphemeral');
const AfterCommandFinished = require('./afterCommandFinished/AfterCommandFinished');


const RunCommand = (client, message, language, prefix, commands, databaseConnection) => {
    const command = GetCommandByName(message, prefix, commands);
    if (!command) {
        return;
    }

    GetDataAndTurnedOnForComponent(message.guildId, command.info.name.toLowerCase(), databaseConnection, async (error, data) => {
        const canRunCommand = CanRunCommand(message, data);
        if (canRunCommand) {
            const args = GetArgsByCommand(message, prefix, command);
            const ephemeral = CommandIsEphemeral(data);

            const responseMessage = await command.run(client, message, args, language, ephemeral);
            AfterCommandFinished(message, responseMessage, data);
        }
    });
};

module.exports = RunCommand;
