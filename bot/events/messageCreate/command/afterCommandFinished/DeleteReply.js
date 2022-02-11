const DeleteReply = (message, objectData) => {
    const deleteReplyData = objectData.find(dataPart => dataPart.name === 'deleteReply');
    const millisecondsInSeconds = 1000;

    if (deleteReplyData['turned_on']) {
        setTimeout(function() {
            message.delete();
        }, parseInt(deleteReplyData['data']['second'], 10) * millisecondsInSeconds);
    }
};

module.exports = DeleteReply;
