const GetLanguage = require('../../../services/settings/language/GetLanguage');
const GetCommandPrefix = require('../../../services/settings/GetCommandPrefix');
const RunCommand = require('../command/RunCommand');


const PublicMessage = (client, databaseConnection, message) => {
    GetLanguage(message.guild.id, databaseConnection, (language => {
        GetCommandPrefix(message.guild.id, databaseConnection, (prefix => {
            if (message.content.indexOf(prefix) === 0) {
                RunCommand(client, message, language, prefix, client.publicCommands, databaseConnection);
            } else {
                // runMessage(client, message, language, true, prefix);
            }
        }));
    }));
};

module.exports = PublicMessage;
