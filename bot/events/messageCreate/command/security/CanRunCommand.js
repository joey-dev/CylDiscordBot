const IsCommandEnabled = require('./IsCommandEnabled');
const CanRunOnChannel = require('./CanRunOnChannel');
const CanRunWithRole = require('./CanRunWithRole');
const GetDataAndTurnedOnForComponent = require('../../../../services/database/messageCreate/commands/security/getDataAndTurnedOnForComponent');


const CanRunCommand = (message, data) => {
    return (IsCommandEnabled(message, data) &&
        CanRunOnChannel(message, data) &&
        CanRunWithRole(message, data));
};

module.exports = CanRunCommand;
