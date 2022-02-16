const removeBotFromDatabase = require('./removeBotFromDatabase.js');


module.exports.run = async (client, services, guild) => {
    removeBotFromDatabase.run(client, services, guild);
};
