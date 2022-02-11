const DeleteCommand = require('./DeleteCommand');
const DeleteReply = require('./DeleteReply');


const AfterCommandFinished = (message, responseMessage, data) => {
    const objectData = JSON.parse(data.server_data);

    DeleteCommand(message, objectData);
    DeleteReply(responseMessage, objectData);
};

module.exports = AfterCommandFinished;
