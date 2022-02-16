const DeleteCommand = (message, objectData) => {
    const deleteCommandData = objectData.find(dataPart => dataPart.name === 'deleteCommand');
    if (deleteCommandData['turned_on']) {
        message.delete();
    }
};

module.exports = DeleteCommand;
