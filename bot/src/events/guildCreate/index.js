const addBotToDatabase = require('./addBotToDatabase.js');
const sendMessageToMainOrFirstChannelOnJoin = require('./addBotToDatabase.js');


module.exports.run = async (client, services, guild) => {
    addBotToDatabase.run(client, services, guild);
    sendMessageToMainOrFirstChannelOnJoin.run(guild);
};
